$encoding = New-Object System.Text.UTF8Encoding $False
$content = "export var appid = ''", "export var appkey = ''"
$path = Join-Path (Get-Item -Path ".\").FullName "app\xunfei\conf.ts"
$stream = New-Object System.IO.FileStream($path, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
$writer = New-Object System.IO.StreamWriter($stream, $encoding)
foreach ($i in $content) 
{
    $writer.WriteLine($i)
}
$writer.dispose();
$stream.dispose();