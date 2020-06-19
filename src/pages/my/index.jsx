import React, { useState, useEffect, useCallback } from 'react'
import router from '~/router'
import { send } from '~/modules/request/proxy';
import UserInfo from '~/components/userInfo'
import useMount from '~/hooks/useMount';

import Menu from './components/menu'
import './style.css';

const menus = [{
    key: 'COLLECTION',
    text: '我的收藏',
    onClick: () => router.push('collection')
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

    const fetchData = useCallback(async () => {
        const { data } = await send('getStatisticsInfo');
        setStatisticsInfo(data);
    }, [setStatisticsInfo]);

    useMount(fetchData);
    
    useMount(() => {
        const handlePullDownRefresh = async () => {
            try {
                await fetchData();
            } finally {
                wx.stopPullDownRefresh();
            }
        };

        window.addEventListener('pulldownrefresh', handlePullDownRefresh);

        return () => window.removeEventListener('pulldownrefresh', handlePullDownRefresh);
    });

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
