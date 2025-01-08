"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_persist_1 = tslib_1.__importDefault(require("node-persist"));
const path_1 = tslib_1.__importDefault(require("path"));
const initStorage = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield node_persist_1.default.init({
            dir: path_1.default.join(process.cwd(), 'src', 'cache'),
            stringify: JSON.stringify,
            parse: JSON.parse,
            logging: false,
            writeQueue: true
        });
        global.log.info('Storage initialized successfully');
    }
    catch (error) {
        global.log.error(`Error while initializing storage ${error}`);
    }
});
exports.default = initStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3RUFBa0M7QUFDbEMsd0RBQXVCO0FBRXZCLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRTtJQUM3QixJQUFJLENBQUM7UUFDSCxNQUFNLHNCQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1lBQzdDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFFLEtBQUs7WUFDZCxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDL0QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQsa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0b3JhZ2UgZnJvbSAnbm9kZS1wZXJzaXN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgaW5pdFN0b3JhZ2UgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgc3RvcmFnZS5pbml0KHtcbiAgICAgIGRpcjogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdzcmMnLCAnY2FjaGUnKSxcbiAgICAgIHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnksXG4gICAgICBwYXJzZTogSlNPTi5wYXJzZSxcbiAgICAgIGxvZ2dpbmc6IGZhbHNlLFxuICAgICAgd3JpdGVRdWV1ZTogdHJ1ZVxuICAgIH0pXG5cbiAgICBnbG9iYWwubG9nLmluZm8oJ1N0b3JhZ2UgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5JylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWwubG9nLmVycm9yKGBFcnJvciB3aGlsZSBpbml0aWFsaXppbmcgc3RvcmFnZSAke2Vycm9yfWApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFN0b3JhZ2VcbiJdfQ==