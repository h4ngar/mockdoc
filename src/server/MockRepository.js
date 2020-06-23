import mongoose from 'mongoose';
import { MOCK_FIND, MOCK_UPDATE, MOCK_READ, MOCK_SEARCH } from './Constants';
import { Logger } from '@scripty/logger';

export class MockRepository {

    constructor(requestSchema) {
        delete mongoose.connection.models['mocks'];
        let Schema = new mongoose.Schema(requestSchema, { timestamps: true });
        this.model = mongoose.model('mocks', Schema);
    }

    async findMock(query, presenter) {
        let response = await this.model.findOne({ _id: query._id });
        return presenter.present({ code: MOCK_FIND, response });
    };

    async searchMock(query, presenter) {
        try {
            const searchQuery = query.query;
            const total = await this.model.countDocuments(
                {
                    $or: [{ title: { $regex: searchQuery, $options: 'i' } }, {
                        category: {
                            $regex: searchQuery,
                            $options: 'i'
                        }
                    }]
                });

            let page = parseInt(query.current);
            let results = parseInt(query.results);

            if (page !== 0) {
                page = page - 1;
            }

            let searchId = 'eeeeeeeeeeeeeeeeeeeeeeee';

            if (searchQuery.length === 24) {
                searchId = searchQuery;
            }

            const response = await this.model
                .find({
                    $or: [
                        {
                            title: {
                                $regex: searchQuery, $options: 'i'
                            }
                        },
                        {
                            category: {
                                $regex: searchQuery,
                                $options: 'i'
                            }
                        },
                        {
                            _id: searchId
                        }
                    ]
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

    async updateMock(query, presenter) {
        let { _id, status, title, contentType, charset, headers, response, category } = query;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        let updated = await this.model.findOneAndUpdate(
            { _id },
            { status, title, contentType, charset, headers, category, response },
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
