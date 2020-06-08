import React, { useState } from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';

import useFormItem from '~/hooks/form/useFormItem';

import './style.css';

function SearchForm(props) {
    const { keyword: initialKeyword, onSearch, } = props;
    const [shouldShowCancel, setShouldShowCancel] = useState(false);

    const keyword = useFormItem('keyword', {
        initialValue: initialKeyword,
    });

    const handleFocus = () => {
        setShouldShowCancel(true);
    };

    const handleBlur = () => {
        setShouldShowCancel(false);
    };

    const handleSearch = () => onSearch(keyword.value);

    return (
        <Layout hasSider className="search-form--box">
            <Content>
                <input
                    className="search-input--text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...keyword}
                />
            </Content>
            <Sider width="100px">
                <Row className="search-btn--box">
                    <Col span={12}>
                        <wx-button className="search--btn" onClick={handleSearch}>搜索</wx-button>
                    </Col>
                    {
                        shouldShowCancel && (
                            <Col span={12}>
                                <wx-button className="cancel--btn">取消</wx-button>
                            </Col>
                        )
                    }
                </Row>
            </Sider>
        </Layout>
    );
}

SearchForm.defaultProps = {
    keyword: '',
    onSearch: () => {},
};

export default SearchForm;
