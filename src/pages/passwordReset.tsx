import { useState } from 'react';
import { requestPasswordReset, resetPassword } from '../utils/passwordAPI';

const PasswordReset = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState<boolean>(false);

  // Step 1: Send OTP
  const handlePasswordResetRequest = async () => {
    if (!email) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await requestPasswordReset(email);

      if (response.status === 200) {
        setIsOtpSent(true); // OTP sent successfully
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async () => {
    if (!otp || !newPassword || !email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await resetPassword(otp, newPassword, email);

      if (response.status === 200) {
        setIsResetSuccessful(true);
      } else {
        setErrorMessage('Failed to reset password. Please try again.');
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Password Reset</h2>

        {/* Step 1: Request OTP */}
        {!isOtpSent ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Enter your email to receive OTP</h3>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handlePasswordResetRequest}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        ) : !isResetSuccessful ? (
          // Step 2: Enter OTP + New Password
          <div>
            <h3 className="text-lg font-medium mb-4">Enter OTP and new password</h3>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-100"
              value={email}
              readOnly
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>
        ) : (
          // Step 3: Success message
          <div className="text-center">
            <p className="text-green-500 text-lg font-medium mb-4">Password reset successful!</p>
            <a href="/login" className="text-yellow-600 underline">
              Click here to login
            </a>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

        {/* OTP Sent Notification */}
        {isOtpSent && !errorMessage && !isResetSuccessful && (
          <p className="text-green-500 text-center mt-4">
            OTP sent successfully. Please check your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
