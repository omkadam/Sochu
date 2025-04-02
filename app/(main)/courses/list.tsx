"use client"

import { courses, userProgress } from "@/db/schema"
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
// import Razorpay from "razorpay";


type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

export const List = ({courses,activeCourseId}:Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition()
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          if (window.Razorpay) {
            resolve(true);
            return;
          }
      
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
      const { userId } = useAuth(); // From Clerk hooks
    // const onClick = async (id: number) => {
        
    //     if (!userId) {
    //       toast.error("Please log in first");
    //       return;
    //     }
    //     if (pending) return;
    //     if (id === activeCourseId) {
    //         return router.push("/learn");
    //     }
    
    //     // ✅ Ensure Razorpay script is loaded
    //     const scriptLoaded = await loadRazorpayScript();
    //     if (!scriptLoaded) {
    //         toast.error("Razorpay script failed to load");
    //         return;
    //     }
    
    //     if (typeof window === "undefined" || !window.Razorpay) {
    //         toast.error("Razorpay is not available");
    //         return;
    //     }
    
    //     // ✅ Fetch Order ID from Backend
    //     const res = await fetch("/api/payment", {
    //         method: "POST",
    //         body: JSON.stringify({ courseId: id }),
    //         headers: { "Content-Type": "application/json" },
    //     });
    //     console.log(res)
    
    //     const { orderId } = await res.json();
    
    //     // ✅ Razorpay Payment Options
    //     const options = {
    //         key: "rzp_test_0GQ7Gs8p4JjT50", // Use env variable
    //         amount: 10000, // Amount in paisa (500 INR)
    //         currency: "INR",
    //         name: "Sochu Courses",
    //         description: "Buy Course",
    //         order_id: orderId,
    //         handler: async function (response: any) {
    //             startTransition(() => {
    //                 upsertUserProgress(id)
    //                     .catch(() => toast.error("Something went wrong"));
    //             });
    //         },
    //         prefill: {
    //             email: "om.vkadam13@gmail.com",
    //             contact: "7057508057",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    
    //     // ✅ Now Razorpay should work
    //     console.log("orderID recieved", orderId)
    //     const rzp = new window.Razorpay(options);
    //     rzp.open();
    // };
    const onClick = (id: number) => {
        if(pending) return
        if(id===activeCourseId){
            return router.push("/learn")
        }
        startTransition(() => {
            upsertUserProgress(id)
                .catch(() => toast.error("Something went wrong"))
        })
    }
    
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={onClick} disabled={pending} active={course.id === activeCourseId}/>
            ))}
        </div>
    )
}