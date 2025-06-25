# DigiFlazz API Client (Node.js)

A simple Node.js wrapper to interact with [DigiFlazz](https://digiflazz.com/) API.  
Supports checking balance, getting product price list, and processing transactions.

## 📦 Installation

```bash
npm install
```

> Make sure you have `axios` and `crypto` available.  
> `crypto` is built-in, but you can install axios if needed:
```bash
npm install axios
```

## 📁 File Structure

```
.
├── src/
│   └── digiflazz.js     # DigiFlazz API Client class
├── example/
│   └── index.js         # Example usage
└── README.md
```

## 🚀 Usage Example

```js
const DigiFlazz = require('../src/digiflazz')

async function main() {
  const USERNAME = ''
  const API_KEY = ''
  const digiflazz = new DigiFlazz(USERNAME, API_KEY)

  console.log('📌 Checking balance...')
  const balance = await digiflazz.checkBalance()
  console.log('Balance:', balance)

  console.log('\n📌 Fetching price list...')
  const prices = await digiflazz.getPriceList()
  console.log('Number of products:', prices.length)
  console.log('First product:', prices[0])

  console.log('\n📌 Running test transaction / check transaction...')
  const dataTrx = ['xldata5k', '085712345678', 'INV1234567890', 'Pembelian Pulsa Test', true]
  const trx = await digiflazz.processTransaction(...dataTrx)
  console.log('Transaction result:', trx)
}

main()
```

## ✅ Available Methods

### `checkBalance()`

Check account balance.

### `getPriceList()`

Fetch available product price list.

### `processTransaction(id_product, customer_no, ref_id, desc, isTesting = false)`

Create a new transaction.  
If `ref_id` has been used before, DigiFlazz will return the status of the existing transaction.

---

## 📌 Notes

- The `ref_id` must be **unique** for every transaction attempt.
- If you send the same `ref_id` again, DigiFlazz will **return the existing transaction result**, not create a new one.
- Use testing mode (`isTesting = true`) to safely simulate transactions.

## 🪪 License

MIT © 2025 NeaByteLab