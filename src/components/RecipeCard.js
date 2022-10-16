import React from 'react'

import ResepHelper from '../scripts/ResepHelper'
import ResepBakso from '../scripts/ResepBakso'

class MenuCard extends React.Component {
  capitalizeHyphens(string) {
    return string
      .split('-')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join('-')
  }

  render() {
    this.menu = this.props.menu
    const caption = `${this.menu.name} - ${ResepHelper.displayPrice(
      this.menu.sellPrice
    )}`
    const capitalizedImageFileName = this.capitalizeHyphens(this.menu.id)
    return (
      <div className='table__cell card card__recipe'>
        <img
          src={`${process.env.PUBLIC_URL}/assets/bakso/${capitalizedImageFileName}.png`}
          alt={caption}
          title={caption}
        ></img>
        <div>{this.menu.name}</div>
      </div>
    )
  }
}

class IngredientCard extends React.Component {
  render() {
    this.item = this.props.item
    const ingredientPrice = ResepHelper.displayPrice(
      ResepBakso.getPricePerAmount(this.item, this.item.requiredAmount)
    )
    let ingredientInstantPrice = ingredientPrice
    if (this.item.instantBuy) {
      let instantBuyInfo = this.item.instantBuy
      ingredientInstantPrice = ResepHelper.displayPrice(
        ResepBakso.getPricePerAmount(instantBuyInfo, this.item.requiredAmount)
      )
    }
    let displayPrice = this.props.instantBuy && this.item.instantBuy ? (
      <strong>{ingredientInstantPrice}</strong>
    ) : (
      ingredientPrice
    )
    const caption = `${this.item.name} (${this.item.amount}x, ${ingredientPrice})`
    return (
      <div className='table__cell card card-ingredient'>
        <img
          src={`${process.env.PUBLIC_URL}/assets/item/${this.item.id}.png`}
          alt={this.item.name}
          title={caption}
        ></img>
        <div className='card__price card-ingredient-info'>{displayPrice}</div>
      </div>
    )
  }
}

class RecipeCard extends React.Component {
  getSellPrice() {
    return ResepHelper.displayPrice(this.props.item.sellPrice)
  }

  getOnlineOrderSellPrice() {
    let onlineOrderPrice = this.props.item.sellPrice * 1.75
    return ResepHelper.displayPrice(onlineOrderPrice)
  }

  getRecipePrice() {
    let item = this.props.item
    if (!item.recipeSource || item.recipeSource === '-') {
      return `Tersedia sejak awal game`
    }
    return `${ResepHelper.displayPrice(item.recipePrice)} - ${
      item.recipeSource
    }`
  }

  getBasePrice() {
    let item = this.props.item
    if (this.props.instantBuy) {
      return <strong>Lp{item.baseInstantPrice.toLocaleString('id')}</strong>
    }
    return <span>Lp{item.basePrice.toLocaleString('id')}</span>
  }

  render() {
    let item = this.props.item
    let recipeInfo = (
      <div>
        Cara mendapatkan resep: {this.getRecipePrice()} | Harga bahan:{' '}
        {this.getBasePrice()}
      </div>
    )
    let recipeNote
    if (item.note) {
      recipeNote = (
        <div>
          <strong>Note:</strong> {item.note}
        </div>
      )
    }
    return (
      <div className='table'>
        <div className='table--inner' key={item.id}>
          <div className='table--row table--row__top'>
            <MenuCard menu={item} key={item.id} />
            <TableCell type='follow' />
            {item.recipe.map((ingredient) => {
              return (
                <IngredientCard
                  item={ingredient}
                  key={ingredient.id}
                  instantBuy={this.props.instantBuy}
                />
              )
            })}
          </div>
          <div className='table--row table--row__bottom'>
            <TableCell type='price'>
              <div>{this.getSellPrice()}</div>
              <div className='table__cell--price-alt'>({this.getOnlineOrderSellPrice()})</div>
            </TableCell>
            <TableCell />
            {item.recipe.map((ingredient) => {
              return (
                <TableCell type='amount' key={ingredient.id}>
                  {ingredient.requiredAmount}
                </TableCell>
              )
            })}
          </div>
        </div>
        <div className='table--row__info'>
          <div>{recipeInfo}</div>
          {recipeNote}
        </div>
      </div>
    )
  }
}

function TableCell(props) {
  if (props.type === 'follow') {
    return <div className='table__cell table__cell--follow'>{`>>`}</div>
  } else if (props.type === 'price') {
    return (
      <div className='table__cell table__cell--price'>{props.children}</div>
    )
  } else if (props.type === 'amount') {
    return (
      <div className='table__cell table__cell--amount'>{props.children}</div>
    )
  }
  return <div className='table__cell'>{props.children}</div>
}

export default RecipeCard
