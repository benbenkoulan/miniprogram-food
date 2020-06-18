import React, { useState, useEffect } from 'react'
import router from '~/router'
import { send } from '~/modules/request/proxy';
import UserInfo from '~/components/userInfo'

import Menu from './components/menu'
import './style.css';

const menus = [{
    key: 'COLLECTION',
    text: '我的收藏',
    onClick: () => router.push('collection')
}, {
    key: 'FOLLOW',
    text: '我的关注',
    onClick: () => router.push('my_follow')
}, {
    key: 'MYCOOKBOOK',
    text: '我的菜谱',
    onClick: () => router.push('my_cookbook')
}, {
    key: 'DRAFT',
    text: '草稿箱',
    onClick: () => router.push('my_draft')
}]


function My() {
    const [statisticsInfo, setStatisticsInfo] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await send('getStatisticsInfo');
            setStatisticsInfo(data);
        };

        const handlePullDownRefresh = async () => {
            // wx.startPullDownRefresh();
            try {
                await fetchData();
            } finally {
                wx.stopPullDownRefresh();
            }
        };

        window.addEventListener('pulldownrefresh', handlePullDownRefresh);

        fetchData();

        return () => window.removeEventListener('pulldownrefresh', handlePullDownRefresh);
    }, []);

    return (
        <div className="page">
            <UserInfo {...statisticsInfo} isSection/>
            {
                menus.map(menu => <Menu {...menu} />)
            }
        </div>
    )
}

export default My
