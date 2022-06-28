import Bakso from '../data/bakso.json'
import Bahan from '../data/bahan.json'

import BaksoMobile from '../data/mobile/bakso.json'

class ResepBakso {
  constructor(isMobile) {
    this.baksoList = isMobile ? BaksoMobile : Bakso
  }

  static getIngredientPrice(ingredientId, amount) {
    let ingredient = Bahan.find((element) => {
      return element.id === ingredientId
    })
    return (ingredient.price / ingredient.amount) * amount
  }

  estimateRecipeCost(baksoId) {
    let bakso = this.baksoList.find((element) => {
      return element.id === baksoId
    })
    let totalPrice = 0
    bakso.recipe.forEach((element) => {
      totalPrice += ResepBakso.getIngredientPrice(element.id, element.amount)
    })
    return totalPrice
  }

  getAll() {
    return this.baksoList.map((element) => {
      element.basePrice = this.estimateRecipeCost(element.id)
      return element
    })
  }
}

export default ResepBakso
