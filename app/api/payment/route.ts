import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    const { courseId } = await req.json();

    var instance = new Razorpay({
        key_id: "rzp_test_0GQ7Gs8p4JjT50",
        key_secret: "E7P0J7m3Vpw5zToODm1Uh8Xn",
    });

    var options = {
        amount: 10000, // 500 INR in paisa
        currency: "INR",
        receipt: `order_rcptid_${courseId}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({ orderId: order.id });
}
