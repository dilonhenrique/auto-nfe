#!/bin/bash

echo "Gerando .npmrc com envsubst"
envsubst < .npmrc.template > .npmrc
