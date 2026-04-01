import paramiko
import os
from scp import SCPClient

# Настройки сервера
HOST = "164.90.203.154"
USER = "root"
PASSWORD = "kashspp2014a"
REMOTE_PATH = "/root/architect-bot"

# Локальные файлы
LOCAL_BOT_DIR = r"D:\Emir-Asan tg bot\bot"
LOCAL_PACKAGE = r"D:\Emir-Asan tg bot\package.json"

def deploy():
    print(f"[*] Connecting to {HOST}...")

    # SSH client
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=30)
        print("[+] Connected!")

        # Create folder and stop old process
        print("[*] Preparing server...")
        commands = [
            f"mkdir -p {REMOTE_PATH}",
            f"mkdir -p {REMOTE_PATH}/bot",
            "pkill -f 'node bot/index.js' || true"
        ]
        for cmd in commands:
            stdin, stdout, stderr = ssh.exec_command(cmd)
            stdout.read()

        # Copy files via SFTP
        print("[*] Copying files...")
        sftp = ssh.open_sftp()

        # Copy package.json
        sftp.put(LOCAL_PACKAGE, f"{REMOTE_PATH}/package.json")
        print("    + package.json")

        # Copy bot/index.js
        sftp.put(os.path.join(LOCAL_BOT_DIR, "index.js"), f"{REMOTE_PATH}/bot/index.js")
        print("    + bot/index.js")

        sftp.close()

        # Check/Install Node.js
        print("[*] Checking Node.js...")
        stdin, stdout, stderr = ssh.exec_command("which node")
        node_path = stdout.read().decode().strip()

        if not node_path:
            print("[*] Node.js not found. Installing...")
            install_cmd = "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
            stdin, stdout, stderr = ssh.exec_command(install_cmd)
            print(stdout.read().decode())
            print(stderr.read().decode())
        else:
            print(f"    Node.js found: {node_path}")

        # Install dependencies
        print("[*] Installing dependencies...")
        stdin, stdout, stderr = ssh.exec_command(f"cd {REMOTE_PATH} && npm install")
        print(stdout.read().decode())
        err = stderr.read().decode()
        if err:
            print(f"[!] {err}")

        # Start bot in background
        print("[*] Starting bot...")
        stdin, stdout, stderr = ssh.exec_command(
            f"cd {REMOTE_PATH} && nohup node bot/index.js > bot.log 2>&1 &"
        )
        stdout.read()

        # Check if started
        import time
        time.sleep(2)
        stdin, stdout, stderr = ssh.exec_command("pgrep -f 'node bot/index.js'")
        pid = stdout.read().decode().strip()

        if pid:
            print(f"[+] Bot started! PID: {pid}")
        else:
            print("[-] Bot failed to start. Checking log...")
            stdin, stdout, stderr = ssh.exec_command(f"cat {REMOTE_PATH}/bot.log")
            print(stdout.read().decode())

        ssh.close()
        print("\n[+] Deploy complete!")

    except Exception as e:
        print(f"[-] Error: {e}")
        ssh.close()

if __name__ == "__main__":
    deploy()
