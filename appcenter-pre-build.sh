#!/usr/bin/env bash

if [ -z ${APPCENTER_XCODE_PROJECT+x} ];
then
    yarn run clean-ios
fi