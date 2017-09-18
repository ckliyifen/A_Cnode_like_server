const logger = require('../utils/reqLogger')

function logRequests(options){
	return function(req,res,next){
		const content = {
			method:req.method,
			originalUrl:req.originalUrl,
			query:req.query,
			body:req.body,
			ip:req.ip||req.ips||req.get('X-Real-Ip'),
			user：req.user||undefined,
			httpStatusCode:res.statusCode,
		}

		logger.info('request',content);
		next();
	}
}


module.exports = {
	logRequests,
}