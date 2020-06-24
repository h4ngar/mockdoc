import React, { useEffect } from 'react';
import { FormGrid, Column } from '@react-hangar/antd-components'
import { Card, Col, message, Row, Typography} from 'antd';
import { useStore } from '@scripty/react-store';
import { Search } from './Search';
import { statusOptions, charsetTypeOptions, contentTypeOptions } from './options';
import { getCategoryOptions, getMockServiceUrl } from './helper';

export const EditMock = () => {
    const { mockStore } = useStore('mockStore');
    const { categoriesStore } = useStore('categoriesStore');
    const records = mockStore.getRecords();
    const pagination = mockStore.getPagination();
    const categoriesRecords = categoriesStore.getRecords();
    const categoryOptions = getCategoryOptions(categoriesRecords[0].list);
    const { Text } = Typography;

    useEffect(() => {
        categoriesStore.getProxy().read({})
    }, []);

    useEffect(() => {
        mockStore.getProxy().read({current: 1, results: 10})
    }, [categoriesStore]);

    const onDelete = async (ids) => {
        await mockStore.getProxy().destroy(ids);
    };

    const onSave = async (record) => {
        try {
            record.headers = JSON.parse(record.headers);
            await mockStore.getProxy().update({ ...record });
            message.success('Mock saved!');
        } catch (e) {
            if (typeof record.headers === 'object') {
                await mockStore.getProxy().update({ ...record });
                message.success('Mock saved!');
            } else {
                message.error('headers must be an object');
            }
        }
    };

    const onUrlRender = (data) => {
        return (
            <Text style={{ fontSize: 18 }} copyable code>
                {getMockServiceUrl(data.value)}
            </Text>
        )
    }

    const onSearchChange = async (e) => {
        let value = e.target.value;
        if (value.indexOf('http') !== -1) {
            value = value.substring(value.indexOf('/mock/')+6, value.length);
        }
        await mockStore.getProxy().search({query: value, ...pagination});
    }

    const sizedContent = {
        xs: { span: 24, offset: 0 }, xl: { span: 18, offset: 3 }
    };

    const onChange = (pagination) => {
        mockStore.getProxy().read(pagination);
    };

    return (
        <Row>
            <Col {...sizedContent} >
                <Card title={'Edit Mocks'} extra={<Search onChange={onSearchChange} key={1}/>}>
                    <FormGrid
                        dataSource={records}
                        pagination={pagination}
                        onChange={onChange}
                        onDelete={onDelete}
                        onSave={onSave}
                        idProperty={'_id'}
                    >
                        <Column title={'Url/Id'} dataIndex={'_id'} fieldType={'string'} fieldProps={{ disabled: true }}
                                required renderer={onUrlRender}/>

                        <Column title={'Title'} dataIndex={'title'} fieldType={'string'} />

                        <Column title={'Category'} dataIndex={'category'} fieldType={'select'} fieldProps={{ options: categoryOptions }}
                                />

                        <Column title={'HTTP Status'} dataIndex={'status'} fieldType={'select'} fieldProps={{ options: statusOptions }}
                                required hideInGrid/>

                        <Column fieldType={'select'} title='ContentType' dataIndex={'contentType'}
                                fieldProps={{ options: contentTypeOptions }} required hideInGrid/>

                        <Column fieldType={'select'} title='Charset' dataIndex={'charset'} fieldProps={{ options: charsetTypeOptions }}
                                required hideInGrid/>

                        <Column title={'HTTP Headers'} dataIndex={'headers'} fieldType={'object'} />
                        <Column title={'HTTP Response'} dataIndex={'response'} fieldType={'object'} />
                    </FormGrid>
                </Card>
            </Col>
        </Row>
    );
};
