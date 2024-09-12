import axios from 'axios';

const OtpService = {
  sendOtp: async (email: string) => {
    try {
      const response = await axios.post('https://your-api.com/send-otp', {
        email,
      });
      return response.data.success;
    } catch (error) {
      console.error('OTP send failed', error);
      return false;
    }
  }
};

export default OtpService;