"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = exports.errorLogger = void 0;
const notFound = (_, res) => {
    return res.reply({ code: 404, message: 'Route not found' });
};
exports.notFound = notFound;
const errorLogger = (error, req, res, next) => {
    global.log.error(`${req.method} ${req.url}`);
    global.log.error('body -> ', req.body);
    global.log.error(error.stack);
    return next(error);
};
exports.errorLogger = errorLogger;
const errorHandler = (error, req, res) => {
    res.status(500).json({
        code: 500,
        message: error.message || 'Internal Server Error'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBVSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUE7QUFnQnFCLDRCQUFRO0FBZDlCLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBWSxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3BGLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNwQixDQUFDLENBQUE7QUFTUSxrQ0FBVztBQVBwQixNQUFNLFlBQVksR0FBRyxDQUFDLEtBQVksRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxFQUFFLEdBQUc7UUFDVCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSx1QkFBdUI7S0FDbEQsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRStCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnXG5cbmNvbnN0IG5vdEZvdW5kID0gKF86IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgcmV0dXJuIHJlcy5yZXBseSh7IGNvZGU6IDQwNCwgbWVzc2FnZTogJ1JvdXRlIG5vdCBmb3VuZCcgfSlcbn1cblxuY29uc3QgZXJyb3JMb2dnZXIgPSAoZXJyb3I6IEVycm9yLCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICBnbG9iYWwubG9nLmVycm9yKGAke3JlcS5tZXRob2R9ICR7cmVxLnVybH1gKVxuICBnbG9iYWwubG9nLmVycm9yKCdib2R5IC0+ICcsIHJlcS5ib2R5KVxuICBnbG9iYWwubG9nLmVycm9yKGVycm9yLnN0YWNrKVxuICByZXR1cm4gbmV4dChlcnJvcilcbn1cblxuY29uc3QgZXJyb3JIYW5kbGVyID0gKGVycm9yOiBFcnJvciwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICBjb2RlOiA1MDAsXG4gICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJ1xuICB9KVxufVxuXG5leHBvcnQgeyBlcnJvckxvZ2dlciwgbm90Rm91bmQsIGVycm9ySGFuZGxlciB9XG4iXX0=