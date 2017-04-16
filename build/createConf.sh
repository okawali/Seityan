#!/bin/bash
openssl aes-256-cbc -K $encrypted_41303ef53456_key -iv $encrypted_41303ef53456_iv -in build/conf.ts.unix.enc -out app/utils/conf.ts -d