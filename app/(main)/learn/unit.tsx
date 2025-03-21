"use client"; // Add this at the top!

import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { useEffect, useRef } from "react";

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
      <div className="flex items-center flex-col relative pb-50 z-10 pt-40">
        {lessons.map((lesson, index) => {
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
        })}
      </div>
    </>
  );
};
