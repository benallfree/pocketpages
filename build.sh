#!/bin/bash

rm -rf starters/minimal/app/pocketpages*
cp -r app/pb_hooks/pocketpages* starters/minimal/app/

rm -rf starters/lib/lib/pocketpages*
cp -r app/pb_hooks/pocketpages* starters/lib

rm -rf starters/daisyui/app/pb_hooks/pocketpages*
cp -r app/pb_hooks/pocketpages* starters/daisyui/app/pb_hooks

cp deploy.ts starters/deploy-pockethost