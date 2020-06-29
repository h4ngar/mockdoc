import mongoose from 'mongoose';
import { BaseRepository } from '../../../BaseRepository';
import { Logger } from '@scripty/logger/src/Logger';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async update(body) {
        let { _id, ...restProps } = body;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        try {
            return await this.model.findOneAndUpdate(
                { _id },
                { ...restProps },
                { new: true, upsert: true }
            );
        } catch (e) {
            Logger.error(e)
        }
    };
}
