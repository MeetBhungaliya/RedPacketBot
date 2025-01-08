export default {
  custom_message: { code: 200, message: 'custom message' },
  user_create_success: {
    code: 200,
    message: 'Congratulations!! You have been registered successfully.'
  },
  login_otp_success: {
    code: 205,
    message: 'Verification OTP sent to your registered mobile number.'
  },
  already_exists_username: {
    code: 409,
    message: 'This username is already taken try another.'
  },
  user_not_found: {
    code: 404,
    message: "Sorry, we didn't find any account with that Email id/Mobile number"
  },
  user_deleted: {
    code: 419,
    message: 'Your account is deleted please contact to the support'
  }
}
