Get-ChildItem -Path product\*.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '<body>') {
        $newContent = $content -replace '<body>', '<body class="product-detail-page">'
        Set-Content $_.FullName $newContent
    }
}
