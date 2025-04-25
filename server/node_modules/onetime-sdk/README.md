# OneTime SDK

Easily send and verify OTPs via email or SMS using OneTime's secure API.

---

## 🔧 Installation

```bash
npm install onetime-sdk
```

---

## ⚙️ Usage

```ts
import { initOTPClient, sendOTP, verifyOTP } from 'onetime-sdk';

initOTPClient({ apiKey: 'your-api-key' });

await sendOTP({
  channel: 'email',
  recipient: 'hello@example.com',
});

await verifyOTP({
  channel: 'email',
  recipient: 'hello@example.com',
  code: '123456',
});
```

---

## 📘 Documentation

- [API Docs](#) <!-- Replace # with actual documentation link if available -->
- [Get API Key](#) <!-- Replace # with actual API key link if available -->

---

## ✅ Write Unit Tests with Jest

### 1. Install test tooling

```bash
npm install --save-dev jest ts-jest @types/jest
npx ts-jest config:init
```

### 2. Example test

Create a file at `test/client.test.ts`:

```ts
import { initOTPClient } from '../src';
import { getClient } from '../src/client';

describe('SDK Client Init', () => {
  it('should initialize Axios client with API key', () => {
    initOTPClient({ apiKey: 'test-key' });
    const client = getClient();
    expect(client.defaults.headers.common['x-api-key']).toBe('test-key');
  });
});
```

### 3. Add test script to package.json

```json
"scripts": {
  "build": "tsup",
  "test": "jest"
}
```
