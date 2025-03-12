import { getCourses, getUserProgress } from "@/db/queries"
import { List } from "./list"
import Image from "next/image"

const CoursesPage = async () => {
    const coursesData =  getCourses()
    const userProgressData =  getUserProgress()

    const [
        courses,
        userProgress
    ] = await Promise.all([
        coursesData,
        userProgressData
    ])
    
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <div className="flex items-center justify-center gap-4">
                <Image src="/newlogo1.jpeg" height={300} width={300} alt="Sochu" className="rounded-lg object-cover"/>
            </div>                                  
            {/* <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1> */}
            <List courses={courses} activeCourseId={userProgress?.activeCourseId}/>
        </div>
    )
}

export default CoursesPage