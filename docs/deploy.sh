#!/bin/bash

cd ..
output=$(npm pack)
mv $output docs/pocketpages.tgz
cd docs
fly deploy