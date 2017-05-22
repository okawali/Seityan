#!/bin/bash
openssl aes-256-cbc -K $encrypted_056961caa124_key -iv $encrypted_056961caa124_iv -in build/conf.ts.unix.enc -out app/utils/conf.ts -d