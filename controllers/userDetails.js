const useragent = require('useragent')

const userDetailsMiddleware = (req, res, next) => {
    const agent = useragent.parse(req.headers['user-agent']);

    req.userDetails = {
      ip: req.ip,
      os: agent.os.toString(),
      browser: agent.toAgent(),
      referrer: req.headers['referer'] || req.headers['referrer'],
      device: agent.device.toString(),  
      time: new Date(),
    };
    next();
  };

  module.exports = userDetailsMiddleware;