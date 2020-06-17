import React from 'react'
import './style.css'

function Empty() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flex: 'auto',
            height: '70%',
            margin: '20px 0'
        }}>
            <wx-image style={{ width: '160px' }} mode="widthFix" src="/assets/images/search/empty.svg"/>
            <p className="empty-tip--text">抱歉～这里什么都没有哦</p>
        </div>
    )
}

export default Empty;
