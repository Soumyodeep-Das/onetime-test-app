import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<'send' | 'verify'>('send');
  const [msg, setMsg] = useState('');

  const sendOtpHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5000/send-otp', { email });
      setMsg('OTP sent successfully!');
      setStage('verify');
    } catch (err: any) {
      setMsg(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      if (res.data.verified) {
        setMsg('OTP verified successfully!');
      } else {
        setMsg('Incorrect OTP!');
      }
    } catch (err: any) {
      setMsg(err.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>OneTime OTP Demo</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={stage === 'verify'}
      /><br /><br />
      {stage === 'verify' && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          /><br /><br />
        </>
      )}
      <button onClick={stage === 'send' ? sendOtpHandler : verifyOtpHandler}>
        {stage === 'send' ? 'Send OTP' : 'Verify OTP'}
      </button>
      <p>{msg}</p>
    </div>
  );
}

export default App;
