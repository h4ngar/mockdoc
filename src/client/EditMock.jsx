import React, { useEffect } from 'react';
import { FormGrid, Column } from '@react-hangar/antd-components'
import { Badge, Card, Col, Divider, message, Row, Typography } from 'antd';
import { useStore } from '@scripty/react-store';
import { Search } from './Search';
import { statusOptions, charsetTypeOptions, contentTypeOptions } from './options';
import { getCategoryOptions, getMockServiceUrl } from '../helper';
import { EditPath, Path } from './Path';

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
            if (record.headers) {
                record.headers = JSON.parse(record.headers);
            }
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
        if (data.value) {
            return (
                <div style={{padding: '0 5px' }}>
                    <Text style={{ fontSize: 13}} copyable code>
                        {getMockServiceUrl(data.value.path)}
                    </Text>
                </div>
            )
        }
    }

    const onRequestBodyRender = (data) => {
        if (data.value !== '') {
            return <Badge
                count={'POST'}
                style={{ backgroundColor: '#2f7438', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
            />
        }
        return <Badge
            count={'GET'}
            style={{ backgroundColor: '#0e69b4', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
        />
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
                        scroll={{ x: 'calc(700px + 50%)'}}
                        dataSource={records}
                        pagination={pagination}
                        onChange={onChange}
                        onDelete={onDelete}
                        onSave={onSave}
                        idProperty={'_id'}
                    >

                        <Column title={'Title'} dataIndex={'title'} fieldType={'string'}/>

                        <Column title={'Category'} dataIndex={'category'} fieldType={'select'} fieldProps={{ options: categoryOptions }}/>

                        <Column title={'Mock Url'} dataIndex={'requestPath'} fieldProps={{fixed: 'right'}}
                                required renderer={onUrlRender}>
                            <EditPath />
                        </Column>

                        <Column title={'Request Headers'} dataIndex={'requestHeaders'} fieldType={'object'} hideInGrid/>


                        <Column title={'Request Body'} dataIndex={'requestBody'} fieldType={'object'} renderer={onRequestBodyRender}
                            fieldProps={{ title: ''}}
                        />

                        <Column title={'HTTP Status'} dataIndex={'responseStatus'} fieldType={'select'} fieldProps={{ options: statusOptions }}
                                required hideInGrid/>

                        <Column fieldType={'select'} title='ContentType' dataIndex={'responseContentType'}
                                fieldProps={{ options: contentTypeOptions }} required hideInGrid/>

                        <Column fieldType={'select'} title='Charset' dataIndex={'responseCharset'} fieldProps={{ options: charsetTypeOptions }}
                                required hideInGrid/>

                        <Column title={'Response Headers'} dataIndex={'responseHeaders'} fieldType={'object'} />
                        <Column title={'Response Body'} dataIndex={'responseBody'} fieldType={'object'} />
                    </FormGrid>
                </Card>
            </Col>
        </Row>
    );
};
