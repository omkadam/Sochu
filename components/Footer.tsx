"use client";  // Important

import { useRouter } from "next/navigation";
import Image from "next/image";

export const Footer = () => {
    const router = useRouter();

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white text-gray-900 py-3 flex justify-around items-center border-t border-gray-300 z-50">
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/learn")}>
                <Image src="https://d16ho1g3lqitul.cloudfront.net/homev2.svg" alt="Home" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/leaderboard")}>
                <Image src="https://d16ho1g3lqitul.cloudfront.net/leaderboardv2.svg" alt="Courses" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/quests")}>
                <Image src="https://d16ho1g3lqitul.cloudfront.net/questsv2.svg" alt="Achievements" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/shop")}>
                <Image src="https://d16ho1g3lqitul.cloudfront.net/shopv2.svg" alt="Profile" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/set")}>
            <Image src="https://d16ho1g3lqitul.cloudfront.net/settingsv2.svg" alt="Profile" width={38} height={38} className="w-10 h-10" />
            </button>
        </footer>
    );
};
