$ftpHost = "46.28.45.159"
$ftpUser = "u985529326"
$ftpPass = "Access4int@"
$baseRemoteDir = "ftp://$ftpHost/domains/karncy.com/public_html/live"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$localDistDir = Join-Path (Split-Path -Parent $scriptDir) "dist"

function Make-FtpDir($dirUrl) {
    try {
        $req = [System.Net.FtpWebRequest]::Create($dirUrl)
        $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.UseBinary = $true
        $req.KeepAlive = $false
        $resp = $req.GetResponse()
        $resp.Close()
    } catch {
        # Directory exists
    }
}

function Upload-FtpFile($localFilePath, $remoteFileUrl) {
    try {
        Write-Host "Uploading $([System.IO.Path]::GetFileName($localFilePath)) ..."
        $req = [System.Net.FtpWebRequest]::Create($remoteFileUrl)
        $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.UseBinary = $true
        $req.KeepAlive = $false

        $fileBytes = [System.IO.File]::ReadAllBytes($localFilePath)
        $req.ContentLength = $fileBytes.Length

        $requestStream = $req.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()

        $resp = $req.GetResponse()
        $resp.Close()
        Write-Host "  [OK] $([System.IO.Path]::GetFileName($localFilePath))"
    } catch {
        Write-Error "  [FAILED] $localFilePath : $($_.Exception.Message)"
    }
}

Write-Host "Connecting to Hostinger ($ftpHost)..."
Make-FtpDir $baseRemoteDir
Make-FtpDir "$baseRemoteDir/assets"

Write-Host "Uploading HTML & configuration files..."
Get-ChildItem -Path $localDistDir -File | ForEach-Object {
    $remoteUrl = "$baseRemoteDir/$($_.Name)"
    Upload-FtpFile $_.FullName $remoteUrl
}

Write-Host "Uploading bundled assets (JS/CSS/Images)..."
Get-ChildItem -Path "$localDistDir\assets" -File | ForEach-Object {
    $remoteUrl = "$baseRemoteDir/assets/$($_.Name)"
    Upload-FtpFile $_.FullName $remoteUrl
}

Write-Host "`n Deployment complete! Visit https://karncy.com/live/"
