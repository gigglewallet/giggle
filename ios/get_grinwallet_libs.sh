#!/bin/bash

version=`grep " pod 'cocoa_grinwallet'" Podfile | sed "s/.*:tag => '\(.*\)'/\1/"`

mkdir -p Pods/cocoa_grinwallet/cocoa_grinwallet/Library && cd Pods/cocoa_grinwallet/cocoa_grinwallet/Library && rm -f libgrinwallet* || exit 1

wget https://github.com/gottstech/cocoa_grinwallet/releases/download/${version}/libgrinwallet_aarch64-apple-ios.a || exit 1

wget https://github.com/gottstech/cocoa_grinwallet/releases/download/${version}/libgrinwallet_armv7s-apple-ios.a || exit 1

wget https://github.com/gottstech/cocoa_grinwallet/releases/download/${version}/libgrinwallet_x86_64-apple-ios.a || exit 1

printf "3 libs have been downloaded successfully\n"

cd - > /dev/null || exit 1
ls -l Pods/cocoa_grinwallet/cocoa_grinwallet/Library
