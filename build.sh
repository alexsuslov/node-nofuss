#!/bin/bash
rm -rf build
mkdir build

cp -r ./firmware ./build/
cp -r ./data ./build/
babel server.js -d ./build/

