import React from 'react'
import './App.css'
import './apptest.css'

import ResepBakso from './resep-bakso'
import BahanBakso from './data/bahan.json'
import VersionPlatform from './data/platforms.json'

class IngredientCard extends React.Component {
  render() {
    this.item = this.props.item
    return (
      <div className='table--cell card card-ingredient'>
        <img src={`./assets/item/${this.item.id}.png`} alt={this.item.id}></img>
        <div className='card card-ingredient-info'>{this.item.id}</div>
        <div className='card card-ingredient-info'>
          Lp{ResepBakso.getIngredientPrice(this.item.id, this.item.amount)}
        </div>
      </div>
    )
  }
}

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
            Lp{this.item.price}/pack
          </div>
          <div className='card card-ingredient-info'>
            Lp{this.item.price / this.item.amount}/item
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

class MenuCard extends React.Component {
  render() {
    this.menu = this.props.menu
    return (
      <div className='table--cell card card-recipe'>
        <img
          src={`./assets/bakso/${this.menu.id}.png`}
          alt={this.menu.name}
        ></img>
        <div>{this.menu.name}</div>
      </div>
    )
  }
}

class RecipeList extends React.Component {
  render() {
    return this.props.recipes.map((element) => {
      return <RecipeCard item={element} key={element.id} />
    })
  }
}

class RecipeCard extends React.Component {
  getSellPrice() {
    return `Lp${this.props.item.sell_price.toLocaleString('id')}`
  }

  getRecipePrice() {
    let item = this.props.item
    if (!item.recipe_source || item.recipe_source === '-') {
      return `Tersedia sejak awal game`
    }
    return `Lp${item.recipe_price.toLocaleString('id')} - ${item.recipe_source}`
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
          <div colSpan='3'>{this.getRecipePrice()}</div>
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

class VersionInfo extends React.Component {
  render() {
    this.platform = this.props.platform
    this.onChangeVersion = this.props.onChangeVersion
    this.selected = this.props.selected
    const parsedReleaseDate = new Date(this.platform.releaseDate)

    return (
      <div>
        <input
          id={this.platform.platformID}
          type='radio'
          name='platform'
          value={this.platform.platformID}
          onChange={this.onChangeVersion}
          defaultChecked={this.selected}
          className='hidden-radio'
        />
        <label htmlFor={this.platform.platformID}>
          <div
            className={`bigcard bigcard--version ${
              this.selected ? 'bigcard--selected' : ''
            }`}
          >
            <div>Platform: {this.platform.platform}</div>
            <div>Version: {this.platform.version}</div>
            <div>
              Release Date: {parsedReleaseDate.toLocaleDateString('ID')}
            </div>
          </div>
        </label>
      </div>
    )
  }
}

const SiteArtwork = () => {
  return (
    <div className='footer-fanart'>
      <img
        src='assets/bakso-simulator-fanart-mangkok.png'
        alt='Fanart mangkok bakso simulator'
      />
    </div>
  )
}

const CopyrightInfo = () => {
  const emoji = `(🧊🍹🐰)`
  return (
    <div id='copyright'>
      &copy; 2022 Akhir Pekan Studio, dibuat oleh <strong>EsTehBunny</strong>{' '}
      {emoji}
      <br />
      untuk referensi game <strong>Bakso Simulator</strong>.
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlatform: 'steam',
      isMobile: false,
      helperObject: new ResepBakso(false)
    }
  }

  updateVersion(version) {
    let isMobile = {
      steam: false,
      ios: true,
      android: true
    }
    let helperObject = new ResepBakso(isMobile[version])
    this.setState({
      selectedPlatform: version,
      isMobile: isMobile[version],
      helperObject: helperObject
    })
  }

  renderVersionInfo(platform) {
    return (
      <VersionInfo
        platform={platform}
        key={platform.platformID}
        onChangeVersion={() => this.updateVersion(platform.platformID)}
        selected={platform.platformID === this.state.selectedPlatform}
      />
    )
  }

  render() {
    let devType = VersionPlatform.find((e) => e.platformID === this.state.selectedPlatform)
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Resep Bakso Simulator</h1>
          <p>Selamat datang di Resep Bakso Simulator 👋</p>
        </header>
        <main>
          <h3>Platform List</h3>
          <div id='platforms'>
            <div className='assorted-bigcard'>
              {VersionPlatform.map((platform) => {
                return this.renderVersionInfo(platform)
              })}
            </div>
            <div>Using {devType.platform} version of Bakso Simulator</div>
          </div>
          <h3>Daftar Bahan</h3>
          <div id='ingredient' className='assorted-bigcard'>
            {BahanBakso.map((element) => {
              return <BigIngredientCard item={element} key={element.id} />
            })}
          </div>

          <h3>Daftar Menu</h3>
          <div id='recipe'>
            <RecipeList recipes={this.state.helperObject.getAll()} />
          </div>
        </main>
        <footer>
          <SiteArtwork />
          <CopyrightInfo />
        </footer>
      </div>
    )
  }
}

export default App
