function errorHandler (error, req, res, next) {
    let status = error.status;
    if (status === null || status === undefined) status = 500;
    res.status(status).json({ error: error.message });
}

module.exports = { errorHandler };