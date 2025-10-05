# Script to fix image paths in product-data.js to match actual filenames in assets/products directory

# Get all image files in the assets/products directory
$imageFiles = Get-ChildItem -Path "assets/products" -File | ForEach-Object {
    @{
        Name = $_.Name
        BaseName = $_.BaseName
    }
}

# Read the product-data.js file
$productDataContent = Get-Content -Path "product-data.js" -Raw

# Create a mapping of product names to image filenames
$imageMap = @{}

foreach ($imageFile in $imageFiles) {
    # Convert filename to a more readable format for matching
    $key = $imageFile.Name -replace '\.jpg$', '' -replace '\.jpeg$', '' -replace '\.png$', '' -replace '-', ' ' -replace '_', ' '
    $imageMap[$key.ToLower()] = "assets/products/$($imageFile.Name)"
}

# Fix the image paths in product-data.js
$fixedContent = $productDataContent

# Extract all product objects
$productMatches = [regex]::Matches($productDataContent, '\{[^}]*\}')

foreach ($match in $productMatches) {
    $productObject = $match.Value
    
    # Extract name and current image path
    if ($productObject -match 'name:\s*"([^"]+)"' -and $productObject -match 'image:\s*"([^"]+)"') {
        $productName = $matches[1]
        $currentImagePath = $matches[1]
        
        # Try to find a matching image file
        $lowerName = $productName.ToLower()
        
        # Try different variations to match the image
        $possibleKeys = @(
            $lowerName,
            ($lowerName -replace '[^a-z0-9 ]', ''),
            ($lowerName -replace ' ', '-'),
            ($lowerName -replace ' ', '_'),
            ($lowerName -replace '[^a-z0-9 ]', '' -replace ' ', '-'),
            ($lowerName -replace '[^a-z0-9 ]', '' -replace ' ', '_')
        )
        
        $found = $false
        foreach ($key in $possibleKeys) {
            foreach ($imageEntry in $imageMap.GetEnumerator()) {
                if ($imageEntry.Key -eq $key) {
                    # Replace the image path
                    $oldPathPattern = [regex]::Escape($currentImagePath)
                    $fixedContent = $fixedContent -replace "image:\s*`"$oldPathPattern`"", "image:`"$($imageEntry.Value)`""
                    $found = $true
                    break
                }
            }
            if ($found) { break }
        }
        
        # If not found, try partial matching
        if (!$found) {
            foreach ($imageEntry in $imageMap.GetEnumerator()) {
                if ($imageEntry.Key.Contains($lowerName) -or $lowerName.Contains($imageEntry.Key)) {
                    # Replace the image path
                    $oldPathPattern = [regex]::Escape($currentImagePath)
                    $fixedContent = $fixedContent -replace "image:\s*`"$oldPathPattern`"", "image:`"$($imageEntry.Value)`""
                    $found = $true
                    break
                }
            }
        }
    }
}

# Write the fixed content back to the file
Set-Content -Path "product-data.js" -Value $fixedContent

Write-Host "Image paths in product-data.js have been updated to match actual filenames."
Write-Host "Please verify the changes and test the product images."