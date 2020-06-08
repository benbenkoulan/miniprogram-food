import React from 'react';
import { Row, Col } from 'micro-design';

import { SORT_TYPE } from '~/modules/constant/cookBook';

import './style.css';

function OrderContainer(props) {
    const {
        currentSortKey,
        onCheck,
    } = props;

    const getCheckSortTypeHandler = (sortType) => () => onCheck(sortType);

    return (
        <Row className="sort--container" gutter={10}>
            <Col className={ currentSortKey === SORT_TYPE.DEFAULT ? 'sort--box active' : 'sort--box' } span={8} onClick={getCheckSortTypeHandler(SORT_TYPE.DEFAULT)}>
                综合
            </Col>
            <Col className={ currentSortKey === SORT_TYPE.COLLECTION ? 'sort--box active' : 'sort--box' } span={8} onClick={getCheckSortTypeHandler(SORT_TYPE.COLLECTION)}>
                收藏
            </Col>
            <Col className={ currentSortKey === SORT_TYPE.TIMELINE ? 'sort--box active' : 'sort--box' } span={8} onClick={getCheckSortTypeHandler(SORT_TYPE.TIMELINE)}>
                最新发布
            </Col>
        </Row>
    )
}

export default OrderContainer;
