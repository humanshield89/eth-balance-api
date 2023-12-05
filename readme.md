# ETH/ERC20 Balance API

## Install Dependencies

```bash
pnpm install
```

## Run Dev Server

```bash
pnpm run dev
```

## Environment Variables

- `PORT` - Port to run the server on
- `ETH_RPC` - Ethereum RPC URL

## Endpoints

### `GET /balance/:address`

Returns the ETH and ERC20 token balances for the given address

```json
{
    "value": "1288532508412131", // wei
    "formatted": "0.001288532508412131", // ETH
    "decimals": 18 // decimals of the token
}
```

### `GET /balance/:token/:address`

Returns the balance of the given token for the given address

* If token is `zeroAddress` then it will return the ETH balance

```json
{
    "value": "2000000000", // raw value (full precision)
    "formatted": "2000.0", // formatted value
    "decimals": 6 // decimals of the token
}
```