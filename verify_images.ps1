# Script to verify that all image paths in product-data.js exist

# Read the product-data.js file
$productDataContent = Get-Content -Path "product-data.js" -Raw

# Extract all image paths
$imageMatches = [regex]::Matches($productDataContent, 'image:\s*"([^"]+)"')

Write-Host "Checking $($imageMatches.Count) image paths..."
Write-Host "=========================================="

$missingImages = 0
$foundImages = 0

foreach ($match in $imageMatches) {
    $imagePath = $match.Groups[1].Value
    
    # Check if file exists
    if (Test-Path $imagePath) {
        Write-Host "✓ Found: $imagePath"
        $foundImages++
    } else {
        Write-Host "✗ Missing: $imagePath"
        $missingImages++
    }
}

Write-Host "=========================================="
Write-Host "Summary:"
Write-Host "  Found: $foundImages images"
Write-Host "  Missing: $missingImages images"

if ($missingImages -eq 0) {
    Write-Host "All images are correctly linked!" -ForegroundColor Green
} else {
    Write-Host "$missingImages images are missing. Please check the paths." -ForegroundColor Red
}