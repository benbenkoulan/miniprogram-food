import React from 'react'
import './style.css'

function AuthorOtherCookBook(props) {
    return (
        <div className="authorOtherCookBook--box">
            <wx-p className="authorOtherCookBook--title">作者其他菜谱</wx-p>
            <wx-scroll-view scroll-x="true" className="scroll--wrap">
                {props.authorOtherCookBookDetail.map(detail => (
                    <wx-view className="cookbook--detail">
                        <div className="authorOtherCookBook--image-box">
                            <wx-image src={detail.imageUrl} className="authorOtherCookBook--image"/>
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
