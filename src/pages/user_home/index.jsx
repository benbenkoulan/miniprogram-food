import React from 'react'
import UserInfo from '~/components/userInfo'
import useDataApi from '~/hooks/useDataApi'

function UserHome(props) {
    console.log('props', props)
    const { userId } = props.query || {}
    const [statisticsInfo] = useDataApi('getOtherUserInfo', {
        initialData: {},
        initialQuery: { userId },
        propertyName: 'data'
    })
    return <div className="page">
        <UserInfo {...statisticsInfo} isUserInfoDisplay/>
    </div>
}

export default UserHome
