import nullSafeGet from 'lodash/get';

import { getImageUrl } from '~/modules/utils/image';

export const settingSelector = state => state.user.setting;

const convertDraft = drafts => drafts.map((draft) => ({
    id: draft.id,
    title: draft.title,
    imagePath: getImageUrl(draft.mainImageId),
    userName: nullSafeGet(draft, 'userDto.username'),
    avatarUrl: nullSafeGet(draft, 'userDto.avatarUrl'),
    collectionCount: draft.collectionCount,
    isDraft: true
}));

export const draftsSelector = state => convertDraft(state.user.drafts);
