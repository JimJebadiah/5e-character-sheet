import json
import subprocess

def get_version():
  f_string = ''
  with open('./package.json', 'r') as file:
    for line in file.readlines():
      f_string += line

  return json.loads(f_string)['version']

def update_version(version: str):
  d = {'version': version}
  with open('./src/app/components/footer/version.json', 'w') as file:
    json.dump(d, file)

def main():
  version = get_version()
  update_version(version)
  subprocess.run(['git', 'add', './package.json'])
  subprocess.run(['git', 'add', './src/app/components/footer/version.json'])
  subprocess.run(['git', 'commit', '-m"Updated version"'])
  subprocess.run(['git', 'push', 'origin', 'master'])
  subprocess.run(['./deploy.sh'])

if __name__ == '__main__':
  main()
