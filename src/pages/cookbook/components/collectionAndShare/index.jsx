import React from 'react'
import { Layout, Content } from 'micro-design'
import './style.css'

function CollectionAndShare(props) {

    const unCollection = '/assets/images/uncollection.png'
    const collection = '/assets/images/collection.png'
    const handleClickCollection = () => {
        props.handleClickCollection()
    }

    return (
        <Layout className="menu--box collection-and-share--box">
            <div className="collection--box" onClick={handleClickCollection}>
                <wx-image className="collection--image" src={props.isCollection ? collection : unCollection}/>
                <Content className="collection-text">{props.isCollection ? '已收藏' : '收藏'}</Content>
            </div>
            <div className="share--box">
                <wx-image className="share--image" src="/assets/images/share.png"/>
                <wx-span className="share-text">分享</wx-span>
            </div>
        </Layout>
    )
}

export default CollectionAndShare
