class BaseHttpError extends Errors{
	constructor (msg,opCode,httpCode,httpMsg){
		super(msg);
		this.opCode = opCode;
		this.httpCode = httpCode;
		this.httpMsg = httpMsg;

		this.name = 'BaseHttpError';
	}
}

class InternalError extends BaseHttpError{
	constructor(msg){
		const opCode = 10001;
		const httpMsg = '服务器出了点问题，稍后再试！'；
		super(msg,opCode,500,httpMsg);
	}
}


class ValidationError extends BaseHttpError{
	constructor (path,reason){
		const opCode = 20000;
		const httpCode = 400;
		super(`error validation params,path:${path},reason:${reason}`,opCode,httpCode,'参数错误，请检查后重试！')；

		this.name = 'ValidationError';
	}
}

class DulicatedUserNameError extends ValidationError{
	constructor (userName){
		super('username',`duplicated username:${username}`);
		this.httpMsg='这个昵称已经被使用了，不如换一个吧！'；
		this.opCode = 20001;
	}
}


module.exports = {
	BaseHttpError,
	ValidationError,
	DulicatedUserNameError,
	InternalError,
}