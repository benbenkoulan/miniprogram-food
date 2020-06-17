import React from 'react'
import nullSafeGet from 'lodash/get'

import { getImageUrl } from '~/modules/utils/image'
import router from '~/router'

import CookBook from './components/cookBook'

export const convertCookbooks = (cookbooks = []) => cookbooks.map(cookbook => ({
    id: cookbook.id,
    title: cookbook.title,
    collectionCount: cookbook.collectionCount,
    username: nullSafeGet(cookbook, 'userDto.username', ''),
    ingredients: cookbook.ingredients.map(ingredient => ingredient.name).join(),
    avatarUrl: nullSafeGet(cookbook, 'userDto.avatarUrl', ''),
    imagePath: getImageUrl(cookbook.mainImageId)
}))

export const renderLoading = () => (<div style={{ textAlign: 'center' }}>loading...</div>)

export const renderDataList = (dataList) => dataList.map(item => (<CookBook
    key={item.id}
    {...item}
    onClickCookBook={() => router.push('cookbook', { id: item.id })}
/>))
