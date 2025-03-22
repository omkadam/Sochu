
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
    } else {
      // Already clicked → redirect
      router.push("http://192.168.1.50:3000/xyz");
    }
  };

  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative pb-50 z-10 pt-50">
        {/* Button Always Visible */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="/heart.svg"
            alt="Crown"
            className="w-20 h-20 mb-4 animate-bounce"
          />
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {buttonClicked ? "Read Book" : "Read the book first"}
          </button>
        </div>

        {/* Lessons */}
        {showLessons &&
          lessons.map((lesson, index) => {
            const isCurrent = lesson.id === activeLesson?.id;
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
                  locked={false} // 👈 Always unlocked once button clicked
                  percentage={activeLessonPercentage}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};
