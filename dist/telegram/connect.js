"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const tslib_1 = require("tslib");
const queue_1 = tslib_1.__importDefault(require("../lib/queue"));
const telegram_1 = require("telegram");
const events_1 = require("telegram/events");
const sessions_1 = require("telegram/sessions");
const helper_1 = require("../lib/helper");
const initBot_1 = require("../telegram/initBot");
const connect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const stringSession = new sessions_1.StringSession('');
    const client = new telegram_1.TelegramClient(stringSession, +process.env.API_ID, process.env.API_HASH, {
        reconnectRetries: 5
    });
    try {
        yield client.start({
            phoneNumber: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                return yield (0, helper_1.pollForWebhookValue)('phone');
            }),
            phoneCode: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                return yield (0, helper_1.pollForWebhookValue)('code');
            }),
            password: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                return yield (0, helper_1.pollForWebhookValue)('password');
            }),
            onError: (err) => {
                global.webhook.error = err;
                throw err;
            }
        });
        client.addEventHandler(messageHandler, new events_1.NewMessage({}));
    }
    catch (error) {
        global.log.error(`Authentication error ${error}`);
    }
});
exports.connect = connect;
function messageHandler(event) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!event.message.message)
            return;
        const grabCode = (0, helper_1.matchCodeRegex)(event.message.message);
        if (!grabCode)
            return;
        queue_1.default.enqueue(grabCode);
    });
}
queue_1.default.subscribe((grabCode) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, initBot_1.sendCode)(grabCode);
        queue_1.default.dequeue();
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZWxlZ3JhbS9jb25uZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZ0M7QUFDaEMsdUNBQXlDO0FBQ3pDLDRDQUE2RDtBQUM3RCxnREFBaUQ7QUFDakQsMENBQW1FO0FBQ25FLGlEQUE4QztBQUU5QyxNQUFNLE9BQU8sR0FBRyxHQUFTLEVBQUU7SUFDekIsTUFBTSxhQUFhLEdBQUcsSUFBSSx3QkFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtRQUMxRixnQkFBZ0IsRUFBRSxDQUFDO0tBQ3BCLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQztRQUNILE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixXQUFXLEVBQUUsR0FBMEIsRUFBRTtnQkFDdkMsT0FBTyxNQUFNLElBQUEsNEJBQW1CLEVBQVMsT0FBTyxDQUFDLENBQUE7WUFDbkQsQ0FBQyxDQUFBO1lBQ0QsU0FBUyxFQUFFLEdBQTBCLEVBQUU7Z0JBQ3JDLE9BQU8sTUFBTSxJQUFBLDRCQUFtQixFQUFTLE1BQU0sQ0FBQyxDQUFBO1lBQ2xELENBQUMsQ0FBQTtZQUNELFFBQVEsRUFBRSxHQUEwQixFQUFFO2dCQUNwQyxPQUFPLE1BQU0sSUFBQSw0QkFBbUIsRUFBUyxVQUFVLENBQUMsQ0FBQTtZQUN0RCxDQUFDLENBQUE7WUFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFBO2dCQUMxQixNQUFNLEdBQUcsQ0FBQTtZQUNYLENBQUM7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxJQUFJLG1CQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQXFCUSwwQkFBTztBQW5CaEIsU0FBZSxjQUFjLENBQUMsS0FBc0I7O1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87WUFBRSxPQUFNO1FBRWxDLE1BQU0sUUFBUSxHQUFHLElBQUEsdUJBQWMsRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXRELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTTtRQUVyQixlQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FBQTtBQUVELGVBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxRQUFRLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsa0JBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQTtRQUN4QixlQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHF1ZXVlIGZyb20gJy4uL2xpYi9xdWV1ZSdcbmltcG9ydCB7IFRlbGVncmFtQ2xpZW50IH0gZnJvbSAndGVsZWdyYW0nXG5pbXBvcnQgeyBOZXdNZXNzYWdlLCBOZXdNZXNzYWdlRXZlbnQgfSBmcm9tICd0ZWxlZ3JhbS9ldmVudHMnXG5pbXBvcnQgeyBTdHJpbmdTZXNzaW9uIH0gZnJvbSAndGVsZWdyYW0vc2Vzc2lvbnMnXG5pbXBvcnQgeyBtYXRjaENvZGVSZWdleCwgcG9sbEZvcldlYmhvb2tWYWx1ZSB9IGZyb20gJy4uL2xpYi9oZWxwZXInXG5pbXBvcnQgeyBzZW5kQ29kZSB9IGZyb20gJy4uL3RlbGVncmFtL2luaXRCb3QnXG5cbmNvbnN0IGNvbm5lY3QgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0cmluZ1Nlc3Npb24gPSBuZXcgU3RyaW5nU2Vzc2lvbignJylcbiAgY29uc3QgY2xpZW50ID0gbmV3IFRlbGVncmFtQ2xpZW50KHN0cmluZ1Nlc3Npb24sICtwcm9jZXNzLmVudi5BUElfSUQsIHByb2Nlc3MuZW52LkFQSV9IQVNILCB7XG4gICAgcmVjb25uZWN0UmV0cmllczogNVxuICB9KVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgY2xpZW50LnN0YXJ0KHtcbiAgICAgIHBob25lTnVtYmVyOiBhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHBvbGxGb3JXZWJob29rVmFsdWU8c3RyaW5nPigncGhvbmUnKVxuICAgICAgfSxcbiAgICAgIHBob25lQ29kZTogYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBwb2xsRm9yV2ViaG9va1ZhbHVlPHN0cmluZz4oJ2NvZGUnKVxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiBhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHBvbGxGb3JXZWJob29rVmFsdWU8c3RyaW5nPigncGFzc3dvcmQnKVxuICAgICAgfSxcbiAgICAgIG9uRXJyb3I6IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIGdsb2JhbC53ZWJob29rLmVycm9yID0gZXJyXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjbGllbnQuYWRkRXZlbnRIYW5kbGVyKG1lc3NhZ2VIYW5kbGVyLCBuZXcgTmV3TWVzc2FnZSh7fSkpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsLmxvZy5lcnJvcihgQXV0aGVudGljYXRpb24gZXJyb3IgJHtlcnJvcn1gKVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1lc3NhZ2VIYW5kbGVyKGV2ZW50OiBOZXdNZXNzYWdlRXZlbnQpIHtcbiAgaWYgKCFldmVudC5tZXNzYWdlLm1lc3NhZ2UpIHJldHVyblxuXG4gIGNvbnN0IGdyYWJDb2RlID0gbWF0Y2hDb2RlUmVnZXgoZXZlbnQubWVzc2FnZS5tZXNzYWdlKVxuXG4gIGlmICghZ3JhYkNvZGUpIHJldHVyblxuXG4gIHF1ZXVlLmVucXVldWUoZ3JhYkNvZGUpXG59XG5cbnF1ZXVlLnN1YnNjcmliZShhc3luYyAoZ3JhYkNvZGUpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBzZW5kQ29kZShncmFiQ29kZSlcbiAgICBxdWV1ZS5kZXF1ZXVlKClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgfVxufSlcblxuZXhwb3J0IHsgY29ubmVjdCB9XG4iXX0=