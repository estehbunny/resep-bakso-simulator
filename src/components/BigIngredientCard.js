import React from 'react'

import ResepHelper from '../scripts/ResepHelper'

class BigIngredientCard extends React.Component {
  render() {
    this.item = this.props.item
    return (
      <div className='bigcard bigcard--ingredient'>
        <div className='card card__cell__border card-ingredient__art'>
          <div className=''>
            <img
              src={`${process.env.PUBLIC_URL}/assets/item/${this.item.id}.png`}
              alt={this.item.name}
            ></img>
          </div>
        </div>
        <div className='card card__cell'>
          <div className='card-ingredient__title'>{this.item.name}</div>
        </div>
        <div className='card card__cell'>
          <div className='card-ingredient-info'>
            {ResepHelper.displayPrice(this.item.price)}/pack
          </div>
          <div className='card-ingredient-info'>
            {ResepHelper.displayPrice(this.item.price / this.item.amount)}/item
          </div>
        </div>
        <div className='card card__cell'>
          <div className='card-ingredient-info'>
            {this.item.availability}
          </div>
        </div>
      </div>
    )
  }
}

export default BigIngredientCard
