$ftpHost = "46.28.45.159"
$ftpUser = "u985529326"
$ftpPass = "Access4int@"
$baseRemoteDir = "ftp://$ftpHost/domains/karncy.com/public_html/live"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$localDistDir = Join-Path (Split-Path -Parent $scriptDir) "dist"

function New-FtpDir($dirUrl) {
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

function Send-FtpFile($localFilePath, $remoteFileUrl, $force = $false) {
    try {
        $fileName = [System.IO.Path]::GetFileName($localFilePath)
        $fileBytes = [System.IO.File]::ReadAllBytes($localFilePath)

        if (-not $force) {
            try {
                $checkReq = [System.Net.FtpWebRequest]::Create($remoteFileUrl)
                $checkReq.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
                $checkReq.Method = [System.Net.WebRequestMethods+Ftp]::GetFileSize
                $checkReq.UseBinary = $true
                $checkReq.KeepAlive = $false
                $checkResp = $checkReq.GetResponse()
                $remoteSize = $checkResp.ContentLength
                $checkResp.Close()
                if ($remoteSize -eq $fileBytes.Length) {
                    Write-Host "  [SKIP] $fileName (already up-to-date)"
                    return
                }
            } catch {
                # File does not exist yet on remote, proceed to upload
            }
        }

        Write-Host "Uploading $fileName ..."
        $req = [System.Net.FtpWebRequest]::Create($remoteFileUrl)
        $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.UseBinary = $true
        $req.KeepAlive = $false
        $req.ContentLength = $fileBytes.Length

        $requestStream = $req.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()

        $resp = $req.GetResponse()
        $resp.Close()
        Write-Host "  [OK] $fileName"
        Start-Sleep -Milliseconds 150
    } catch {
        Write-Error "  [FAILED] $localFilePath : $($_.Exception.Message)"
        Start-Sleep -Milliseconds 300
    }
}

Write-Host "Connecting to Hostinger ($ftpHost)..."
New-FtpDir $baseRemoteDir
New-FtpDir "$baseRemoteDir/assets"

Write-Host "Uploading HTML & configuration files..."
Get-ChildItem -Path $localDistDir -File | ForEach-Object {
    $remoteUrl = "$baseRemoteDir/$($_.Name)"
    Send-FtpFile $_.FullName $remoteUrl $true
}

Write-Host "Uploading bundled assets (JS/CSS/Images)..."
Get-ChildItem -Path "$localDistDir\assets" -File | ForEach-Object {
    $remoteUrl = "$baseRemoteDir/assets/$($_.Name)"
    Send-FtpFile $_.FullName $remoteUrl $false
}

Write-Host "`n Deployment complete! Visit https://karncy.com/live/"
