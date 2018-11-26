#!/bin/bash

# file='config.js'
# line=$(head -n 1 $file)
# urlTest=$(echo $line| cut -d'"' -f 2)
# echo $urlTest

# while read line; do
#     urlTest=$(echo $line| cut -d'"' -f 2)
#     echo $urlTest
# done < $file

# lhCli="lighthouse ${urlTest} --output json --output html --output-path ./lighthouse.json"
# appCli="node app.js"
# uploadCli="curl -T test.html ftp://jodywall.com --user seo-reports@jodywall.com:ZlA[=z0V3rOq"
# echo `$lhCli`
# echo `$appCli`

# while IFS='' read -r line || [[ -n "$line" ]]; do
#     # echo "Text read from file: $line"
#     urlTest=$(echo $line| cut -d'"' -f 2)
#     echo $urlTest
# done < "$1"

# while IFS='' read -r line; do
#     echo "const urlTest = '$line';" >> test_file2.js
# done < "test.txt"
# echo "completed"

# Create new file handle 5
exec 5< ad-hoc.txt
# Now you can use "<&5" to read from this file
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
# Close file handle 5
exec 5<&-