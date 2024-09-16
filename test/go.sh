#!/bin/bash
set -x
clear
rm -rf pb_* bun.logb
pocketbase 
bun add pocodex@latest
./node_modules/.bin/pocodex init
ls -lah node_modules
ls -lah node_modules/.bin
pocketbase migrate
pocketbase pocodex 
pocketbase pocodex install pocketpages@link:pocketpages
ls -lah node_modules
pocketbase pocodex install pocketpages@link:pocketpages
pocketbase pocodex install pocketpages@link:pocketpages --force
# pocketbase pocodex uninstall pocketpages
pocketbase serve --dir=pb_data