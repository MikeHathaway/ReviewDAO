#!/bin/bash

set -eu

new=$1

if [ "$new" = "true" ]; then
    touch .secret

    echo "Retrieving bip39 compatibile wordlist from GitHub"
    wget -O bip39.txt https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt

    echo "Generating Mnemonic"
    mnemonic=`shuf -n 24 bip39.txt | xargs echo`

    echo "Storing Secrets"
    cat "$mnemonic" > .secret
fi

echo "Deploying Development Blockchain"
secret=`cat .secret`
ganache-cli -m "$secret" &

echo "Deploying Smart Contracts"
truffle migrate