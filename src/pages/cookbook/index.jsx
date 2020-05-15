import React, { useState } from 'react'
import './style.css'
import { Layout, Sider, Content } from 'micro-design'
import { VariableSizeList as List } from 'react-window'

function CookBook() {


    const mockData = {
        title: '小朋友可以一口吃掉4个的杯子蛋糕',
        name: '爱做饭爱洗碗的瘦子',
        description: '零难度的小点心，没事就想折腾起来！关键是小朋友爱吃(^.^)',
        mainImageUrl:'http://m.qpic.cn/psc?/V11rIwqj3eAlyi/U.M5PgtxS1PFgLr9JTiFCzTX36Cvg2DbyvYlj679c9GeMygzpnyI1DqDVmgmt74e99Br.hxBPXKzyrr5dA.KZg!!/b&bo=ZQR9AwAAAAARBy8!&rf=viewer_4',
        authorUrl:'http://b93.photo.store.qq.com/psb?/V11rIwqj3eAlyi/XU8KGhBuVSzzV9.QhmljsHwa5ODdix557G.XATvDMUE!/b/YXoFgTcIYwAAYmr*gDfuYgAA&bo=*wFWAQAAAAABBIo!&rf=viewer_4',
        ingredients: [
            {food: '鸡蛋', quantity: '6个'},
            {food: '糖', quantity: '90克'},
            {food: '牛奶', quantity: '75克'},
            {food: '玉米油', quantity: '60克'},
            {food: '玉米淀粉', quantity: '10克'},
            {food: '低粉', quantity: '100克'},
            {food: '柠檬汁', quantity: '3滴'},
        ]
    }

    const [foodMaterials] = useState(mockData)

    const renderFoodMaterialHeader = (foodMaterialsData) => (
        <div>
            <div className="cookbook-image--box">
                <wx-image mode="aspectFill" className="cookbook--image" src={foodMaterialsData.mainImageUrl}/>
            </div>
            <Layout className="menu--box">
                <wx-p className="cookbook--title">{foodMaterialsData.title}</wx-p>
            </Layout>
        </div>)

    const renderFoodMaterialAuthor = (foodMaterialsData) => (
        <div>
            <Layout hasSider className="author-info--box">
                <Sider width="60px">
                    <wx-image className="author--icon" src={foodMaterialsData.authorUrl}/>
                </Sider>
                <Content className="author--name">
                    {foodMaterialsData.name}
                </Content>
                <Sider width="80px" className="attention-btn--box">
                    <wx-button className="attention--btn" open-type="share">关注</wx-button>
                </Sider>
            </Layout>
            <wx-p className="cookbook--description">{foodMaterialsData.description}</wx-p>
        </div>
    )

    const renderIngredient = (foodMaterialsData) => (
        <Layout className="author-info--box">
            <Layout className="ingredient--title">用料</Layout>
            {renderIngredientDetail(foodMaterialsData.ingredients)}
        </Layout>
    )

    const renderIngredientDetail = (ingredients) => (
        ingredients.map(ingredient => (
            <Layout hasSider className="ingredient--content">
                <wx-text>{ingredient.food}</wx-text>
                <wx-text className="ingredient--quantity">{ingredient.quantity}</wx-text>
            </Layout>
        ))
    )

    return (
        <div>
            {
                renderFoodMaterialHeader(foodMaterials)
            }
            {
                renderFoodMaterialAuthor(foodMaterials)
            }
            {
                renderIngredient(foodMaterials)
            }
        </div>
    )
}

export default CookBook
