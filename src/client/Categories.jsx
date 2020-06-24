import React, { useEffect } from 'react';
import { Card, message } from 'antd';
import { Button, Form, FormItem } from '@react-hangar/antd-components';
import { useStore } from '@scripty/react-store';

export const Categories = () => {

    const { categoriesStore } = useStore('categoriesStore');
    const records = categoriesStore.getRecords();

    useEffect(() => {
        categoriesStore.getProxy().read()
    }, []);

    const handleSubmit = (form, data) => {
        categoriesStore.getProxy().update({...data});
        message.success('Categories saved!');
    }
    return (
        <Card title={'Manage Categories'} style={{ width: 500, margin: '0 auto' }}>
            <Form onSubmit={handleSubmit} record={records[0]}>
                <FormItem fieldType={'list'} label='Categories' dataIndex={'list'} />
                <FormItem fieldType={'string'} label='_id' dataIndex={'_id'} style={{display: 'none'}} />
                <Button htmlType="submit"> Save </Button>
            </Form>
        </Card>
    );
};
