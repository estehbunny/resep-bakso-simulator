import Bakso from '../data/bakso.json'
import Bahan from '../data/bahan.json'

import BaksoMobile from '../data/mobile/bakso.json'
import BahanMobile from '../data/mobile/bahan.json'

class ResepBakso {
  constructor(isMobile) {
    this.baksoList = isMobile ? BaksoMobile : Bakso
    this.ingredientList = isMobile ? BahanMobile : Bahan
  }

  getRequiredIngredientData(ingredientId, amount) {
    let ingredient = this.ingredientList.find((element) => {
      return element.id === ingredientId
    })
    return {...ingredient, amount: amount, amountPerPack: ingredient.amount}
  }

  estimateRecipeCost(baksoId) {
    let bakso = this.baksoList.find((element) => {
      return element.id === baksoId
    })
    let totalPrice = 0
    bakso.recipe.forEach((element) => {
      totalPrice += (element.price / element.amountPerPack) * element.amount
    })
    return totalPrice
  }

  getAllRecipes() {
    return this.baksoList.map((element) => {
      element.basePrice = this.estimateRecipeCost(element.id)
      element.recipe = element.recipe.map((recipe) => {
        return this.getRequiredIngredientData(recipe.id, recipe.amount)
      })
      return element
    })
  }

  getAllIngredients() {
    return this.ingredientList
  }
}

export default ResepBakso
