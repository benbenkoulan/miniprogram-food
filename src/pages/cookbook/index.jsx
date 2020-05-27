import React, { useState, useEffect } from 'react'
import './style.css'
import { Layout } from 'micro-design'
import { send } from '~/modules/request/proxy'

import AuthorOtherCookBook from './components/authorOtherCookBook/index.jsx'
import Footer from './components/footer/index.jsx'
import AuthorInfo from './components/authorInfo/index.jsx'
import Ingredient from './components/ingredient/index.jsx'
import Step from './components/step/index.jsx'
import CollectionAndShare from './components/collectionAndShare/index.jsx'
import { getImageUrl } from '../../modules/utils/image'

function CookBook(props) {

    const {id} = props.query || {}
    const [foodMaterials, setFoodMaterials] = useState({})
    const [isAttention, setIsAttention] = useState(foodMaterials.isAttention)
    const [isCollection, setIsCollection] = useState(foodMaterials.isCollection)

    const handleClickCollection = () => {
        send('upsertCollection', { data: { productId: foodMaterials.id, isCollection: !isCollection } })
            .then(() =>{
                setIsCollection(!isCollection);
            });
    }

    const handleCliAttention = () => {
        send('upsertAttention', { data: { starUserId: foodMaterials.user.id, isAttention: !isAttention } })
            .then(() =>{
                setIsAttention(!isAttention);
            });
    }

    useEffect( () => {
        const fetchData = async() =>{
            const { data = {} } = await send('getCookbookDetail', {data:{id: id ? id : 11}})
            setFoodMaterials(data)
            setIsAttention(data.isAttention)
            setIsCollection(data.isCollection)
        }
        fetchData();
    }, [id])

    return (
        <div className="page">
            <div>
                <div className="cookbook-image--box">
                    <wx-image mode="aspectFill" className="cookbook--image"
                              src={getImageUrl(foodMaterials.mainImageId)}/>
                </div>
                <Layout className="menu--box">
                    <wx-p className="cookbook--title">{foodMaterials.title}</wx-p>
                </Layout>
            </div>
            <AuthorInfo name={foodMaterials.user && foodMaterials.user.username}
                        description={foodMaterials.description}
                        authorUrl={foodMaterials.user && foodMaterials.user.avatarUrl}
                        handleCliAttention={handleCliAttention}
                        isAttention={isAttention}/>
            <Ingredient ingredients={foodMaterials.ingredients}/>
            <Step step={foodMaterials.steps}/>
            {foodMaterials.tip && foodMaterials.tip.trim().length && (
                <div className="tip--box">
                    <wx-p className="tip--name">小贴士</wx-p>
                    <wx-p className="tip--description">{foodMaterials.tip}</wx-p>
                </div>
            )}
            <Footer
                    // pageView={3083}
                    collection={foodMaterials.collectionCount}
                    createdTime={foodMaterials.createdTime && foodMaterials.createdTime.slice(0, 10)}/>
            <AuthorOtherCookBook otherProducts={foodMaterials.otherProducts}
                                 authorUrl={foodMaterials.user && foodMaterials.user.avatarUrl}
                                 name={foodMaterials.user && foodMaterials.user.username}/>
            <CollectionAndShare handleClickCollection={handleClickCollection}
                                isCollection={isCollection}/>
        </div>
    )
}

export default CookBook
