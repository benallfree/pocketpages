#!/bin/bash

rm -rf app/pb_hooks/pocketpages*
cp -r lib/pocketpages* app/pb_hooks

rm -rf starters/minimal/app/pocketpages*
cp -r lib/pocketpages* starters/minimal/app/

rm -rf starters/lib/lib/pocketpages*
cp -r lib/pocketpages* starters/lib

rm -rf starters/daisyui/lib/pocketpages*
cp -r lib/pocketpages* starters/daisyui/app/pb_hooks

cp deploy.ts starters/deploy-pockethost