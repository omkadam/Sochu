"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/payment/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 100 }), // ₹100 ka payment
            });

            const order = await res.json();

            if (!order.id) throw new Error("Order creation failed");

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Sochu",
                description: "One-time Purchase",
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment Successful ✅");
                    } else {                       
                        alert("Payment Failed ❌");
                    }
                },
                prefill: {
                    email: "user@example.com",
                    contact: "9999999999",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed");
        }
        setLoading(false);
    };

    return <Button onClick={handlePayment} disabled={loading}>Upgrade</Button>;
};

export default Checkout;
