#!/usr/bin/env bash
rm -rf ./build
mkdir ./build
cp -R ./static/ ./build/
webpack
