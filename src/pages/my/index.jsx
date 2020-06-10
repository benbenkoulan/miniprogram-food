import React from 'react'
import useDataApi from '~/hooks/useDataApi'
import router from '~/router'

import Menu from './components/menu'

import UserInfo from '~/components/userInfo'

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
    const [statisticsInfo] = useDataApi('getStatisticsInfo', {
        initialData: {},
        propertyName: 'data'
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
