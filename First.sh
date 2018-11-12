#!/bin/bash

file='config.js'
line=$(head -n 1 $file)
urlTest=$(echo $line| cut -d'"' -f 2)
echo $urlTest

# while read line; do
# echo $line
# urlTest=$(echo $line| cut -d'"' -f 2)
# echo $urlTest
# done < $file

lhCli="lighthouse ${urlTest} --output json --output html --output-path ./lighthouse.json"
appCli="node app.js"
echo `$lhCli`
echo `$appCli`
