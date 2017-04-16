#!/bin/bash
echo "export var xunfeiAppId = '${XUNFEI_APP_ID}'" >> app/utils/conf.ts
echo "export var xunfeiAppKey = '${XUNFEI_APP_KEY}'" >> app/utils/conf.ts
echo "export var faceppKey = '${FACEPP_KEY}'" >> app/utils/conf.ts
echo "export var faceppSecret = '${FACEPP_SECRET}'" >> app/utils/conf.ts
echo "export var yyyKey = '${YYY_KEY}'" >> app/utils/conf.ts
echo "export var zhimaAppId = '${ZHIMA_APP_ID}'" >> app/utils/conf.ts