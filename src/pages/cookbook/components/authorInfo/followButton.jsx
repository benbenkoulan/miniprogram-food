import React, { Fragment } from 'react';

import withUserInfoScope from '~/hoc/withUserInfoScope';

function FollowButton(props) {
    const { onClick, isAttention } = props;

    return (
        <Fragment>
            {isAttention ? <div className="attention--btn grey" onClick={onClick}>已关注</div>
                            : <div className="attention--btn" onClick={onClick}>关注</div>}
        </Fragment>
    );
}

export default withUserInfoScope(FollowButton);
