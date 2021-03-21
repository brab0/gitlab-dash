#!/usr/bin/env bash

chown -R mongodb:mongodb /data

exec su-exec mongodb mongod --dbpath /data/db