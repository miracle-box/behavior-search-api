const logging = async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${new Date().toISOString()} ${ctx.method} ${ctx.url} - ${ms}ms`);
};

export default logging;
