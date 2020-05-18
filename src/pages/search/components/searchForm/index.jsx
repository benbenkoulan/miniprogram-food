import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';
import 'micro-design/dist/es/components/flex/style.css';

import useFormItem from '~/components/form/formItem';

import './style.css';

function SearchForm(props) {
    const [shouldShowCancel, setShouldShowCancel] = useState(false);

    const searchKey = useFormItem('searchKey', {
        initialValue: props.searchKey,
    });

    const handleFocus = () => {
        setShouldShowCancel(true);
    };

    const handleBlur = () => {
        setShouldShowCancel(false);
    };

    useEffect(() => {
        searchKey.setValue(props.searchKey);
    }, [props.searchKey]);

    return (
        <div className="search-form--box">
            <Layout hasSider>
                <Content>
                    <input
                        className="search-input--text"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...searchKey}
                    />
                </Content>
                <Sider width="100px">
                    <Row className="search-btn--box">
                        <Col span={12}>
                            <wx-button className="search--btn" onClick={props.onSearch}>搜索</wx-button>
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
        </div>
    )
}

SearchForm.defaultProps = {
    searchKey: '',
    onSearch: () => {},
};

export default SearchForm;
