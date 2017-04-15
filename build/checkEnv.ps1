Write-Object "checking environment"
If (Test-Path env:APPVEYOR_PULL_REQUEST_NUMBER) 
{
    Write-Object "build from pull request"
    $env:XUNFEI_APP_ID=1
    $env:XUNFEI_APP_KEY=2
    $env:FACEPP_KEY=3
    $env:FACEPP_SECRET=4
    $env:YYY_KEY=5
}