"use client";

import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { useEffect, useRef, useState } from "react";

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
  const [showLessons, setShowLessons] = useState(false); // 👉 Add state to control visibility

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

  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative pb-50 z-10 pt-50">
        {/* Button */}
        <button
          onClick={() => setShowLessons(true)} // 👉 On click, show lessons
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Read the book first
        </button>

        {/* Lessons */}
        {showLessons && ( // 👉 Show only if state is true
          lessons.map((lesson, index) => {
            const isCurrent = lesson.id === activeLesson?.id;
            const isLocked = !lesson.completed && !isCurrent;
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
                  locked={isLocked}
                  percentage={activeLessonPercentage}
                />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
