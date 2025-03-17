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
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50 px-4">
      {/* Back Button and Flag */}
      <div className="flex items-center space-x-4"> {/* <-- Added space-x-4 here */}
        <Link href="/courses">
          <Button variant="default" size="sm">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>

        {/* India Flag */}
        <div>
          <Image src="https://d16ho1g3lqitul.cloudfront.net/india.svg" alt="India Flag" width={32} height={20} />
        </div>
      </div>

      {/* User Progress */}
      <div className="flex items-center space-x-10">
        {/* Points */}
        <div className="flex items-center space-x-1">
          <Image src="https://d16ho1g3lqitul.cloudfront.net/points.svg" alt="Points" width={24} height={24} />
          <span className="text-blue-500 font-bold">{points}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center space-x-1">
          <Image src="https://d16ho1g3lqitul.cloudfront.net/heart.svg" alt="Hearts" width={24} height={24} />
          <span className="text-red-500 font-bold">{hearts}</span>
        </div>
      </div>
    </div>
  );
};
