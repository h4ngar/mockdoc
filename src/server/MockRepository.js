import mongoose from 'mongoose';
import { MOCK_FIND, MOCK_READ, MOCK_SEARCH } from './Constants';
import { Logger } from '@scripty/logger';
import { objectToUrlParams, encodeResponseByContentType, hasQueryParams, hasBodyParams } from '../helper';

export class MockRepository {

    constructor(requestSchema) {
        delete mongoose.connection.models['mocks'];
        let Schema = new mongoose.Schema(requestSchema, { timestamps: true });
        this.model = mongoose.model('mocks', Schema);
    }

    async findMock(req, presenter) {
        let path = req.params[0];
        let bodyParams = '';

        if (hasBodyParams(req)) {
            bodyParams = req.body;
        }

        if (hasQueryParams(req)) {
            path = path + '?' + objectToUrlParams(req.query);
        }

        let result = await this.model.findOne({ 'path.path': `/${path}`, requestBody: objectToUrlParams(bodyParams) });

        console.log(result, ' result ---------------------- ');

        try {
            result.response = encodeResponseByContentType(result.contentType, result.response);
            return presenter.present({ code: MOCK_FIND, response: result });
        } catch (e) {
            return presenter.present({ code: MOCK_FIND, response: result });
        }
    };

    async searchMock(query, presenter) {
        try {
            const searchQuery = query.query;
            const path = '/' + searchQuery.substring(searchQuery.indexOf('/mock/'), searchQuery.length);

            const mongooseQuery = [
                {
                    title: {
                        $regex: searchQuery,
                        $options: 'i'
                    }
                },
                {
                    category: {
                        $regex: searchQuery,
                        $options: 'i'
                    }
                },
                {
                    'path.path': path
                }
            ];

            const total = await this.model.countDocuments(
                {
                    $or: mongooseQuery
                });

            let page = parseInt(query.current);
            let results = parseInt(query.results);

            if (page !== 0) {
                page = page - 1;
            }

            const response = await this.model
                .find({
                    $or: mongooseQuery
                })
                .limit(results)
                .skip(page * results);
            return presenter.present({ code: MOCK_SEARCH, total, response, page, results })
        } catch (e) {
            Logger.error(e)
        }
    };

    async readMock(query, presenter) {
        try {
            const total = await this.model.countDocuments({});
            let page = parseInt(query.current);
            let results = parseInt(query.results);

            if (page !== 0) {
                page = page - 1;
            }
            const response = await this.model
                .find({})
                .limit(results)
                .skip(page * results);

            return presenter.present({ code: MOCK_READ, total, response, page, results })
        } catch (e) {
            Logger.error(e)
        }
    };

    async updateMock(body, presenter) {
        let { _id, status, title, contentType, charset, headers = '', category, response, path = '', requestHeaders = '', requestBody = '' } = body;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        let updated = await this.model.findOneAndUpdate(
            { _id },
            {
                status,
                title,
                contentType,
                charset,
                headers,
                category,
                response,
                path,
                requestHeaders: JSON.stringify(requestHeaders),
                requestBody: objectToUrlParams(requestBody)
            },
            { new: true, upsert: true }
        );

        presenter.setUpdated(updated);

        return await this.readMock({ current: 1, results: 10 }, presenter);
    };

    async destroyMock(query, presenter) {
        await query.map(async _id => await this.model.findOneAndRemove({ _id: _id }));
        return await this.readMock({ current: 1, results: 10 }, presenter);
    };
}
