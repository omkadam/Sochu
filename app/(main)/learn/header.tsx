import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getUserProgress } from "@/db/queries"; // adjust path

type Props = {
  title: string;
};

export const Header = async ({ title }: Props) => {
  const data = await getUserProgress(); // Direct server function call
  const points = data?.points || 0;
  const hearts = data?.hearts || 0;

  return (
    <div className="fixed top-0 bg-white pb-4 pt-5 lg:pt-[36px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 z-[100] px-4 w-full left-2 sm:left-4 right-10">
      {/* Back Button and Flag */}
      <div className="flex items-center space-x-6 sm:space-x-10 lg:space-x-14">
        <Link href="/courses">
          <Button variant="default" size="sm">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>

        {/* India Flag */}
        <div>
          <Image
            src="https://d16ho1g3lqitul.cloudfront.net/india.svg"
            alt="India Flag"
            width={24}
            height={16}
            className="w-[24px] h-[16px] sm:w-[32px] sm:h-[20px]"
          />
        </div>
      </div>

      {/* User Progress */}
      <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-10 pr-4">
        {/* Points */}
        <div className="flex items-center space-x-1">
          <Image
            src="https://d16ho1g3lqitul.cloudfront.net/points.svg"
            alt="Points"
            width={20}
            height={20}
            className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
          />
          <span className="text-blue-500 font-bold text-sm sm:text-base">{points}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center space-x-1">
          <Image
            src="https://d16ho1g3lqitul.cloudfront.net/heart.svg"
            alt="Hearts"
            width={20}
            height={20}
            className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
          />
          <span className="text-red-500 font-bold text-sm sm:text-base">{hearts}</span>
        </div>
      </div>
    </div>
  );
};
