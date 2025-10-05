$content = Get-Content -Path "products.html" -Raw

# Find all product cards
$matches = [regex]::Matches($content, '<div class="product_card"[^>]*><h4>([^<]+)</h4><p>[^<]+</p><img[^>]+><div class="product_actions"><button class="wish_btn"><i class="ri-heart-3-line"></i></button><button class="add_btn">Add to Cart</button></div></div>')

foreach ($match in $matches) {
    $name = $match.Groups[1].Value
    $newButton = "<button class=""view_btn"" onclick=""window.location.href='product/$name.html'"">View Details</button>"
    $old = $match.Value
    $new = $old -replace '</div></div>$', "$newButton</div></div>"
    $content = $content -replace [regex]::Escape($old), $new
}

Set-Content -Path "products.html" -Value $content
