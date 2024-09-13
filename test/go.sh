#!/bin/bash
set -x
clear
rm -rf pb_* bun.logb
pocketbase 
bun add pocodex@link:pocodex
./node_modules/.bin/pocodex init --link
ls -lah node_modules
ls -lah node_modules/.bin
pocketbase migrate
pocketbase x 
pocketbase x install pocketpages@link:pocketpages
ls -lah node_modules
pocketbase x install pocketpages@link:pocketpages
pocketbase x install pocketpages@link:pocketpages --force
# pocketbase x uninstall pocketpages
pocketbase serve 