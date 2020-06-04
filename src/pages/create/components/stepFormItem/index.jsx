import React, { useMemo, Fragment } from 'react';
import { Flex } from 'micro-design';

import { getImageUrl } from '~/modules/utils/image';
import { upload } from '~/modules/miniprogram/file';
import { chooseImage } from '~/modules/miniprogram/image';

import useFormItem from '~/hooks/form/useFormItem';

function StepFormItem(props) {
    const { imageId, description: initialDescriptionValue, onUpload, onChange } = props;

    const description = useFormItem('description', {
        initialValue: initialDescriptionValue,
        change: (descriptionValue) => {
            onChange({
                imageId,
                description: descriptionValue,
            });
        },
    });

    const imagePath = useMemo(() => getImageUrl(imageId), [imageId]);

    const handleClick = async () => {
        const res = await chooseImage({ sizeType: ['original', 'compressed'] });
        const { tempFilePaths } = res;
        const filePath = tempFilePaths[0];
        console.log(res);
        const { data } = await upload(filePath);
        onUpload(data);
    };

    return (
        <div>
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="main-image--box select-image--btn"
                onClick={handleClick}
            >
                    {
                        imageId ? <wx-image mode="aspectFit" src={imagePath} /> : (<Fragment>
                            <p>+步骤图</p>
                            <p>上传步骤图，会得到更多关注</p>
                        </Fragment>)
                    }
            </Flex>
            <input placeholder="添加步骤说明" style={{ padding: '10px', display: 'block', fontSize: '16px', verticalAlign: 'bottom' }} {...description} />
        </div>
    )
}

export default StepFormItem;
