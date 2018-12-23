#!/bin/bash
exec 5< adhoc-seo-api-report.txt

while read line1 <&5 ; do
    read line2 <&5
    read line3 <&5
    read line4 <&5
    echo "Four lines: $line1 $line2 $line3 $line4"
    echo "const urlTest = '$line1';" > config.js
    echo "const sheetId = '$line2';" >> config.js
    echo "const htmlFolderId = '$line3';" >> config.js
    echo "module.exports = {urlTest, sheetId, htmlFolderId};" >> config.js
    file='config.js'
    line=$(head -n 2 $file)
    urlTest=$(echo $line| cut -d"'" -f 2)
    DATE=`date +%Y-%m-%d`
    html="${urlTest##*/}_${DATE}.html"
    lhCli="lighthouse ${urlTest} --output json --output html --output-path ./lighthouse.json"
    appCli="node app.js"
    uploadCli="curl -T ${html} ftp://jodywall.com --user seo-reports@jodywall.com:ZlA[=z0V3rOq"
    echo `$lhCli`
    echo `$appCli`
    echo `$uploadCli`
done

exec 5<&-