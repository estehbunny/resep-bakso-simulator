import React from 'react'

import ResepHelper from '../scripts/ResepHelper'

class BigIngredientCard extends React.Component {
  render() {
    this.item = this.props.item
    return (
      <div className='bigcard bigcard--ingredient'>
        <div className='card card--cell__border card-ingredient-art'>
          <div className=''>
            <img
              src={`./assets/item/${this.item.id}.png`}
              alt={this.item.name}
            ></img>
          </div>
        </div>
        <div className='card card--cell'>
          <div className='card card-ingredient-title'>{this.item.name}</div>
        </div>
        <div className='card card--cell'>
          <div className='card card-ingredient-info'>
            {ResepHelper.displayPrice(this.item.price)}/pack
          </div>
          <div className='card card-ingredient-info'>
            {ResepHelper.displayPrice(this.item.price / this.item.amount)}/item
          </div>
        </div>
        <div className='card card--cell'>
          <div className='card card-ingredient-info'>
            {this.item.availability}
          </div>
        </div>
      </div>
    )
  }
}

export default BigIngredientCard
