
import os
import subprocess
import json

class EmptyJsonRet:
    def __getitem__(self, i):
        return None

def gen_service_runner(service_id, api_version=None, user='USER_ACCESS_KEY', timeout=None):
    def run_cli(*args):
        def env(key, default_value):
            return key in os.environ and os.environ[key] or default_value
        endpoint = env('AWS_ENDPOINT', 'http://localhost:3000/') + service_id + '/'
        cmd = ['aws', '--output', 'json', '--region', 'mock-region', '--endpoint-url', endpoint, service_id]
        cmd.extend(args)
        print(">>> {0}".format(repr(cmd)))
        with subprocess.Popen(
                    cmd, stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                    close_fds=True
                ) as proc:
            retcode = proc.wait(timeout=timeout)
            if retcode is None:
                raise Exception("Command did not complete normally: {0}".format(cmd))
            value = proc.stdout.read().decode("utf-8")
            print("<<< {0}".format(repr(value)))
            if retcode != 0:
                raise Exception("Command exited with {0} ({1})".format(retcode, cmd))
            if len(value) <= 0:
                return EmptyJsonRet()
            return json.loads(value)
    return run_cli
