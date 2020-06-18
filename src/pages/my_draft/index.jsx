import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CookBook from '~/components/cookBook'
import OperationMenu from '~/components/operationMenu';
import router from '~/router';
import { getDrafts, deleteDrafts } from '~/store/action/user';
import { draftsSelector } from '~/store/selector';
import Empty from '~/components/empty'

const handleClickDraft = (id) => {
    router.push('create', { id });
};

function MyDraft() {
    const [isInited, setIsInited] = useState(false);
    const drafts = useSelector(draftsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getDrafts({ pageNumber: 0, pageSize: 20 }));
            } finally {
                setIsInited(true);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleDeleteDraft = (id) => dispatch(deleteDrafts([id]));

    return (
        <div className="page">
            {drafts.length
                ? drafts.map((draft) => (
                    <OperationMenu
                        key={draft.id}
                        onMainMenuClick={() => handleDeleteDraft(draft.id)}
                        mainMenuText="从草稿箱中删除"
                        render={() => (
                            <CookBook {...draft} onClick={() => handleClickDraft(draft.id)} />
                        )}
                    />
                ))
                : isInited && <Empty/>}
        </div>
    )
}

export default MyDraft;
