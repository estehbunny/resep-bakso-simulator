import React from 'react'

import ResepBakso from '../scripts/ResepBakso'
import ResepHelper from '../scripts/ResepHelper'

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
    return (
      <div className='table--cell card card-recipe'>
        <img
          src={`./assets/bakso/${this.capitalizeHyphens(this.menu.id)}.png`}
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
      ResepBakso.getIngredientPrice(this.item.id, this.item.amount)
    )
    const caption = `${this.item.id} (${this.item.amount}x, ${ingredientPrice})`
    return (
      <div className='table--cell card card-ingredient'>
        <img
          src={`./assets/item/${this.item.id}.png`}
          alt={this.item.id}
          title={caption}
        ></img>
        <div className='card card-ingredient-info'>{ingredientPrice}</div>
      </div>
    )
  }
}

class RecipeCard extends React.Component {
  getSellPrice() {
    return ResepHelper.displayPrice(this.props.item.sellPrice)
  }

  getRecipePrice() {
    let item = this.props.item
    if (!item.recipeSource || item.recipeSource === '-') {
      return `Tersedia sejak awal game`
    }
    return `${ResepHelper.displayPrice(item.recipePrice)} - ${item.recipeSource}`
  }

  getBasePrice() {
    let item = this.props.item
    return `Lp${item.basePrice.toLocaleString('id')}`
  }

  render() {
    let item = this.props.item
    return (
      <div className='table'>
        <div className='table--inner' key={item.id}>
          <div className='table--row table--row__top'>
            <MenuCard menu={item} key={item.id} />
            <TableCell type='follow' />
            {item.recipe.map((element) => {
              return <IngredientCard item={element} key={element.id} />
            })}
          </div>
          <div className='table--row table--row__bottom'>
            <TableCell>{this.getSellPrice()}</TableCell>
            <TableCell />
            {item.recipe.map((element) => {
              return <TableCell key={element.id}>{element.amount}</TableCell>
            })}
          </div>
        </div>
        <div className='table--row__info'>
          <div>
            {this.getRecipePrice()} | Base Price: {this.getBasePrice()}
          </div>
        </div>
      </div>
    )
  }
}

function TableCell(props) {
  if (props.type === 'follow') {
    return <div className='table--cell cell-follow'>{`>>`}</div>
  }
  return <div className='table--cell'>{props.children}</div>
}

export default RecipeCard
