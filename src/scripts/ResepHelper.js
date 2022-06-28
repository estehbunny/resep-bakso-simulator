class ResepHelper {
  static displayPrice(price, prefix = 'Lp') {
    return `${prefix}${price.toLocaleString('id')}`
  }
}

export default ResepHelper
