import React from 'react'
import './style.css'
import { BASE_REQUEST_URL } from '../../../../modules/constant/network'

function AuthorOtherCookBook(props) {
    return (
        <div className="authorOtherCookBook--box">
            <wx-p className="authorOtherCookBook--title">{props && props.otherProducts ? '作者其他菜谱' : null}</wx-p>
            <wx-scroll-view scroll-x="true" className="scroll--wrap">
                {props && props.otherProducts && props.otherProducts.map(detail => (
                    <wx-view className="cookbook--detail">
                        <div className="authorOtherCookBook--image-box">
                            <wx-image src={`${BASE_REQUEST_URL}/services/file/images/${detail.imageId}`} className="authorOtherCookBook--image"/>
                        </div>
                        <div className="authorOther--wrap">
                            <wx-text className="authorOther--name">
                                {detail.title}
                            </wx-text>
                            <wx-image src={props.authorUrl} className="authorOther--image"/>
                        </div>
                        <div className="authorOther-description--box">
                            <wx-p className="authorOther--description">{props.name}</wx-p>
                        </div>
                    </wx-view>
                ))}
            </wx-scroll-view>
        </div>
    )
}

export default AuthorOtherCookBook;