"use client"
import { Button } from "@/components/ui/button";
import { NotebookText, UsersRound } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string
}

export const UnitBanner = ({title,description}:Props) => {
    const openReaderApp = () => {
        window.open("http://192.168.1.71:3000/reader", "_self"); // Opens in a new tab
    };
    return (
        <div className="w-full rounded-xl bg-[#009aef] p-5 text-white flex items-center justify-between border-b-4 border-[#1175c9]">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
                <p className="text-lg">
                    {description}
                </p>
            </div>
            <Link href="/lesson">
                <Button size="lg" variant="secondary" className="hidden xl:flex border-2 border-b-4 active:border-b-2">
                    <NotebookText className="mr-2"/>
                    Continue
                </Button>
            </Link>
            {/* <Button onClick={openReaderApp}>
                Read
            </Button> */}
            <NotebookText height={"50px"} width={"50px"} onClick={openReaderApp}/>
            {/* <UsersRound height={"50px"} width={"50px"}/> */}
            
        </div>
        
    )
}