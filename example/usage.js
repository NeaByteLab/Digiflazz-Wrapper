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