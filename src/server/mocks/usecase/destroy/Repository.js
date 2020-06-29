import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async destroy(query) {
        try {
            await query.map(async _id => await this.model.findOneAndRemove({ _id: _id }));
        } catch (e) {
            Logger.error(e)
        }
    };
}
