"use client";  // Important

import { useRouter } from "next/navigation";
import Image from "next/image";

export const Footer = () => {
    const router = useRouter();

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white text-gray-900 py-3 flex justify-around items-center border-t border-gray-300 z-50">
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/learn")}>
                <Image src="/learn.svg" alt="Home" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/leaderboard")}>
                <Image src="/leaderboard.svg" alt="Courses" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/quests")}>
                <Image src="/quests.svg" alt="Achievements" width={38} height={38} className="w-10 h-10" />
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => router.push("/shop")}>
                <Image src="/shop.svg" alt="Profile" width={38} height={38} className="w-10 h-10" />
            </button>
        </footer>
    );
};
