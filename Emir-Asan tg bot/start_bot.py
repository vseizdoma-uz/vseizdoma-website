import paramiko

HOST = "164.90.203.154"
USER = "root"
PASSWORD = "kashspp2014a"
REMOTE_PATH = "/root/architect-bot"

def start_bot():
    print(f"[*] Connecting to {HOST}...")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=30)
        print("[+] Connected!")

        import time

        # Copy updated index.js
        print("[*] Updating bot file...")
        sftp = ssh.open_sftp()
        sftp.put(r"D:\Emir-Asan tg bot\bot\index.js", f"{REMOTE_PATH}/bot/index.js")
        sftp.close()
        print("    + bot/index.js updated")

        # Restart via systemd (single instance, no zombies)
        print("[*] Restarting bot via systemd...")
        ssh.exec_command("systemctl restart architect-bot.service")

        time.sleep(4)

        # Check status
        stdin, stdout, stderr = ssh.exec_command("pgrep -f 'node bot/index.js'")
        pid = stdout.read().decode().strip()

        if pid:
            print(f"[+] Bot started! PID: {pid}")

            # Show log
            stdin, stdout, stderr = ssh.exec_command(f"cat {REMOTE_PATH}/bot.log")
            log = stdout.read().decode().strip()
            if log:
                print(f"\n[LOG]\n{log}")
        else:
            print("[-] Bot failed to start!")
            stdin, stdout, stderr = ssh.exec_command(f"cat {REMOTE_PATH}/bot.log")
            print(stdout.read().decode())

        ssh.close()

    except Exception as e:
        print(f"[-] Error: {e}")

if __name__ == "__main__":
    start_bot()
