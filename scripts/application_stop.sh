#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pids=$(pgrep node)
if [ -n "$pids" ]; then
    for pid in $pids; do
        kill -9 "$pid"
    done
else
    echo "No node servers running"
fi