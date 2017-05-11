#!/bin/bash
if [[ "$TRAVIS_OS_NAME" == "osx" ]];
then
    DIR_NAME="seityan-darwin-x64"
    npm run package-osx-x64
else
    DIR_NAME="seityan-linux-x64"
    npm run package-linux-x64
fi

FILE_NAME="$DIR_NAME.tar.gz"

tar czf release-builds/$FILE_NAME release-builds/$DIR_NAME
