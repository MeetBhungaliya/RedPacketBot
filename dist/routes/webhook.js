"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const webhook_1 = require("../controller/webhook");
const router = express_1.default.Router();
router.get('/webhook', webhook_1.getWebhook);
router.get('/setWebhook', webhook_1.setWebhook);
router.get('/deleteWebhook', webhook_1.deleteWebhook);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvd2ViaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBNkI7QUFDN0IsbURBQTZFO0FBRTdFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQVUsQ0FBQyxDQUFBO0FBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLG9CQUFVLENBQUMsQ0FBQTtBQUVyQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLHVCQUFhLENBQUMsQ0FBQTtBQUUzQyxrQkFBZSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgZ2V0V2ViaG9vaywgc2V0V2ViaG9vaywgZGVsZXRlV2ViaG9vayB9IGZyb20gJy4uL2NvbnRyb2xsZXIvd2ViaG9vaydcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKVxuXG5yb3V0ZXIuZ2V0KCcvd2ViaG9vaycsIGdldFdlYmhvb2spXG5cbnJvdXRlci5nZXQoJy9zZXRXZWJob29rJywgc2V0V2ViaG9vaylcblxucm91dGVyLmdldCgnL2RlbGV0ZVdlYmhvb2snLCBkZWxldGVXZWJob29rKVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXJcbiJdfQ==