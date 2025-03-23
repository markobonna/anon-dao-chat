#!/bin/bash

# Increase the system's file descriptor limit
sudo launchctl limit maxfiles 65536 200000

# Increase the kernel's maximum number of file descriptors
sudo sysctl -w kern.maxfiles=100000
sudo sysctl -w kern.maxfilesperproc=65536

# Display current limits
echo "Current limits:"
launchctl limit maxfiles
sysctl kern.maxfiles
sysctl kern.maxfilesperproc
