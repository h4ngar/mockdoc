import React, { useEffect, useState } from 'react';
import { Card, Col, message, Modal, Row, Typography } from 'antd';
import { Form, FormItem, Button } from '@react-hangar/antd-components';
import { useStore } from '@scripty/react-store';
import { charsetTypeOptions, contentTypeOptions, statusOptions } from './options';
import { getCategoryOptions, getMockServiceUrl } from './helper'
import { useParams } from 'react-router';

export const NewMock = (props) => {
    const { mockStore } = useStore('mockStore');
    const { categoriesStore } = useStore('categoriesStore');
    const [visible, setVisible] = useState(false);
    const updated = mockStore.getUpdatedRecords();
    const categoriesRecords = categoriesStore.getRecords();
    const categoryOptions = getCategoryOptions(categoriesRecords[0].list);
    const { Text } = Typography;
    const records = mockStore.getRecords();
    const params = useParams();

    useEffect(() => {
        if (params._id) {
            mockStore.getProxy().search({ query: params._id })
        }
    }, []);

    useEffect(() => {
        categoriesStore.getProxy().read({})
    }, []);

    const initialRecord = {
        title: '',
        category: '',
        status: 200,
        contentType: 'application/json',
        charset: 'UTF-8'
    }

    const handleSubmit = async (data, form) => {
        try {
            if (form.headers) {
                form.headers = JSON.parse(form.headers);
            }
            await mockStore.getProxy().update({ ...form });
            setVisible(true);
        } catch (e) {
            message.error('headers must be an object');
        }
    };

    const onModalOkBtnClick = () => {
        setVisible(false);
    }

    const onModalCancelBtnClick = () => {
        setVisible(false);
    }
    const sizedContent = {
        xs: { span: 24, offset: 0 }, xl: { span: 18, offset: 3 }
    };

    return (
        <Row>
            <Col {...sizedContent} >
                <Card title={'Design Mock'}>
                    <Form onSubmit={handleSubmit} record={(params._id && records < 1) ? records[0] : initialRecord}>
                        <FormItem fieldType={'string'} label='Title' dataIndex={'title'}/>

                        <FormItem fieldType={'select'} label='Categories' dataIndex={'category'}
                                  fieldProps={{ options: categoryOptions }}/>

                        <FormItem fieldType={'select'} label='HTTP Status' dataIndex={'status'}
                                  fieldProps={{ options: statusOptions }} required/>

                        <FormItem fieldType={'select'} label='ContentType' dataIndex={'contentType'}
                                  fieldProps={{ options: contentTypeOptions }} required/>

                        <FormItem fieldType={'select'} label='Charset' dataIndex={'charset'}
                                  fieldProps={{ options: charsetTypeOptions }} required/>

                        <FormItem fieldType={'object'} label='Header' dataIndex={'headers'}/>

                        <FormItem fieldType={'object'} label='Response' dataIndex={'response'}/>

                        <Button htmlType="submit"> Generate my HTTP Response </Button>

                        <Modal
                            title={'Mock is ready:'}
                            visible={visible}
                            width={600}
                            onOk={onModalOkBtnClick}
                            onCancel={onModalCancelBtnClick}
                            onClose={onModalCancelBtnClick}
                        >
                            <Text style={{ fontSize: 18 }} copyable code>
                                {getMockServiceUrl(updated._id)}
                            </Text>
                        </Modal>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};
