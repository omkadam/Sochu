"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import Confetti from 'react-confetti'
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useUser } from "@clerk/nextjs";


type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
        allowCustomAnswer?: boolean;
    })[];
    userSubscription: any;
    
}



export const Quiz = ({initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, userSubscription}: Props) => {

    const { user } = useUser();

    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if(initialPercentage === 100) {
            openPracticeModal()
        }
    })


    const { width, height } = useWindowSize();
    const router = useRouter()
    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true })
    const [
        correctAudio,
        _c,
        correctControls
    ] = useAudio({ src: "/correct.wav" })
    const [
        incorrectAudio,
        _i,
        incorrectControls
    ] = useAudio({ src: "/incorrect.wav" })
    const [pending, startTransition] = useTransition()
    const [customInput, setCustomInput] = useState<string>("")
    const [lessonId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    })
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })

    const [selectedOption, setSelectedOption] = useState<number>()
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex]
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current+1)
    }

    const onSelect = (id: number) => {
        if(status !== "none") return
        setSelectedOption(id)
    }

    const onContinue = () => {
        if (!selectedOption && customInput.trim() === "") return;
      
        // Agar status wrong hai, reset karo
        if (status === "wrong") {
          setStatus("none");
          setSelectedOption(undefined);
          setCustomInput("");  // reset custom input too
          return;
        }
        if (status === "correct") {
          onNext();
          setStatus("none");
          setSelectedOption(undefined);
          setCustomInput("");  // reset custom input
          return;
        }
      
        // ✅ If user selected option:
        if (selectedOption) {
          const correctOptionIds = options
            .filter((option) => option.correct)
            .map((o) => o.id);
      
          if (correctOptionIds.includes(selectedOption)) {
            // Correct Option
            startTransition(() => {
              upsertChallengeProgress(challenge.id)
                .then((response) => {
                  if (response?.error === "hearts") {
                    openHeartsModal();
                    return;
                  }
                  correctControls.play();
                  setStatus("correct");
                  setPercentage((prev) => prev + 100 / challenges.length);
      
                  if (initialPercentage === 100) {
                    setHearts((prev) => Math.min(prev + 1, 5));
                  }
                })
                .catch(() => toast.error("Something went wrong, please try again."));
            });
          } else {
            // Wrong Option
            startTransition(() => {
              reduceHearts(challenge.id)
                .then((response) => {
                  if (response?.error === "hearts") {
                    openHeartsModal();
                    return;
                  }
                  incorrectControls.play();
                  setStatus("wrong");
      
                  if (!response?.error) {
                    setHearts((prev) => Math.max(prev - 1, 0));
                  }
                })
                .catch(() => toast.error("Something went wrong please try again"));
            });
          }
        }
      
        // ✅ If user typed custom input
        if (customInput.trim() !== "") {
          startTransition(() => {
            fetch("/api/custom-answer", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user?.id ?? "",
                challengeId: challenge.id,
                answerText: customInput.trim(),
              }),
            })
              .then((res) => {
                if (res.ok) {
                  correctControls.play();
                  setStatus("correct");
                  setPercentage((prev) => prev + 100 / challenges.length);
                  if (initialPercentage === 100) {
                    setHearts((prev) => Math.min(prev + 1, 5));
                  }
                } else {
                  // Agar API fail hui toh wrong bhi dikha sakte ho
                  incorrectControls.play();
                  setStatus("wrong");
                }
              })
              .catch(() => toast.error("Something went wrong, please try again."));
          });
        }
      };
      
                

    if(!challenge){
        return (
            <>
                {finishAudio}
                <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000}/>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/finish.svg" alt="Finish" className="hidden lg:block" height={100} width={100} />
                    <Image src="/finish.svg" alt="Finish" className="block lg:hidden" height={50} width={50} />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br /> You&apos;ve completed the lesson
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard variant="points" value={challenges.length * 10}/>
                        <ResultCard variant="hearts" value={hearts}/>

                    </div>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")}/>
            </>
        )
    }

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive}/>
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                            {/* <img src={challenge.imageUrl ?? undefined} alt="Question Image" /> */}
                            {challenge.imageUrl && (
                                <img src={challenge.imageUrl} alt="Question Image" />
                            )}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question}/>
                            )}
                            <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disabled={pending} type={challenge.type} challengeId={challenge.id} userId={user?.id ?? ""} customInput={customInput} setCustomInput={setCustomInput} allowCustomAnswer={challenge.allowCustomAnswer}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer disabled={pending || (!selectedOption && customInput.trim() === "")} status={status} onCheck={onContinue}/>
        </>
    )
}