import React from 'react'

import ResepHelper from '../scripts/ResepHelper'

class BigIngredientCard extends React.Component {
  renderPriceInfo(price, amount, instantBuy = false) {
    let category = instantBuy ? 'instant-price' : 'price'
    let cardCellType = instantBuy ? 'card__cell__border' : 'card__cell'
    return (
      <div className={`card ${cardCellType} card--${category}`}>
        {instantBuy &&
          <div className='card__title'><strong>Instant Buy</strong></div>
        }
        <div className='card-ingredient-info'>
          {ResepHelper.displayPrice(price)}/pack
        </div>
        <div className='card-ingredient-info'>
          {ResepHelper.displayPrice(price / amount)}/item
        </div>
      </div>
    )
  }

  render() {
    this.item = this.props.item
    let instantBuyInfo
    if (this.item.instantBuy) {
      instantBuyInfo = this.renderPriceInfo(
        this.item.instantBuy.price,
        this.item.instantBuy.amount,
        true
      )
    }
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
        {this.renderPriceInfo(this.item.price, this.item.amount)}
        {instantBuyInfo}
        <div className='card card__cell'>
          <div className='card-ingredient-info'>{this.item.availability}</div>
        </div>
      </div>
    )
  }
}

export default BigIngredientCard
