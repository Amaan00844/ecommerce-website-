# Read the product data from product-data.js
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

$template = Get-Content -Path "product_template.html" -Raw

Write-Host "Found $($productMatches.Count) products to process"

foreach ($productMatch in $productMatches) {
    $productContent = $productMatch.Value
    
    # Extract product properties (without quotes around keys)
    $idMatch = [regex]::Match($productContent, 'id:\s*"([^"]+)"')
    $nameMatch = [regex]::Match($productContent, 'name:\s*"([^"]+)"')
    $priceMatch = [regex]::Match($productContent, 'price:\s*"([^"]+)"')
    $categoryMatch = [regex]::Match($productContent, 'category:\s*"([^"]+)"')
    $imageMatch = [regex]::Match($productContent, 'image:\s*"([^"]+)"')
    $descriptionMatch = [regex]::Match($productContent, 'description:\s*"([^"]+)"')
    
    if ($nameMatch.Success -and $priceMatch.Success -and $categoryMatch.Success -and $imageMatch.Success) {
        $id = if ($idMatch.Success) { $idMatch.Groups[1].Value } else { "" }
        $name = $nameMatch.Groups[1].Value
        $displayPrice = $priceMatch.Groups[1].Value
        $category = $categoryMatch.Groups[1].Value
        $image = $imageMatch.Groups[1].Value
        $description = if ($descriptionMatch.Success) { $descriptionMatch.Groups[1].Value } else { "High-quality spare part for $category appliances. Compatible with most brands and models. Easy to install and reliable performance." }
        
        # Extract numeric price (remove currency symbols and commas)
        $numericPrice = $displayPrice -replace '[^\d.]', ''
        
        # Generate filename with URL encoding
        $filename = [uri]::EscapeDataString($name) + ".html"
        
        Write-Host "Processing: $name"
        Write-Host "  Description: $description"
        
        # Replace placeholders in template with more precise replacements
        $pageContent = $template -replace "<title>PRODUCT_NAME", "<title>$name"
        $pageContent = $pageContent -replace "PRODUCT_DISPLAY_PRICE", $displayPrice
        $pageContent = $pageContent -replace "PRODUCT_NUMERIC_PRICE", $numericPrice
        $pageContent = $pageContent -replace "PRODUCT_IMAGE", $image
        $pageContent = $pageContent -replace "PRODUCT_CATEGORY", $category
        $pageContent = $pageContent -replace "<h1 class=`"product_title`">PRODUCT_NAME</h1>", "<h1 class=`"product_title`">$name</h1>"
        $pageContent = $pageContent -replace "data-name=`"PRODUCT_NAME`"", "data-name=`"$name`""
        $pageContent = $pageContent -replace "data-img=`"PRODUCT_IMAGE`"", "data-img=`"$image`""
        $pageContent = $pageContent -replace "<p>PRODUCT_DESCRIPTION</p>", "<p>$description</p>"
        
        # Save the file
        $path = "product\$filename"
        Set-Content -Path $path -Value $pageContent
    }
}