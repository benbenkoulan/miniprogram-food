import React from 'react'

function HomeHeader(props) {

    const handleClickSearch = () => {
        props.onClickSearch();
    }

    return (
        <div className="home--page">
            <div className="logo-box--wrap">
                <div className="logo--box">
                    <wx-image src="/assets/images/logo_text.jpg" className="logo--text"/>
                    <wx-image src="/assets/images/logo.jpg" className="logo"/>
                </div>
            </div>
            <div className="search--link" onClick={handleClickSearch}>今天想吃点什么?</div>
            <p className="description">不一样的美食秘籍</p>
        </div>
    )
}

export default HomeHeader
