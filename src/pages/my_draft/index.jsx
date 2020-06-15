import React from 'react';
import nullSafeGet from 'lodash/get';

import CookBook from '~/components/cookBook'
import OperationMenu from '~/components/operationMenu';
import useDataApi from '~/hooks/useDataApi'
import { getImageUrl } from '~/modules/utils/image'
import router from '~/router';
import { deleteDrafts } from '~/api';


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
    const [drafts, setDrafts] = useDataApi('getDrafts', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 10 },
        convertData: convertDraft,
    });

    const handleClickDraft = (id) => {
        router.push('create', { id })
    };

    const handleDeleteDraft = async (id) => {
        await deleteDrafts([id]);
        setDrafts(drafts.filter(draft => draft.id !== id));
    };

    return (
        <div className="page">
            {drafts.map((draft) => (
                <OperationMenu 
                    key={draft.id}
                    onMainMenuClick={() => handleDeleteDraft(draft.id)}
                    mainMenuText="从草稿箱中删除"
                    render={() => (
                        <CookBook {...draft} onClick={() => handleClickDraft(draft.id)} />
                    )}
                />
            ))}
        </div>
    )
}

export default MyDraft;
