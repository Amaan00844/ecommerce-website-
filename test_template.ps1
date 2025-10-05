# Test script to debug template replacement issue

$template = Get-Content -Path "product_template.html" -Raw

# Test with a sample product
$name = "AC Air Filter Set"
$displayPrice = "₹450"
$numericPrice = "450"
$image = "assets/products/AC Air Filter Set.jpg"
$category = "ac"
$description = "Set of high-density filters to ensure clean air and protect the AC unit."

Write-Host "Before replacement:"
Write-Host $template.Substring(1000, 200)

# Replace placeholders in template
$pageContent = $template -replace "PRODUCT_NAME", $name
$pageContent = $pageContent -replace "PRODUCT_DISPLAY_PRICE", $displayPrice
$pageContent = $pageContent -replace "PRODUCT_NUMERIC_PRICE", $numericPrice
$pageContent = $pageContent -replace "PRODUCT_IMAGE", $image
$pageContent = $pageContent -replace "PRODUCT_CATEGORY", $category
$pageContent = $pageContent -replace "PRODUCT_DESCRIPTION", $description

Write-Host "`nAfter replacement:"
Write-Host $pageContent.Substring(1000, 200)

# Save the file
$path = "test_output.html"
Set-Content -Path $path -Value $pageContent
Write-Host "`nTest file saved to $path"