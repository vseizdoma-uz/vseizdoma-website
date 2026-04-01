import paramiko

HOST = "164.90.203.154"
USER = "root"
PASSWORD = "kashspp2014a"

def stop_bot():
    print(f"[*] Connecting to {HOST}...")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=30)
        print("[+] Connected!")

        # Stop bot
        print("[*] Stopping bot...")
        ssh.exec_command("pkill -f 'node bot/index.js' || true")

        import time
        time.sleep(1)

        # Check
        stdin, stdout, stderr = ssh.exec_command("pgrep -f 'node bot/index.js'")
        pid = stdout.read().decode().strip()

        if pid:
            print(f"[-] Bot still running: {pid}")
        else:
            print("[+] Bot stopped!")

        ssh.close()

    except Exception as e:
        print(f"[-] Error: {e}")

if __name__ == "__main__":
    stop_bot()
