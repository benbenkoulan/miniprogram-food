import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CookBook from '~/components/cookBook'
import OperationMenu from '~/components/operationMenu';
import router from '~/router';
import { getDrafts, deleteDrafts } from '~/store/action/user';
import { draftsSelector } from '~/store/selector'; 

const handleClickDraft = (id) => {
    router.push('create', { id });
};

function MyDraft() {
    const drafts = useSelector(draftsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDrafts({ pageNumber: 0, pageSize: 20 }));
    }, []);

    const handleDeleteDraft = (id) => dispatch(deleteDrafts([id]));

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
