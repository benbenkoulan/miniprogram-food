import { BASE_REQUEST_URL } from '~/modules/constant/network';

export const getImageUrl = imageId => `${BASE_REQUEST_URL}/services/file/images/${imageId}`;
