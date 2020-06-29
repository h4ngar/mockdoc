import {
    filterByHeaderData,
    hasBodyAndQueryAndUrlParams,
    hasBodyParams,
    hasQueryAndUrlParams, hasQueryParams,
    objectToUrlParams,
} from '../../../../helper';

export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {

        if (hasBodyAndQueryAndUrlParams(this.req)) {
            const result = await this.repository.findPostAndUrlParams({
                path: this.getPath(),
                query: this.getQuery(),
                body: this.getBody()
            });

            this.validateResult(result);
            const response = filterByHeaderData(this.getHeaders(), result);
            return this.presenter.present({ response });
        }

        if (hasQueryAndUrlParams(this.req)) {
            const result = await this.repository.findGetAndUrlParams({ path: this.getPath(), query: this.getQuery() });
            this.validateResult(result);
            const response = filterByHeaderData(this.getHeaders(), result);
            return this.presenter.present({ response });
        }

        if (!hasQueryParams(this.req) && !hasBodyParams(this.req)) {
            const result = await this.repository.findGet({ path: this.getPath() });
            this.validateResult(result);
            const response = filterByHeaderData(this.getHeaders(), result);
            return this.presenter.present({ response });
        }

        if (hasBodyParams(this.req)) {
            const result = await this.repository.findPost({ path: this.getPath(), body: this.getBody() });
            this.validateResult(result);
            const response = filterByHeaderData(this.getHeaders(), result);
            return this.presenter.present({ response });
        }
    }

    getPath() {
        return this.req.params[0]
    }

    getBody() {
        return JSON.stringify(this.req.body);
    }

    getQuery() {
        return objectToUrlParams(this.req.query);
    }

    getHeaders() {
        return this.req.headers;
    }

    validateResult(result) {
        if (result.length === 0) {
            return this.presenter.presentError({
                code: 500,
                message: 'Couldn´t find mock. Please check your request params'
            })
        }
    }
}
