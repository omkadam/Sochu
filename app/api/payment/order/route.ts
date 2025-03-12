import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json(); // Frontend se amount aayega

        const options = {
            amount: amount * 100, // Convert ₹ to paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1, // Auto-capture payment
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
