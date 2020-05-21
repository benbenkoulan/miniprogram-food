import React from 'react'
import { Layout } from 'micro-design'
import './style.css'

function Ingredient(props) {
    const renderIngredientDetail = (ingredients) => (
        ingredients.map(ingredient => (
            <Layout hasSider className="menu--box ingredient--content">
                <wx-text>{ingredient.name}</wx-text>
                <wx-text>{ingredient.weight}</wx-text>
            </Layout>
        ))
    )

    return (
        <Layout className="menu--box author-info--box">
            <Layout className="menu--box ingredient--title">用料</Layout>
            {props && props.ingredients && renderIngredientDetail(props.ingredients)}
        </Layout>
    )
}

export default Ingredient
