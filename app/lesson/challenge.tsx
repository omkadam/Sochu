"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  challengeId: number;
  userId: string; // 👈 Pass userId as prop
  customInput: string;
  setCustomInput: (value: string) => void;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  challengeId,
  userId,
  customInput,
  setCustomInput,
}: Props) => {

  // 1️⃣ Custom answer state
  const [customAnswer, setCustomAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 2️⃣ Submit handler
  const handleSubmit = async () => {
    if (customAnswer.trim() === "") return;
    setLoading(true);
    try {
      const res = await fetch("/api/custom-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          challengeId,
          answerText: customAnswer,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setCustomAnswer(""); // clear textbox
      }
    } catch (error) {
      console.error("Error submitting custom answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}

      {/* Custom answer section */}
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="font-semibold">Write your custom answer</h1>
        <input
      type="text"
      value={customAnswer}
      onChange={(e) => {
        setCustomAnswer(e.target.value);
        setCustomInput(e.target.value); // 👈 propagate value to parent
      }}
      className="border p-2 rounded-md"
      placeholder="Type your answer..."
      disabled={disabled}
    />
        <Button
          variant={"danger"}
          onClick={handleSubmit}
          disabled={loading || customAnswer.trim() === ""}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        {success && (
          <p className="text-green-600 font-medium">Answer submitted!</p>
        )}
      </div>
    </div>
  );
};
