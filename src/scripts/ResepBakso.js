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

  getAllRecipes() {
    return this.baksoList.map((element) => {
      let totalIngredientPrice = 0
      element.recipe = element.recipe.map((recipe) => {
        let ingredientData = this.getRequiredIngredientData(recipe.id, recipe.amount)
        totalIngredientPrice += (ingredientData.price / ingredientData.amountPerPack) * ingredientData.amount
        return ingredientData
      })
      element.basePrice = totalIngredientPrice
      return element
    })
  }

  getAllIngredients() {
    return this.ingredientList
  }
}

export default ResepBakso
