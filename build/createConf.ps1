$encoding = New-Object System.Text.UTF8Encoding $False
$content = [System.String]::Format("export var appid = '{0}'", $env:XUNFEI_APP_ID), [System.String]::Format("export var appkey = '0'", $env:XUNFEI_APP_KEY)
$path = Join-Path (Get-Item -Path ".\").FullName "app\xunfei\conf.ts"
$stream = New-Object System.IO.FileStream($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
$writer = New-Object System.IO.StreamWriter($stream, $encoding)
foreach ($i in $content) 
{
    [System.Console]::WriteLine($i)
    $writer.WriteLine($i)
}
$writer.dispose();
$stream.dispose();