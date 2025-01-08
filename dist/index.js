"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./lib/envconfig");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const os_1 = tslib_1.__importDefault(require("os"));
const process_1 = tslib_1.__importDefault(require("process"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const routeConfig_1 = tslib_1.__importDefault(require("./lib/routeConfig"));
const storage_1 = tslib_1.__importDefault(require("./lib/storage"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const http_1 = require("http");
const constant_1 = require("./constant");
const helper_1 = require("./middleware/helper");
const connect_1 = require("./telegram/connect");
const initBot_1 = require("./telegram/initBot");
require("./globals");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
httpServer.listen(process_1.default.env.PORT, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, storage_1.default)();
    (0, connect_1.connect)();
    (0, initBot_1.initBot)();
    global.log.info(`Spinning on ${process_1.default.env.PORT}`);
}));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)(constant_1.CORS_OPTION));
app.use(routeConfig_1.default);
app.use((0, morgan_1.default)('dev', {
    skip: (req) => req.path === '/health' || req.path === '/favicon.ico'
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/health', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const memoryUsage = process_1.default.memoryUsage();
    const cpuUsage = os_1.default.cpus().map((cpu) => ({
        model: cpu.model,
        speed: cpu.speed,
        times: cpu.times
    }));
    const uptime = process_1.default.uptime();
    const startTime = new Date(Date.now() - process_1.default.uptime() * 1000);
    const currentTimestamp = new Date();
    const serverTime = (0, moment_timezone_1.default)().tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    let serverLocation = { city: 'Unknown', country: 'Unknown' };
    try {
        const response = yield axios_1.default.get('http://ip-api.com/json');
        if (response.data && response.data.city && response.data.country) {
            serverLocation = {
                city: response.data.city,
                country: response.data.country
            };
        }
    }
    catch (error) {
        console.error('Error fetching location:', error);
    }
    res.reply({ code: 200, message: 'Service is up and running!' }, {
        timestamp: currentTimestamp,
        uptime: uptime,
        startTime: startTime,
        memoryUsage: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external
        },
        cpuUsage: cpuUsage,
        system: {
            platform: os_1.default.platform(),
            architecture: os_1.default.arch(),
            totalMemory: os_1.default.totalmem(),
            freeMemory: os_1.default.freemem()
        },
        server: {
            time: serverTime,
            location: serverLocation,
            timezone: 'UTC',
            nodeVersion: process_1.default.version,
            serverHost: os_1.default.hostname(),
            environment: process_1.default.env.NODE_ENV
        }
    });
}));
app.use(routes_1.default);
app.use('*', helper_1.notFound);
app.use(helper_1.errorLogger);
app.use(helper_1.errorHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQXdCO0FBRXhCLHNFQUFxQztBQUNyQyx3REFBdUI7QUFDdkIsOERBQTZCO0FBQzdCLDREQUEyQjtBQUMzQix3REFBdUI7QUFDdkIsb0RBQW1CO0FBQ25CLDhEQUE2QjtBQUM3QiwwREFBeUI7QUFDekIsOEVBQW9DO0FBQ3BDLDRFQUEyQztBQUMzQyxvRUFBdUM7QUFDdkMsOERBQTZCO0FBQzdCLCtCQUFtQztBQUNuQyx5Q0FBd0M7QUFDeEMsZ0RBQXlFO0FBQ3pFLGdEQUE0QztBQUM1QyxnREFBNEM7QUFFNUMscUJBQWtCO0FBRWxCLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFBO0FBRXJCLE1BQU0sVUFBVSxHQUFHLElBQUEsbUJBQVksRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUVwQyxVQUFVLENBQUMsTUFBTSxDQUFDLGlCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFTLEVBQUU7SUFDN0MsTUFBTSxJQUFBLGlCQUFXLEdBQUUsQ0FBQTtJQUNuQixJQUFBLGlCQUFPLEdBQUUsQ0FBQTtJQUNULElBQUEsaUJBQU8sR0FBRSxDQUFBO0lBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEscUJBQVcsR0FBRSxDQUFDLENBQUE7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksRUFBQyxzQkFBVyxDQUFDLENBQUMsQ0FBQTtBQUUxQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFXLENBQUMsQ0FBQTtBQUVwQixHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEsZ0JBQU0sRUFBQyxL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QUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLFdBQVcsRUFBRSxpQkFBTyxDQUFDLE9BQU87WUFDNUIsVUFBVSxFQUFFLFlBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDekIsV0FBVyxFQUFFLGlCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7U0FDbEM7S0FDRixDQUNGLENBQUE7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLENBQUE7QUFFZixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBUSxDQUFDLENBQUE7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBVyxDQUFDLENBQUE7QUFFcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBWSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vbGliL2VudmNvbmZpZydcblxuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgb3MgZnJvbSAnb3MnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdwcm9jZXNzJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnXG5pbXBvcnQgcm91dGVDb25maWcgZnJvbSAnLi9saWIvcm91dGVDb25maWcnXG5pbXBvcnQgaW5pdFN0b3JhZ2UgZnJvbSAnLi9saWIvc3RvcmFnZSdcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgQ09SU19PUFRJT04gfSBmcm9tICcuL2NvbnN0YW50J1xuaW1wb3J0IHsgZXJyb3JIYW5kbGVyLCBlcnJvckxvZ2dlciwgbm90Rm91bmQgfSBmcm9tICcuL21pZGRsZXdhcmUvaGVscGVyJ1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJy4vdGVsZWdyYW0vY29ubmVjdCdcbmltcG9ydCB7IGluaXRCb3QgfSBmcm9tICcuL3RlbGVncmFtL2luaXRCb3QnXG5cbmltcG9ydCAnLi9nbG9iYWxzJ1xuXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuY29uc3QgaHR0cFNlcnZlciA9IGNyZWF0ZVNlcnZlcihhcHApXG5cbmh0dHBTZXJ2ZXIubGlzdGVuKHByb2Nlc3MuZW52LlBPUlQsIGFzeW5jICgpID0+IHtcbiAgYXdhaXQgaW5pdFN0b3JhZ2UoKVxuICBjb25uZWN0KClcbiAgaW5pdEJvdCgpXG4gIGdsb2JhbC5sb2cuaW5mbyhgU3Bpbm5pbmcgb24gJHtwcm9jZXNzLmVudi5QT1JUfWApXG59KVxuXG5hcHAudXNlKGNvbXByZXNzaW9uKCkpXG5hcHAudXNlKGNvcnMoQ09SU19PUFRJT04pKVxuXG5hcHAudXNlKHJvdXRlQ29uZmlnKVxuXG5hcHAudXNlKFxuICBtb3JnYW4oJ2RldicsIHtcbiAgICBza2lwOiAocmVxKSA9PiByZXEucGF0aCA9PT0gJy9oZWFsdGgnIHx8IHJlcS5wYXRoID09PSAnL2Zhdmljb24uaWNvJ1xuICB9KVxuKVxuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMnKSkpXG5cbmFwcC5nZXQoJy9oZWFsdGgnLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgbWVtb3J5VXNhZ2UgPSBwcm9jZXNzLm1lbW9yeVVzYWdlKClcbiAgY29uc3QgY3B1VXNhZ2UgPSBvcy5jcHVzKCkubWFwKChjcHUpID0+ICh7XG4gICAgbW9kZWw6IGNwdS5tb2RlbCxcbiAgICBzcGVlZDogY3B1LnNwZWVkLFxuICAgIHRpbWVzOiBjcHUudGltZXNcbiAgfSkpXG5cbiAgY29uc3QgdXB0aW1lID0gcHJvY2Vzcy51cHRpbWUoKVxuICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZShEYXRlLm5vdygpIC0gcHJvY2Vzcy51cHRpbWUoKSAqIDEwMDApXG4gIGNvbnN0IGN1cnJlbnRUaW1lc3RhbXAgPSBuZXcgRGF0ZSgpXG5cbiAgY29uc3Qgc2VydmVyVGltZSA9IG1vbWVudCgpLnR6KCdVVEMnKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxuXG4gIGxldCBzZXJ2ZXJMb2NhdGlvbiA9IHsgY2l0eTogJ1Vua25vd24nLCBjb3VudHJ5OiAnVW5rbm93bicgfVxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vaXAtYXBpLmNvbS9qc29uJylcbiAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLmNpdHkgJiYgcmVzcG9uc2UuZGF0YS5jb3VudHJ5KSB7XG4gICAgICBzZXJ2ZXJMb2NhdGlvbiA9IHtcbiAgICAgICAgY2l0eTogcmVzcG9uc2UuZGF0YS5jaXR5LFxuICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5kYXRhLmNvdW50cnlcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbG9jYXRpb246JywgZXJyb3IpXG4gIH1cblxuICByZXMucmVwbHkoXG4gICAgeyBjb2RlOiAyMDAsIG1lc3NhZ2U6ICdTZXJ2aWNlIGlzIHVwIGFuZCBydW5uaW5nIScgfSxcbiAgICB7XG4gICAgICB0aW1lc3RhbXA6IGN1cnJlbnRUaW1lc3RhbXAsXG4gICAgICB1cHRpbWU6IHVwdGltZSxcbiAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgbWVtb3J5VXNhZ2U6IHtcbiAgICAgICAgcnNzOiBtZW1vcnlVc2FnZS5yc3MsXG4gICAgICAgIGhlYXBUb3RhbDogbWVtb3J5VXNhZ2UuaGVhcFRvdGFsLFxuICAgICAgICBoZWFwVXNlZDogbWVtb3J5VXNhZ2UuaGVhcFVzZWQsXG4gICAgICAgIGV4dGVybmFsOiBtZW1vcnlVc2FnZS5leHRlcm5hbFxuICAgICAgfSxcbiAgICAgIGNwdVVzYWdlOiBjcHVVc2FnZSxcbiAgICAgIHN5c3RlbToge1xuICAgICAgICBwbGF0Zm9ybTogb3MucGxhdGZvcm0oKSxcbiAgICAgICAgYXJjaGl0ZWN0dXJlOiBvcy5hcmNoKCksXG4gICAgICAgIHRvdGFsTWVtb3J5OiBvcy50b3RhbG1lbSgpLFxuICAgICAgICBmcmVlTWVtb3J5OiBvcy5mcmVlbWVtKClcbiAgICAgIH0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgdGltZTogc2VydmVyVGltZSxcbiAgICAgICAgbG9jYXRpb246IHNlcnZlckxvY2F0aW9uLFxuICAgICAgICB0aW1lem9uZTogJ1VUQycsXG4gICAgICAgIG5vZGVWZXJzaW9uOiBwcm9jZXNzLnZlcnNpb24sXG4gICAgICAgIHNlcnZlckhvc3Q6IG9zLmhvc3RuYW1lKCksXG4gICAgICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOVlxuICAgICAgfVxuICAgIH1cbiAgKVxufSlcblxuYXBwLnVzZShyb3V0ZXMpXG5cbmFwcC51c2UoJyonLCBub3RGb3VuZClcblxuYXBwLnVzZShlcnJvckxvZ2dlcilcblxuYXBwLnVzZShlcnJvckhhbmRsZXIpXG4iXX0=