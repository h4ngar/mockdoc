import mongoose from 'mongoose';
import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async findPostAndUrlParams({ path, query, body}) {
        try {
            return await this.model.find({ 'requestPath.path': `/${path}?${query}`, requestBody: body });
        } catch (e) {
            Logger.error(e);
        }
    };

    async findGetAndUrlParams({ path, query}) {
        try {
            return await this.model.find({ 'requestPath.path': `/${path}?${query}`});
        } catch (e) {
            Logger.error(e);
        }
    };

    async findGet({ path }) {
        try {
            return await this.model.find({ 'requestPath.path': `/${path}`});
        } catch (e) {
            Logger.error(e);
        }
    };

    async findPost({ path, body}) {
        try {
            return await this.model.find({ 'requestPath.path': `/${path}`, requestBody: body});
        } catch (e) {
            Logger.error(e);
        }
    };
}
