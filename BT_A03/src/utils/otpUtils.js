export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Hàm giả lập gửi OTP qua email
  export const sendOTP = (email, otp) => {
    // Sử dụng dịch vụ gửi email như SendGrid hoặc Nodemailer để gửi OTP qua email.
    console.log(`OTP ${otp} đã được gửi tới ${email}`);
  };  