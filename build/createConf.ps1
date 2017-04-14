$encoding = New-Object System.Text.UTF8Encoding $False
$content = [System.String]::Format("export var xunfeiAppId = '{0}'", $env:XUNFEI_APP_ID), `
    [System.String]::Format("export var xunfeiAppKey = '{0}'", $env:XUNFEI_APP_KEY), `
    [System.String]::Format("export var faceppKey = '{0}'", $env:FACEPP_KEY), `
    [System.String]::Format("export var faceppSecret = '{0}'", $env:FACEPP_SECRET), `
    [System.String]::Format("export var yyyKey = '{0}'", $env:YYY_KEY)
$path = Join-Path (Get-Item -Path ".\").FullName "app\xunfei\conf.ts"
$stream = New-Object System.IO.FileStream($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
$writer = New-Object System.IO.StreamWriter($stream, $encoding)
foreach ($i in $content) 
{
    $writer.WriteLine($i)
}
$writer.dispose();
$stream.dispose();