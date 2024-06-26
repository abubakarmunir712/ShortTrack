const rateLimit = require('express-rate-limit')

module.exports.getLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // limit each IP to 1 request per windowMs
    handler: (req, res) => {
        res.status(429).json({
            message: 'You can only request once every minute. Please try again later.'
        });
    }
});

module.exports.postLimit = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            message: 'Too many wrong tries! Please try again later.'
        });
    }
});