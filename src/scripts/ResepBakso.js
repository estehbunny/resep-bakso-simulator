import Bakso from '../data/bakso.json'
import Bahan from '../data/bahan.json'

import BaksoMobile from '../data/mobile/bakso.json'
import BahanMobile from '../data/mobile/bahan.json'

import InstantIngredient from '../data/bahan-instan.json'

class ResepBakso {
  constructor(isMobile) {
    this.baksoList = isMobile ? BaksoMobile : Bakso
    this.ingredientList = isMobile ? BahanMobile : Bahan
  }

  getRequiredIngredientData(ingredientId, amount) {
    let ingredient = this.ingredientList.find((element) => {
      return element.id === ingredientId
    })
    let instantBuyInfo
    if (ingredient.essential) {
      let instantIngredient = InstantIngredient.find((element) => {
        return element.id === ingredientId
      })
      instantBuyInfo = {
        price: instantIngredient.cost,
        amount: instantIngredient.amount
      }
    }
    return {
      ...ingredient,
      amount: amount,
      amountPerPack: ingredient.amount,
      instantBuy: instantBuyInfo
    }
  }

  getAllRecipes() {
    return this.baksoList.map((element) => {
      let totalIngredientPrice = 0
      let totalInstantBuyIngredientPrice = 0
      element.recipe = element.recipe.map((recipe) => {
        let ingredientData = this.getRequiredIngredientData(
          recipe.id,
          recipe.amount
        )
        totalIngredientPrice +=
          (ingredientData.price / ingredientData.amountPerPack) *
          ingredientData.amount
        if (ingredientData.instantBuy) {
          totalInstantBuyIngredientPrice +=
            (ingredientData.instantBuy.price /
              ingredientData.instantBuy.amount) *
            ingredientData.amount
        } else {
          totalInstantBuyIngredientPrice +=
            (ingredientData.price / ingredientData.amountPerPack) *
            ingredientData.amount
        }
        return ingredientData
      })
      element.basePrice = totalIngredientPrice
      element.baseInstantPrice = totalInstantBuyIngredientPrice
      return element
    })
  }

  getAllIngredients() {
    return this.ingredientList.map((ingredient) => {
      let instantBuyInfo
      if (ingredient.essential) {
        let instantIngredient = InstantIngredient.find((element) => {
          return element.id === ingredient.id
        })
        instantBuyInfo = {
          price: instantIngredient.cost,
          amount: instantIngredient.amount
        }
      }
      return {...ingredient, instantBuy: instantBuyInfo}
    })
  }
}

export default ResepBakso
