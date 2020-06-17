import React, { useState, useEffect } from 'react';
import memoize from 'lodash/memoize';

import { send } from '~/modules/request/proxy';
import useDataApi from '~/hooks/useDataApi';

import Follow from './components/follow';

const convertFollows = (follows) => follows.map((follow) => ({
    id: follow.id,
    userName: follow.username || '微信用户',
    avatarUrl: follow.avatarUrl,
    isFollowed: follow.isAttention,
}));

function MyFollow(props) {

    const { userId } = props.query;

    const [follows, setFollows] = useDataApi(userId? 'getUserFollows' : 'getMyFollows', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 50, userId},
        convertData: convertFollows,
    });

    const getFollowHandler = memoize((id, isAttention) => async () => {
        await send('upsertAttention', { data: { starUserId: id, isAttention } });
        const newFollows = follows.map(follow => follow.id === id ? ({
            ...follow,
            isFollowed: isAttention,
        }) : follow);
        setFollows(newFollows);
    });

    return (
        <div className="page">
            {
                follows.map(follow => (<Follow onFollow={getFollowHandler(follow.id, !follow.isFollowed)} key={follow.id} {...follow} />))
            }
        </div>
    )
}

export default MyFollow;
