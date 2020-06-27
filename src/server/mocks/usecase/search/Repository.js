import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async search(body) {
        try {
            const searchQuery = body.query;
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
                    'requestPath.path': path
                }
            ];

            const total = await this.model.countDocuments(
                {
                    $or: mongooseQuery
                });

            let page = parseInt(body.current);
            let results = parseInt(body.results);

            if (page !== 0) {
                page = page - 1;
            }

            const response = await this.model
                .find({
                    $or: mongooseQuery
                })
                .limit(results)
                .skip(page * results);

            return { total, response, page, results };

        } catch (e) {
            Logger.error(e)
        }
    };
}
