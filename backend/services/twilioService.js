const twilio = require("twilio")

let twilioClient = null

// Initialize Twilio client if credentials are provided
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}

const sendOTP = async (mobileNumber, otp) => {
  if (!twilioClient) {
    throw new Error("Twilio not configured")
  }

  try {
    const message = await twilioClient.messages.create({
      body: `Your Document Management System OTP is: ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_FROM_NUMBER,
      to: mobileNumber,
    })

    console.log(`OTP sent successfully. Message SID: ${message.sid}`)
    return message
  } catch (error) {
    console.error("Twilio send error:", error)
    throw error
  }
}

module.exports = {
  sendOTP,
  isConfigured: !!twilioClient,
}
