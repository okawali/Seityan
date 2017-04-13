Add-Type -A System.IO.Compression.FileSystem
npm run package-win32-x64
[IO.Compression.ZipFile]::CreateFromDirectory('release-builds/electron-live2d-win32-x64', 'release-builds/electron-live2d-win32-x64.zip')