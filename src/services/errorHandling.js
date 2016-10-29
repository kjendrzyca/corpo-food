'use strict';
const Polyglot = require('node-polyglot');
const addError = require('../store/errorsActions').addError;

module.exports.handleMongoValidationErrors = (errors, errorResources) => {
    const polyglot = new Polyglot({phrases: errorResources});
    const errorsDictionary = [];

    for (let property in errors) {
        if (errors.hasOwnProperty(property)) {
            errorsDictionary.push({
                property,
                message: polyglot.t(errors[property].message),
            });
        }
    }

    return errorsDictionary;
};

module.exports.checkFetchForErrors = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.apiError = true;
    error.response = response;
    throw error;
};

module.exports.handleFetchErrors = (error, dispatch, validationErrorsCallback) => {
    if (error.apiError) {
        error.response.json()
        .then(data => {
            dispatch(addError(data.message));

            const callbackPresent = validationErrorsCallback;
            if (callbackPresent && data.validationErrors.length) {
                validationErrorsCallback(data.validationErrors);
            }
        })
        .catch(() => {
            /*
                if server returned just sendStatus(BAD_REQUEST) - the .json() will fail as the request body is not an object,
                so we are just showing the generic statusText error
            */
            dispatch(addError(error.toString()));
        });

        return;
    }

    console.log('caught not API-related error', error);
};
