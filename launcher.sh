#! /bin/bash

npm install -g .

alias editor="$(git config core.editor)"

if [ "$(alias editor | sed -r "s/.*='(.*)'/\1/")" != "" ]; then
    editor ./README.md
else
    start ./README.md
fi
