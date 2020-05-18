import React, { useState } from 'react';
import Follow from './components/follow';

function MyFllow() {
    const [follows, setFollows] = useState([1, 2, 3]);

    return (
        <div>
            {
                follows.map(follow => (<Follow follow={follow} />))
            }            
        </div>
    )
}

export default MyFllow;
