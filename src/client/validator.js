import { nanoid } from 'nanoid';
import { message } from 'antd';

export const validate = (form) => {

    if (form.requestHeaders !== '' && typeof form.requestHeaders !== 'undefined' && typeof form.requestHeaders !== 'object') {
        try {
            form.requestHeaders = JSON.parse(form.requestHeaders);
        } catch (e) {
            return message.error('Request Headers must be an object');
        }
    }

    if (form.requestBody !== '' && typeof form.requestBody !== 'undefined' && typeof form.requestBody !== 'object') {
        try {
            form.requestBody = JSON.parse(form.requestBody);
        } catch (e) {
            return message.error('Request Body must be an object');
        }
    }

    if (form.responseHeaders !== '' && typeof form.responseHeaders !== 'undefined' && typeof form.responseHeaders !== 'object') {
        try {
            form.responseHeaders = JSON.parse(form.responseHeaders);
        } catch (e) {
            return message.error('Response Headers must be an object');
        }
    }

    if (typeof form.requestPath !== 'undefined' && form.requestPath.path === '') {
        form.requestPath = {
            path: '/' + nanoid(),
            isAutoGenerated: true
        };
    }

    return form;
};