# Wallet Experiment

The v1 wallet experiment is a mock wallet UX. It is required, but it is intentionally non-blocking and safe.

## What it does

- Lets the learner click a connect/disconnect button.
- Shows a generated demo address.
- Explains that no real wallet, signature, seed phrase, RPC, or mainnet is involved.
- Allows the market simulation to work even if the mock wallet is disconnected.

## What it does not do

- It does not use WalletConnect.
- It does not use RainbowKit or wagmi in v1 core.
- It does not connect to Sepolia, mainnet, or any blockchain.
- It does not sign transactions.

## Future extension

A future confirmed extension could add RainbowKit/wagmi with a testnet-only guide. That would require explicit confirmation because it introduces project IDs, RPC reliability, and extra beginner setup friction.
