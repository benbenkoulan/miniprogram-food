import React from 'react'
import { Layout } from 'micro-design'
import './style.css'

function Ingredient(props) {

    const renderIngredientDetail = (ingredients) => (
        ingredients.map(ingredient => (
            <Layout hasSider className="menu--box ingredient--content">
                <wx-text>{ingredient.food}</wx-text>
                <wx-text>{ingredient.quantity}</wx-text>
            </Layout>
        ))
    )

    return (
        <Layout className="menu--box author-info--box">
            <Layout className="menu--box ingredient--title">用料</Layout>
            {renderIngredientDetail(props.ingredients)}
        </Layout>
    )
}

export default Ingredient
