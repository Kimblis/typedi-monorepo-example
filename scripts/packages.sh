#!/bin/bash
COUNT=3

echo "🟢 Installing NPM Packages for Common... [1/${COUNT}] 🚀"
yarn

echo "🟢 Installing NPM Packages for service1... [2/${COUNT}] 🚀"
cd ./service1
yarn

echo "🟢 Installing NPM Packages for service2... [3/${COUNT}] 🚀"
cd ../service2
yarn 

echo "🟢 You are ready to go! 🎉"