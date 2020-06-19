import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Layout, Sider, Content, Flex } from 'micro-design';

import useFormItem from '~/hooks/form/useFormItem';

import './style.css';

function SearchForm(props) {
    const { keyword: initialKeyword, onSearch, } = props;
    const [shouldShowCancel, setShouldShowCancel] = useState(false);

    const inputRef = useRef();

    const keyword = useFormItem('keyword', {
        initialValue: initialKeyword,
    });

    const handleSearch = () => {
        onSearch(keyword.value);
    };

    useEffect(() => {
        const handleConfirm = () => {
            onSearch(keyword.value);
        };

        const inputEle = inputRef.current;
        inputEle.addEventListener('confirm', handleConfirm);

        return () => inputEle.removeEventListener('confirm', handleConfirm);
    }, [onSearch, keyword]);

    const handleFocus = () => {
        setShouldShowCancel(true);
    };

    const handleBlur = () => {
        setShouldShowCancel(false);
    };

    return (
        <Layout hasSider className="search-form--box">
            <Content>
                <Flex>
                    <wx-image mode="widthFix" src="/assets/images/search.png" className="search--icon"></wx-image>
                    <input
                        className="search-input--text"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={inputRef}
                        {...keyword}
                    />
                </Flex>
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
