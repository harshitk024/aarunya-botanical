import Razorpay from "razorpay";

console.log("Razorpay key ID: ",process.env.RAZORPAY_KEY_ID)
console.log("RazorPay key Secret: ",process.env.RAZORPAY_SECRET_KEY)

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})
