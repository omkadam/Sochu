import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import Image from "next/image"; // Import Next.js Image component
import { Footer } from "@/components/Footer";


const LearnPage = async () => {
    
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();

    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
        userProgressData, unitsData, courseProgressData, lessonPercentageData
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Main Content */}
            <div className="flex flex-row-reverse gap-[48px] px-6 flex-grow overflow-auto">
                <StickyWrapper>
                    <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false} />
                </StickyWrapper>
                <FeedWrapper className="mb-16">
                    <Header title={userProgress.activeCourse.title} />
                    {units.map((unit) => (
                        <div key={unit.id} className="mb-10">
                            <Unit 
                                id={unit.id} 
                                order={unit.order} 
                                description={unit.description} 
                                title={unit.title} 
                                lessons={unit.lessons} 
                                activeLesson={courseProgress.activeLesson} 
                                activeLessonPercentage={lessonPercentage}
                            />
                        </div>
                    ))}
                </FeedWrapper>
            </div>

            {/* Fixed Footer */}
            <Footer />
        </div>
    );
};

export default LearnPage;
