import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style';
import 'micro-design/dist/es/components/grid/style';

import useFormItem from '~/components/form/formItem';

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

    // useEffect(() => {
    //     keyword.setValue(initialKeyword);
    // }, [keyword, initialKeyword]);

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
