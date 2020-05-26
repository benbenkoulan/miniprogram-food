import React from 'react'
import nullSafeGet from 'lodash/get'

import { getImageUrl } from '~/modules/utils/image'
import router from '~/router'

import CookBook from './components/cookBook'

export const convertCookbooks = (cookbooks = []) => cookbooks.map(cookbook => ({
    id: cookbook.id,
    title: cookbook.title,
    username: nullSafeGet(cookbook, 'user.username', ''),
    ingredients: cookbook.ingredients.map(ingredient => ingredient.name).join(),
    imagePath: getImageUrl(cookbook.mainImageId)
}))

export const renderEmpty = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }}>
        <wx-image style={{ width: '160px' }} mode="widthFix" src="/assets/images/search/empty.svg"/>
        <p className="empty-tip--text">抱歉～当前没有相关菜谱哦</p>
    </div>
)

export const renderLoading = () => (<div style={{ textAlign: 'center' }}>loading...</div>)

// export const renderItem = (item) => (<CookBook
//     key={item.id}
//     {...item}
//     onClickCookBook={() => router.push('cookbook', { id: item.id })}
// />);

export const renderDataList = (dataList) => dataList.map(item => (<CookBook
    key={item.id}
    {...item}
    onClickCookBook={() => router.push('cookbook', { id: item.id })}
/>))
