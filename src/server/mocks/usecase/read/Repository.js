import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async read(query) {
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

            return { total, response, page, results };

        } catch (e) {
            Logger.error(e)
        }
    };
}
