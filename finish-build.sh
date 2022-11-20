#! /bin/bash

rm -rf static
mkdir static
mv .dist/- static
mv .dist/index.html templates/injector.html
cp -rf public/. static
rm -rf .dist