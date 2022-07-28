import React from "react";

import RecipeCard from "./RecipeCard";

class RecipeList extends React.Component {
  render() {
    return this.props.recipes.map((element) => {
      return <RecipeCard item={element} key={element.id} instantBuy={this.props.instantBuy}/>
    })
  }
}

export default RecipeList