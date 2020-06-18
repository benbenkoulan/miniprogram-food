import { STATIC_REQUEST_URL } from '~/modules/constant/network';

export const getImageUrl = imageId => imageId ? `${STATIC_REQUEST_URL}/services/file/images/${imageId}` : '';
