import React from 'react';
import nullSafeGet from 'lodash/get';

import CookBook from '~/components/cookBook'
import OperationMenu from '~/components/operationMenu';
import useDataApi from '~/hooks/useDataApi'
import { getImageUrl } from '~/modules/utils/image'
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
            {drafts.map((draft) => (
                <OperationMenu 
                    key={draft.id}
                    onMainMenuClick={() => console.log('------test---')}
                    mainMenuText="从草稿箱中删除"
                    render={() => (
                        <CookBook {...draft} handleClickEvent={() => handleCreateCookBook(draft.id)} />
                    )}
                />
            ))}
        </div>
    )
}

export default MyDraft;
