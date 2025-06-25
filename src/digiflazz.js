const axios = require('axios')
const crypto = require('crypto')

/**
 * DigiFlazz API Client
 *
 * Provides methods to interact with DigiFlazz API, including checking balance,
 * retrieving price list, and processing transactions.
 */
class DigiFlazz {
  constructor(username, api_key) {
    this.api_url = 'https://api.digiflazz.com/v1'
    this.api_key = api_key
    this.username = username
  }

  /**
   * Generate MD5 signature required by DigiFlazz API
   * @param {string} data - The data string to sign
   * @returns {string} - MD5 hash signature
   */
  createSignature(data) {
    const string = `${this.username}${this.api_key}${data}`
    return crypto.createHash('md5').update(string).digest('hex')
  }

  /**
   * Check DigiFlazz account balance
   * @returns {Promise<number|boolean>} - Returns balance or false on failure
   */
  async checkBalance() {
    try {
      const requestPayload = {
        cmd: 'deposit',
        username: this.username,
        sign: this.createSignature('depo')
      }
      const requestResponse = await axios.post(`${this.api_url}/cek-saldo`, requestPayload)
      return requestResponse.data.data.deposit
    } catch (err) {
      console.log(`[DIGIFLAZZ-API] checkBalance: ${err.message}`)
      return false
    }
  }

  /**
   * Get prepaid product price list
   * @returns {Promise<Array|boolean>} - Returns price list or false on failure
   */
  async getPriceList() {
    try {
      const requestPayload = {
        cmd: 'prepaid',
        username: this.username,
        sign: this.createSignature('pricelist')
      }
      const requestResponse = await axios.post(`${this.api_url}/price-list`, requestPayload)
      const requestData = requestResponse.data.data
      if (requestData.length > 0) {
        return requestData
      } else {
        return false
      }
    } catch (err) {
      console.log(`[DIGIFLAZZ-API] getPriceList: ${err.message}`)
      return false
    }
  }

  /**
   * Process a product transaction
   * @param {string} id_product - Product SKU code
   * @param {string} customer_no - Customer number
   * @param {string} invoice - Unique transaction ID
   * @param {string} desc - Description or message
   * @param {boolean} isTesting - Optional flag for testing mode
   * @returns {Promise<Object|boolean>} - Returns transaction result or false on failure
   */
  async processTransaction(id_product, customer_no, invoice, desc, isTesting = false) {
    try {
      const requestPayload = {
        username: this.username,
        buyer_sku_code: id_product,
        customer_no,
        ref_id: invoice,
        sign: this.createSignature(invoice),
        msg: desc,
        testing: isTesting
      }
      const requestResponse = await axios.post(`${this.api_url}/transaction`, requestPayload)
      return requestResponse.data.data
    } catch (err) {
      console.log(`[DIGIFLAZZ-API] processTransaction: ${err.message}`)
      return false
    }
  }
}

module.exports = DigiFlazz