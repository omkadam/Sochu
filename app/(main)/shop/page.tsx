import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress"
import { getUserProgress } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Items } from "./items"
import Checkout from "@/components/payment-button";


const ShopPage = async () => {
    const userProgressData = getUserProgress()
    const [
        userProgress
    ] = await Promise.all([
        userProgressData,
    ])
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses")
    }
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false}/>
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="https://d16ho1g3lqitul.cloudfront.net/shopv2.svg" alt="Shop" height={90} width={90}/>
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend you points on cool stuff
                    </p>
                    <Items hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false}/>
                    {/* <Checkout /> */}
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ShopPage