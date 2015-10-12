#!./env/bin/python

import os
import sys
import argparse

env_path = './env/bin/'

def main():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--i', dest="install", help='install env lib')
    parser.add_argument('--u', dest="uninstall", help='uninstall env lib')

    args = parser.parse_args()

    if args.install:
        command = env_path + 'pip install ' + args.install
        os.system(command)
    elif args.uninstall:
        command = env_path + 'pip uninstall ' + args.uninstall
        os.system(command)

    pass


if __name__ == '__main__':
    main()