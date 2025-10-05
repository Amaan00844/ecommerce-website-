# Test script to debug product data extraction
$productDataContent = Get-Content -Path "product-data.js" -Raw

# Extract the products array using regex
$productsArrayMatch = [regex]::Match($productDataContent, 'const products = \[(.*?)\];', [System.Text.RegularExpressions.RegexOptions]::Singleline)
if (-not $productsArrayMatch.Success) {
    Write-Error "Could not find products array in product-data.js"
    exit 1
}

$productsArrayContent = $productsArrayMatch.Groups[1].Value

# Extract individual product objects
$productMatches = [regex]::Matches($productsArrayContent, '\{(?:[^{}]|(?<Level>\{)|(?<-Level>\}))+(?(Level)(?!))\}')

Write-Host "Found $($productMatches.Count) product matches"

# Test the first product
if ($productMatches.Count -gt 0) {
    $firstProduct = $productMatches[0].Value
    Write-Host "First product content:"
    Write-Host $firstProduct
    
    # Try to extract properties
    $nameMatch = [regex]::Match($firstProduct, '"name":\s*"([^"]+)"')
    $descriptionMatch = [regex]::Match($firstProduct, '"description":\s*"([^"]+)"')
    
    if ($nameMatch.Success) {
        Write-Host "Name: $($nameMatch.Groups[1].Value)"
    } else {
        Write-Host "Could not extract name"
    }
    
    if ($descriptionMatch.Success) {
        Write-Host "Description: $($descriptionMatch.Groups[1].Value)"
    } else {
        Write-Host "Could not extract description"
    }
}