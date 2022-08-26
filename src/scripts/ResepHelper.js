class ResepHelper {
  // Temporarily use decimal for Sp price, need to be updated with new API price
  static displayPrice(price) {
    let prefix = (Number.isInteger(price)) ? "Lp" : "Sp"
    return this.displayPriceWithPrefix(Math.floor(price), prefix)
  }

  static displayPriceWithPrefix(price, prefix) {
    return `${prefix}${price.toLocaleString('id')}`
  }
}

export default ResepHelper
