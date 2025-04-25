// server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initOTPClient, sendOTP, verifyOTP } from 'onetime-sdk';

dotenv.config();

const app = express();

// Allow all origins (for development purposes)
app.use(cors());
// Or restrict to just the frontend
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// Initialize OTP Client
if (!process.env.ONETIME_API_KEY) {
  throw new Error('ONETIME_API_KEY is not set in environment variables');
}
if (!process.env.ONETIME_API_BASE_URL) {
  throw new Error('ONETIME_API_BASE_URL is not set in environment variables');
}
initOTPClient({ apiKey: process.env.ONETIME_API_KEY, baseURL: process.env.ONETIME_API_BASE_URL });

app.post('/send-otp', function (req, res, next) {
  (async () => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    try {
      const result = await sendOTP({ channel: 'email', recipient: email });
      res.json({ success: true, data: result });
      console.log(result);
    } catch (err) {
      const errorMsg = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err);
      res.status(500).json({ success: false, error: errorMsg });
    }
  })().catch(next);
});

app.post('/verify-otp', function (req, res, next) {
  (async () => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

    try {
      const result = await verifyOTP({ channel: 'email', recipient: email, code: otp });
      res.json({ success: true, verified: result });
    } catch (err) {
      const errorMsg = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err);
      res.status(400).json({ success: false, error: errorMsg });
    }
  })().catch(next);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`OneTime test server running at http://localhost:${PORT}`);
});
