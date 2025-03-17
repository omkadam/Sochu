"use client";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({ id, index, totalCount, locked, current, percentage }: Props) => {
  const amplitude = 60; // **Curve Height Control**
  const frequency = Math.PI / 3; // **Curve Smoothness Control**
  const rightPosition = Math.sin(index * frequency) * amplitude; // ✅ **Curve As-Is Rakha**

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // ✅ **Lesson Icon Selection**
  const iconSrc = isCompleted
    ? "https://d16ho1g3lqitul.cloudfront.net/done2.svg"
    : isLast
    ? "https://d16ho1g3lqitul.cloudfront.net/crown2.svg"
    : "https://d16ho1g3lqitul.cloudfront.net/star2.svg";

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  // ✅ **Extra Image Logic** (Har 3rd Lesson Ke Baad)
  const showExtraImage = (index + 1) % 3 === 0;
  const isOdd = index % 2 !== 0; // ✅ **Odd Left, Even Right**

  return (
    
    <div className="relative flex justify-center">
      <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? "none" : "auto" }}>
        <div
          className="relative"
          style={{
            right: `${rightPosition}px`, // ✅ **Curve As-Is**
            marginTop: isFirst && !isCompleted ? 60 : 24,
          }}
        >
          {current ? (
            <div className="h-[102px] w-[102px] relative">
              <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-[#009aef] bg-white rounded-xl animate-bounce tracking-wide z-10">
                Start
                <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
              </div>
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: { stroke: "#4ade80" },
                  trail: { stroke: "#e5e7eb" },
                }}
              >
                <Button
                  size="rounded"
                  variant={locked ? "locked" : "lessonButtonsbhai"}
                  className="h-[70px] w-[70px] border-b-8"
                >
                  <Image src={iconSrc} alt="Lesson Icon" width={50} height={50} />
                </Button>
              </CircularProgressbarWithChildren>
            </div>
          ) : (
            <Button
              size="rounded"
              variant={locked ? "locked" : "lessonButtonsbhai2"}
              className="h-[70px] w-[70px] border-b-8"
            >
              <Image src={iconSrc} alt="Lesson Icon" width={50} height={50} />
            </Button>
          )}
        </div>
      </Link>

      {/* ✅ **Extra Image Left-Right Properly Adjusted** */}
      {showExtraImage && (
        <div
          className={cn(
            "absolute transform",
            isOdd
              ? "left-[-120px] sm:left-[-80px] top-[-90px] sm:top-[10px]" // ✅ **Odd → Aur Left Kiya**
              : "right-[-120px] sm:right-[-80px] top-[-90px] sm:top-[10px]" // ✅ **Even → Aur Right Kiya**
          )}
        >
          <Image
            src="https://d16ho1g3lqitul.cloudfront.net/sochuloop.gif"
            alt="Extra Icon"
            width={150}
            height={150}
            className="sm:w-[30px] sm:h-[30px]" // ✅ **Mobile Ke Liye Chhota Kiya**
          />
        </div>
      )}
    </div>
  );
};