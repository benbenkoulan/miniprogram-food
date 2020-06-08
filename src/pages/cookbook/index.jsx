import React, { useState, useEffect, } from 'react'
import './style.css'
import { Layout } from 'micro-design'

import useToggle from '~/hooks/useToggle';
import useShareAppMessage from '~/hooks/useShareAppMessage';
import { send } from '~/modules/request/proxy'

import AuthorOtherCookBook from './components/authorOtherCookBook/index.jsx'
import Footer from './components/footer/index.jsx'
import AuthorInfo from './components/authorInfo/index.jsx'
import Ingredient from './components/ingredient/index.jsx'
import Step from './components/step/index.jsx'
import CollectionAndShare from './components/collectionAndShare/index.jsx'
import { getImageUrl } from '../../modules/utils/image'
import router from '~/router'

function CookBook(props) {
    const { id } = props.query || {};

    const [isAttention, { toggle: toggleIsAttention }] = useToggle(false);
    const [isCollection, { toggle: toggleIsCollection }] = useToggle(false);
    const [foodMaterials, setFoodMaterials] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await send('getCookbookDetail', { data: { id } });
            toggleIsAttention(data.isAttention);
            toggleIsCollection(data.isCollection);
            setFoodMaterials(data);
        };
        fetchData();
    }, [id]);

    useShareAppMessage({
        title: foodMaterials.title || '这个美食很不错',
        path: `/pages/search/index?id=${foodMaterials.id}`,
    });

    const handleClickCollection = async () => {
        await send('upsertCollection', { data: { productId: foodMaterials.id, isCollection: !isCollection } });
        toggleIsCollection();
    };

    const handleClickAttention = async () => {
        await send('upsertAttention', { data: { starUserId: foodMaterials.userDto.id, isAttention: !isAttention } })
        toggleIsAttention();
    };

    const handleClickUserHome = () => {
        router.push('user_home', {userId: foodMaterials.userId})
    };

    return (
        <div className="page">
            <div className="section">
                <div className="cookbook-image--box">
                    <wx-image mode="aspectFill" className="cookbook--image"
                              src={getImageUrl(foodMaterials.mainImageId)}/>
                </div>
                <Layout className="menu--box">
                    <wx-p className="cookbook--title">{foodMaterials.title}</wx-p>
                </Layout>
            </div>
            <AuthorInfo name={foodMaterials.userDto && foodMaterials.userDto.username}
                        description={foodMaterials.description}
                        authorUrl={foodMaterials.userDto && foodMaterials.userDto.avatarUrl}
                        handleClickAttention={handleClickAttention}
                        handleClickUserHome={handleClickUserHome}
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
                browseCount={foodMaterials.browseCount}
                collection={foodMaterials.collectionCount}
                createdTime={foodMaterials.createdTime && foodMaterials.createdTime.slice(0, 10)}/>
            <AuthorOtherCookBook otherProducts={foodMaterials.otherProducts}
                                 authorUrl={foodMaterials.userDto && foodMaterials.userDto.avatarUrl}
                                 name={foodMaterials.userDto && foodMaterials.userDto.username}/>
            <CollectionAndShare handleClickCollection={handleClickCollection}
                                isCollection={isCollection}
                                cookBookId={id}
                                />
        </div>
    )
}

export default CookBook
