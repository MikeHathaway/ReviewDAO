#!/bin/bash

set -eu

echo "Deploying Development Blockchain"
secret=`cat .secret`
ganache-cli -m "$secret"

echo "Deploying Smart Contracts"
truffle migrate