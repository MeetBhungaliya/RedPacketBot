"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchCodeRegex = exports.wait = exports.pollForWebhookValue = void 0;
const tslib_1 = require("tslib");
const pollForWebhookValue = (key_1, ...args_1) => tslib_1.__awaiter(void 0, [key_1, ...args_1], void 0, function* (key, interval = 1000) {
    if (!(key in global.webhook)) {
        return `The key "${key}" is not present in webhook`;
    }
    while (global.webhook[key] === null) {
        yield new Promise((resolve) => setTimeout(resolve, interval));
    }
    return global.webhook[key];
});
exports.pollForWebhookValue = pollForWebhookValue;
const wait = (ms) => {
    if (typeof ms !== 'number' || ms < 0 || !Number.isFinite(ms)) {
        return Promise.reject(new Error('The wait time must be a positive number.'));
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};
exports.wait = wait;
const matchCodeRegex = (message) => {
    const codeRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8}$/i;
    const match = message.match(codeRegex);
    if (!match)
        return;
    return match[0];
};
exports.matchCodeRegex = matchCodeRegex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sbUJBQW1CLEdBQUcsbUJBQXFFLEVBQUUsa0VBQTdELEdBQVcsRUFBRSxXQUFtQixJQUFJO0lBQ3hFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUM3QixPQUFPLFlBQVksR0FBRyw2QkFBNkIsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQW9CLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFvQixDQUFNLENBQUE7QUFDbEQsQ0FBQyxDQUFBLENBQUE7QUF1QlEsa0RBQW1CO0FBckI1QixNQUFNLElBQUksR0FBRyxDQUFDLEVBQVUsRUFBaUIsRUFBRTtJQUN6QyxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzdELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUE7UUFDWCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDUixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQVc2QixvQkFBSTtBQVRsQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLHNDQUFzQyxDQUFBO0lBQ3hELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFdEMsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFNO0lBRWxCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUVtQyx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYmhvb2sgfSBmcm9tICcuLy4uL3R5cGVzL3dlYmhvb2suZCdcblxuY29uc3QgcG9sbEZvcldlYmhvb2tWYWx1ZSA9IGFzeW5jIDxUPihrZXk6IHN0cmluZywgaW50ZXJ2YWw6IG51bWJlciA9IDEwMDApOiBQcm9taXNlPFQgfCBzdHJpbmc+ID0+IHtcbiAgaWYgKCEoa2V5IGluIGdsb2JhbC53ZWJob29rKSkge1xuICAgIHJldHVybiBgVGhlIGtleSBcIiR7a2V5fVwiIGlzIG5vdCBwcmVzZW50IGluIHdlYmhvb2tgXG4gIH1cblxuICB3aGlsZSAoZ2xvYmFsLndlYmhvb2tba2V5IGFzIGtleW9mIFdlYmhvb2tdID09PSBudWxsKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgaW50ZXJ2YWwpKVxuICB9XG5cbiAgcmV0dXJuIGdsb2JhbC53ZWJob29rW2tleSBhcyBrZXlvZiBXZWJob29rXSBhcyBUXG59XG5cbmNvbnN0IHdhaXQgPSAobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIG1zICE9PSAnbnVtYmVyJyB8fCBtcyA8IDAgfHwgIU51bWJlci5pc0Zpbml0ZShtcykpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdUaGUgd2FpdCB0aW1lIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuJykpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlc29sdmUoKVxuICAgIH0sIG1zKVxuICB9KVxufVxuXG5jb25zdCBtYXRjaENvZGVSZWdleCA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY29kZVJlZ2V4ID0gL14oPz0uKltBLVpdKSg/PS4qXFxkKVtBLVphLXowLTldezh9JC9pXG4gIGNvbnN0IG1hdGNoID0gbWVzc2FnZS5tYXRjaChjb2RlUmVnZXgpXG5cbiAgaWYgKCFtYXRjaCkgcmV0dXJuXG5cbiAgcmV0dXJuIG1hdGNoWzBdXG59XG5cbmV4cG9ydCB7IHBvbGxGb3JXZWJob29rVmFsdWUsIHdhaXQsIG1hdGNoQ29kZVJlZ2V4IH1cbiJdfQ==