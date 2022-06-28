import React from 'react'
import './App.css'

import BigIngredientCard from './components/BigIngredientCard'
import RecipeList from './components/RecipeList'
import VersionInfo from './components/VersionInfo'

import ResepBakso from './scripts/ResepBakso'
import BahanBakso from './data/bahan.json'
import GameVersion from './data/gameVersion.json'

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

const SiteHeader = () => {
  return (
    <header className='App-header'>
      <h1>Resep Bakso Simulator</h1>
      <p>Selamat datang di Resep Bakso Simulator 👋</p>
    </header>
  )
}

const RecipesSection = (props) => {
  return (
    <section id='recipes-section'>
      <h3>Daftar Menu</h3>
      <div id='recipe'>
        <RecipeList recipes={props.recipes} />
      </div>
    </section>
  )
}

const IngredientsSection = () => {
  return (
    <section id='ingredients-section'>
      <h3>Daftar Bahan</h3>
      <div id='ingredient' className='assorted-bigcard'>
        {BahanBakso.map((element) => {
          return <BigIngredientCard item={element} key={element.id} />
        })}
      </div>
    </section>
  )
}

const SiteFooter = () => {
  return (
    <footer>
      <SiteArtwork />
      <CopyrightInfo />
    </footer>
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

  generatePlatformSection() {
    let devType = GameVersion.platforms.find((e) =>
      this.matchSelectedPlatform(e)
    )
    return (
      <section id='platforms-section'>
        <h3>Platform List</h3>
        <div id='platforms'>
          <div className='assorted-bigcard'>
            {GameVersion.platforms.map((platform) => {
              return this.renderVersionInfo(platform)
            })}
          </div>
          <div>
            Using <strong>{devType.name}</strong> version of Bakso Simulator
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <div className='App'>
        <SiteHeader />
        <main>
          {this.generatePlatformSection()}
          <IngredientsSection/>
          <RecipesSection recipes={this.state.helperObject.getAll()}/>
        </main>
        <SiteFooter />
      </div>
    )
  }
}

export default App
