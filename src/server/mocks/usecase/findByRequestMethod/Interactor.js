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
            const path = this.req.params[0];
            const query = objectToUrlParams(this.req.query);
            const body = JSON.stringify(this.req.body);
            const headers = this.req.headers;
            const result = await this.repository.findPostAndUrlParams({ path, query, body });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        if (hasQueryAndUrlParams(this.req)) {
            const path = this.req.params[0];
            const query = objectToUrlParams(this.req.query);
            const headers = this.req.headers;
            const result = await this.repository.findGetAndUrlParams({ path, query });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        if (!hasQueryParams(this.req) && !hasBodyParams(this.req)) {
            const path = this.req.params[0];
            const headers = this.req.headers;
            const result = await this.repository.findGet({ path });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        if (hasBodyParams(this.req)) {
            const path = this.req.params[0];
            const headers = this.req.headers;
            const body = JSON.stringify(this.req.body);

            console.log(path, ' path ---------------------- ');
            console.log(body, ' body ---------------------- ');

            const result = await this.repository.findPost({ path, body });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }
    }
}
