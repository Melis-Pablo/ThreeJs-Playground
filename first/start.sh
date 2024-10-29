#!/bin/bash

if $1 == "init"; then
	npm install --save three
	npm install --save-dev vite
	npm install dat.gui
else
	npx vite
fi