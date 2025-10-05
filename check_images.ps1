# Check for missing product images
Write-Host "Checking for missing product images..."

# Read product-data.js
$content = Get-Content "product-data.js" -Raw

# Extract image paths using regex
$imageMatches = [regex]::Matches($content, 'image:\s*"([^"]+)"')
$images = $imageMatches | ForEach-Object { $_.Groups[1].Value }

$missing = @()
foreach ($imgPath in $images) {
    $relativePath = $imgPath -replace "assets/products/", ""
    $fullPath = Join-Path "assets" "products" $relativePath
    if (-not (Test-Path $fullPath)) {
        $missing += $fullPath
    }
}

if ($missing.Count -gt 0) {
    Write-Host "Missing images:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
} else {
    Write-Host "All product images found!" -ForegroundColor Green
}
