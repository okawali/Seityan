Add-Type -A System.IO.Compression.FileSystem
$inPath = Join-Path (Get-Item -Path ".\").FullName 'release-builds\electron-live2d-win32-x64'
$outPath = Join-Path (Get-Item -Path ".\").FullName 'release-builds\electron-live2d-win32-x64.zip'
[IO.Compression.ZipFile]::CreateFromDirectory($inPath, $outPath, [System.IO.Compression.CompressionLevel]::Optimal, $True)