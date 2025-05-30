#!/bin/bash

PB_VERSION=${1:-0.28.1}
PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip"

wget -O pb.zip "$PB_URL"

mkdir -p dest
unzip pb.zip -d dest

mv dest/pocketbase ./pocketbase
chmod +x ./pocketbase
rm -rf dest pb.zip

echo "Pocketbase v${PB_VERSION} downloaded and extracted to ./pocketbase"