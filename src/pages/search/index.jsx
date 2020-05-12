import React from 'react';
import { Form, Input } from 'antd';

import Food from './components/food';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function Search () {
    const [form] = Form.useForm();

    return (
        <div style={{ margin: '20px' }}>
            <div></div>
            {/* <Form {...layout} form={form}>
                <Form.Item name="usename">
                    <Input />
                </Form.Item>
            </Form>  */}
            <Food />
        </div>
    )
}

export default Search;
