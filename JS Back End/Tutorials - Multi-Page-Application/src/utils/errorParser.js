function parseError(err) {
    let error;

    if (Array.isArray(err)) {
        error = err.map(x => x.msg);
    } else if (err.name == 'ValidationError') {
        error =  Object.values(err.errors).map(x => x.properties.message);
    } else {
        error = [err.message];
    }

    return error.join('\n');
}

module.exports = parseError;