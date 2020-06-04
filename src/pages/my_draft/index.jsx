import React from 'react';
import CookBook from '../../components/cookBook'
import useDataApi from '../../hooks/useDataApi'
import nullSafeGet from 'lodash/get';
import { getImageUrl } from '../../modules/utils/image'


const convertDraft = drafts => drafts.map((draft) => ({
    id: draft.id,
    title: draft.title,
    imagePath: getImageUrl(draft.mainImageId),
    userName: nullSafeGet(draft, 'userDto.username'),
    avatarUrl: nullSafeGet(draft, 'userDto.avatarUrl'),
    isDraft: true
}));

function MyDraft(props) {
    const [drafts, setDrafts] = useDataApi('getDrafts', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 10 },
        convertData: convertDraft,
    });

    return (
        <div className="page">
            {drafts.map((draft) => (<CookBook key={draft.id} {...draft} />))}
        </div>
    )
}

export default MyDraft;
