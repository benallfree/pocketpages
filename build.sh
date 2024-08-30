#!/bin/bash

rm -rf app/pocketpages*
cp -r lib/pocketpages* app/

rm -rf starters/minimal/app/pocketpages*
cp -r lib/pocketpages* starters/minimal/app/

rm -rf starters/lib/lib/pocketpages*
cp -r lib/pocketpages* starters/lib

rm -rf starters/daisyui/lib/pocketpages*
cp -r lib/pocketpages* starters/daisyui/app/pb_hooks

cp deploy.ts starters/deploy-pockethost