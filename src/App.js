import React from 'react'
import './App.css'

import BigIngredientCard from './components/BigIngredientCard'
import RecipeCard from './components/RecipeCard'
import VersionInfo from './components/VersionInfo'

import ResepBakso from './scripts/ResepBakso'
import BahanBakso from './data/bahan.json'
import AppVersion from './data/appVersion.json'

class RecipeList extends React.Component {
  render() {
    return this.props.recipes.map((element) => {
      return <RecipeCard item={element} key={element.id} />
    })
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

  updatePlatform(platform) {
    let isMobile = {
      steam: false,
      ios: true,
      android: true
    }
    let helperObject = new ResepBakso(isMobile[platform])
    this.setState({
      selectedPlatform: platform,
      isMobile: isMobile[platform],
      helperObject: helperObject
    })
  }

  matchSelectedPlatform(platformToFind) {
    return platformToFind.id === this.state.selectedPlatform
  }

  renderVersionInfo(platform) {
    return (
      <VersionInfo
        platform={platform}
        key={platform.id}
        onChangePlatform={() => this.updatePlatform(platform.id)}
        selected={this.matchSelectedPlatform(platform)}
      />
    )
  }

  render() {
    let devType = AppVersion.platforms.find((e) =>
      this.matchSelectedPlatform(e)
    )
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
              {AppVersion.platforms.map((platform) => {
                return this.renderVersionInfo(platform)
              })}
            </div>
            <div>
              Using <strong>{devType.name}</strong> version of Bakso Simulator
            </div>
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
