#!/bin/bash

set -eu

secret=`cat .secret`
ganache-cli -m "$secret"
truffle migrate