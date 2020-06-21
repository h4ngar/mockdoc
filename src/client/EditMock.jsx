import React, { useEffect } from 'react';
import { FormGrid, Column } from '@react-hangar/antd-components'
import { Card, Col, Row } from 'antd';
import { useStore } from '@scripty/react-store';
import { Search } from './Search';
import { statusOptions, charsetTypeOptions, contentTypeOptions } from './options';
import { getCategoryOptions } from './helper';

export const EditMock = () => {
    const { mockStore } = useStore('mockStore');
    const { categoriesStore } = useStore('categoriesStore');

    useEffect(() => {
        categoriesStore.getProxy().read({})
    }, []);

    useEffect(() => {
        mockStore.getProxy().read({current: 1, results: 10})
    }, [categoriesStore]);

    const records = mockStore.getRecords();
    const pagination = mockStore.getPagination();
    const categoriesRecords = categoriesStore.getRecords();
    const categoryOptions = getCategoryOptions(categoriesRecords[0].list);

    const onDelete = async (ids) => {
        await mockStore.getProxy().destroy(ids);
    };

    const onSave = async (record) => {
        await mockStore.getProxy().update({ ...record });
    };

    const onUrlRender = (data) => {
        return `https://mockdoc.garic.biz/mock/${data.value}`;
    }

    const onSearchChange = async (e) => {
        await mockStore.getProxy().search({query: e.target.value, ...pagination});
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
                        <Column title={'Title'} dataIndex={'title'} fieldType={'string'} required/>
                        <Column title={'Category'} dataIndex={'category'} fieldType={'select'} fieldProps={{ options: categoryOptions }}
                                required hideInGrid/>

                        <Column title={'HTTP Status'} dataIndex={'status'} fieldType={'select'} fieldProps={{ options: statusOptions }}
                                required hideInGrid/>

                        <Column fieldType={'select'} title='Response ContentType' dataIndex={'contentType'}
                                fieldProps={{ options: contentTypeOptions }} required hideInGrid/>

                        <Column fieldType={'select'} title='Charset' dataIndex={'charset'} fieldProps={{ options: charsetTypeOptions }}
                                required hideInGrid/>

                        <Column title={'HTTP Headers'} dataIndex={'response'} fieldType={'object'} required/>
                        <Column title={'HTTP Response'} dataIndex={'headers'} fieldType={'object'} required/>
                    </FormGrid>
                </Card>
            </Col>
        </Row>
    );
};
