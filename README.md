Pepe Credit Union
==================
**Nearvember Challenge #6** 

Get Pepe Coin now

[Live site](https://pepe-credit-union.netlify.app/)

[Deploy Tx](https://explorer.testnet.near.org/transactions/FBs8PAwAeX9Q2cppDCJQMdC2yF1RYz32bdqBwhngtAuK)

[NFT Contract](https://github.com/near-examples/ft-tutorial)

![](https://github.com/nuggetnchill/pepe-credit-union/blob/main/src/assets/pepe-bank.png?raw=true)

[![Netlify Status](https://api.netlify.com/api/v1/badges/80f56588-7ea2-4d97-b4fe-e303e4b2385a/deploy-status)](https://app.netlify.com/sites/pepe-credit-union/deploys)
==================
Don't have a Near Tesnet Wallet? [Create one now](https://wallet.testnet.near.org/), It's free!!!
==================

Contract testing commands:

Deploy
`near dev-deploy --wasmFile res/fungible_token.wasm --helperUrl https://near-contract-helper.onrender.com`

Initialize (total_supply here is just initial supply, there is no cap)

`near call $CONTRACT_NAME new '{"owner_id": "'$CONTRACT_NAME'", "total_supply": "10000000", "metadata": { "spec": "ft-1.0.0", "name": "PEPE Coin", "symbol": "PEPE", "decimals": 0 }}' --accountId $CONTRACT_NAME`

Register to interact
`near call $CONTRACT_NAME storage_deposit '' --accountId wallet.testnet --amount 0.00125`

Mint FT to wallet u want `near call $CONTRACT_NAME ft_mint '{"receiver_id":"nugget.testnet", "amount":"69"}' --accountId wallet.testnet --amount 0.00125`

Check Balance of wallet `near view $CONTRACT_NAME ft_balance_of '{"account_id": "'wallet.testnet'"}'`

Check Total mint supply `near view $CONTRACT_NAME ft_total_supply ''`
