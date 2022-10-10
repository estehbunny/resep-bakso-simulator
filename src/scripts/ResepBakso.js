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

  getRequiredIngredientData(ingredientId, requiredAmount) {
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
      requiredAmount: requiredAmount,
      instantBuy: instantBuyInfo
    }
  }

  getRecipeInformation(menu) {
    let totalIngredientPrice = 0
    let totalInstantBuyIngredientPrice = 0
    let menuInfo = {...menu}
    menuInfo.recipe = menu.recipe.map((recipe) => {
      let ingredientData = this.getRequiredIngredientData(
        recipe.id,
        recipe.amount
      )
      totalIngredientPrice += ResepBakso.getPricePerAmount(
        ingredientData,
        ingredientData.requiredAmount
      )
      if (ingredientData.instantBuy) {
        totalInstantBuyIngredientPrice += ResepBakso.getPricePerAmount(
          ingredientData.instantBuy,
          ingredientData.requiredAmount
        )
      } else {
        totalInstantBuyIngredientPrice += ResepBakso.getPricePerAmount(
          ingredientData,
          ingredientData.requiredAmount
        )
      }
      return ingredientData
    })
    menuInfo.basePrice = totalIngredientPrice
    menuInfo.baseInstantPrice = totalInstantBuyIngredientPrice
    return menuInfo
  }

  getAllRecipes() {
    return this.baksoList.map((element) => {
      return this.getRecipeInformation(element)
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

  static getPricePerAmount(ingredientData, requiredAmount) {
    return (ingredientData.price / ingredientData.amount) * requiredAmount
  }
}

export default ResepBakso
