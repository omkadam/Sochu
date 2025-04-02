
"use client";

import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import router

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  const lessonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showLessons, setShowLessons] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter(); // Router for redirection

  // 👉 Check local storage on mount
  useEffect(() => {
    const clicked = localStorage.getItem(`unit-${id}-clicked`);
    if (clicked === "true") {
      setShowLessons(true);
      setButtonClicked(true);
    }
  }, [id]);

  // 👉 Scroll to active lesson
  useEffect(() => {
    if (!activeLesson) return;
    const index = lessons.findIndex(
      (lesson) => lesson.id === activeLesson.id
    );
    if (index !== -1 && lessonRefs.current[index]) {
      lessonRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLesson, lessons]);

  // 👉 Handle button click
  const handleButtonClick = () => {
    if (!buttonClicked) {
      // First time clicked
      setShowLessons(true);
      setButtonClicked(true);
      localStorage.setItem(`unit-${id}-clicked`, "true");
      router.push("http://13.233.10.17:4000/reader");
    } else {
      // Already clicked → redirect
      router.push("http://13.233.10.17:4000/reader");
    }
  };
  

  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative pb-50 z-10 pt-50">      
        {/* Button Always Visible */}
        <div className="flex flex-col items-center mb-4">
  <div className="relative flex justify-center top-3.5">
    
    {/* 🔥 BOUNCE TEXT TAG LIKE "START" */}
    {!buttonClicked && (
      <div className="absolute  left-1/2 -translate-x-1/2 px-2 py-2.5 border-2 font-bold uppercase text-[#009aef] bg-white rounded-xl animate-bounce tracking-wide z-10 whitespace-nowrap text-sm">
      Read Book
      <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
      </div>
    )}

    <div
      className="relative"
      style={{
        marginTop: 60,
      }}
    >
      <button
        onClick={handleButtonClick}
        className="h-[70px] w-[70px] border-b-8  bg-green-500 rounded-full flex items-center justify-center shadow-md"
        style={{
          borderBottomColor: '#16a34a', // same as blue-500
          borderBottomWidth: '8px',
        }}
      >
        <img
          src="https://d16ho1g3lqitul.cloudfront.net/Book-2.svg"
          alt="Heart Icon"
          width={50}
          height={50}
          className="pointer-events-none"
        />
      </button>
    </div>
  </div>

  {/* <p className="mt-2 text-blue-500 font-semibold text-sm">
    {buttonClicked ? "Read Book" : "Read the book first"}
  </p> */}
</div>


        {/* Lessons */}
        {showLessons &&
          lessons.map((lesson, index) => {
            // agar lesson ka id active lessonId ke barabar hoo gaya toh ye current lesson hai
            const isCurrent = lesson.id === activeLesson?.id;
            // index === 0 isliye kyu ki 1st wala humesha open rahega
            const previousLessonCompleted = index === 0 || lessons[index - 1].completed;
            return (
              <div
                key={lesson.id}
                ref={(el) => {
                  lessonRefs.current[index] = el;
                }}
              >
                <LessonButton
                
                  id={lesson.id}
                  index={index}
                  totalCount={lessons.length - 1}
                  current={isCurrent}
                  locked={!previousLessonCompleted}
                  percentage={activeLessonPercentage}
                  
                />
              </div>
            );
        })}
      </div>
    </>
  );
};
