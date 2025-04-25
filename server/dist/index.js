"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const onetime_sdk_1 = require("onetime-sdk");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Allow all origins (for development purposes)
app.use((0, cors_1.default)());
// Or restrict to just the frontend
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express_1.default.json());
// Initialize OTP Client
if (!process.env.ONETIME_API_KEY) {
    throw new Error('ONETIME_API_KEY is not set in environment variables');
}
if (!process.env.ONETIME_API_BASE_URL) {
    throw new Error('ONETIME_API_BASE_URL is not set in environment variables');
}
(0, onetime_sdk_1.initOTPClient)({ apiKey: process.env.ONETIME_API_KEY, baseURL: process.env.ONETIME_API_BASE_URL });
app.post('/send-otp', function (req, res, next) {
    (() => __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required' });
        }
        try {
            const result = yield (0, onetime_sdk_1.sendOTP)({ channel: 'email', recipient: email });
            res.json({ success: true, data: result });
        }
        catch (err) {
            const errorMsg = (err && typeof err === 'object' && 'message' in err) ? err.message : String(err);
            res.status(500).json({ success: false, error: errorMsg });
        }
    }))().catch(next);
});
app.post('/verify-otp', function (req, res, next) {
    (() => __awaiter(this, void 0, void 0, function* () {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, error: 'Email and OTP are required' });
        }
        try {
            const result = yield (0, onetime_sdk_1.verifyOTP)({ channel: 'email', recipient: email, code: otp });
            res.json({ success: true, verified: result });
        }
        catch (err) {
            const errorMsg = (err && typeof err === 'object' && 'message' in err) ? err.message : String(err);
            res.status(400).json({ success: false, error: errorMsg });
        }
    }))().catch(next);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`OneTime test server running at http://localhost:${PORT}`);
});
