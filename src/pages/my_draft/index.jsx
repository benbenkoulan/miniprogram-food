import React from 'react';
import CookBook from '../../components/cookBook'
import useDataApi from '../../hooks/useDataApi'
import nullSafeGet from 'lodash/get';
import { getImageUrl } from '../../modules/utils/image'
import router from '~/router'

const convertDraft = drafts => drafts.map((draft) => ({
    id: draft.id,
    title: draft.title,
    imagePath: getImageUrl(draft.mainImageId),
    userName: nullSafeGet(draft, 'userDto.username'),
    avatarUrl: nullSafeGet(draft, 'userDto.avatarUrl'),
    collectionCount: draft.collectionCount,
    isDraft: true
}));

function MyDraft() {
    const [drafts] = useDataApi('getDrafts', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 10 },
        convertData: convertDraft,
    });

    const handleCreateCookBook = (id) => {
        router.push('create', { id })
    }

    return (
        <div className="page">
            {drafts.map((draft) => (<CookBook key={draft.id} {...draft} handleClickEvent={() => handleCreateCookBook(draft.id)} />))}
        </div>
    )
}

export default MyDraft;
