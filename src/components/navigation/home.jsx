import React from 'react';

function Home(props) {
    const { onClick } = props;

    return (<div className="home--btn" onClick={onClick}>
        <wx-image mode="widthFix" className="home--icon" src="/assets/images/navigation/home.svg"></wx-image>
    </div>)
}

export default Home;
