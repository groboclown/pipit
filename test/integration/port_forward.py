import socket
import sys
import threading
import time

SERVER_THREADS = []


def start_server(local_port, remote_host, remote_port, out_file=None):
    t = threading.Thread(target=server, kwargs={
        "local_port": local_port,
        "remote_host": remote_host,
        "remote_port": remote_port,
        "out_file": out_file
    })
    SERVER_THREADS.append(t)
    t.start()
    t.join()
    SERVER_THREADS.remove(t)


def server(local_port=None, remote_host=None, remote_port=None, out_file=None):
    try:
        dock_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        dock_socket.bind(('', local_port))
        dock_socket.listen(5)
        while True:
            # Note: due to the nature of long poll calls, we need a long
            # timeout period.  The AWS docs recommend a 70 second timeout.
            client_socket = dock_socket.accept()[0]
            client_socket.settimeout(70.0)
            server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server_socket.settimeout(70.0)
            server_socket.connect((remote_host, remote_port))
            t1 = threading.Thread(target=forward, args=(
                client_socket,
                server_socket,
                "[{0}->{1}:{2}] ".format(local_port, remote_host, remote_port),
                out_file))
            t2 = threading.Thread(target=forward, args=(
                server_socket,
                client_socket,
                "[{1}:{2}->{0}] ".format(local_port, remote_host, remote_port),
                out_file))
            t1.start()
            t2.start()
    finally:
        print("Terminated server thread {0} -> {1}:{2}".format(local_port, remote_host, remote_port))


def forward(source, destination, prefix, out_file):
    string = ' '
    while string:
        string = source.recv(1024)
        if string:
            if out_file is None:
                for line in string.splitlines():
                    print(prefix + str(line))
            else:
                with open(out_file, "w") as f:
                    for line in string.splitlines():
                        f.write(prefix + str(line) + "\n")
            destination.sendall(string)
        else:
            try:
                source.shutdown(socket.SHUT_RD)
            except OSError:
                pass
            try:
                destination.shutdown(socket.SHUT_WR)
            except OSError:
                pass


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: {0} local_port remote_host remote_port (out_file)".format(sys.argv[0]))
        sys.exit(1)
    (local_port, remote_host, remote_port) = sys.argv[1:4]
    out_file = None
    if len(sys.argv) > 4:
        out_file = sys.argv[4]
    try:
        server(int(local_port), remote_host, int(remote_port), out_file)
    except KeyboardInterrupt:
        print("Ctrl-C pressed")
