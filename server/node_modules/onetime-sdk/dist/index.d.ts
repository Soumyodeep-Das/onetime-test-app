type Channel = 'email' | 'sms';
interface InitOTPClientOptions {
    apiKey: string;
    baseURL?: string;
    timeout?: number;
    retries?: number;
}
interface SendOTPParams {
    channel: Channel;
    recipient: string;
    template?: string;
    metadata?: Record<string, any>;
}
interface VerifyOTPParams {
    channel: Channel;
    recipient: string;
    code: string;
}

declare const sendOTP: (params: SendOTPParams) => Promise<any>;
declare const verifyOTP: (params: VerifyOTPParams) => Promise<any>;

declare const initOTPClient: (options: InitOTPClientOptions) => void;

export { initOTPClient, sendOTP, verifyOTP };
