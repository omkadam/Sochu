"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
    title: string;
    description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
    const openReaderApp = () => {
        window.open("http://192.168.1.71:3000/reader", "_self");
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full rounded-xl bg-[#009aef] p-5 text-white flex items-center justify-between border-b-4 border-[#1175c9]">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
            <Link href="/lesson">
                <Button size="lg" variant="secondary" className="hidden xl:flex border-2 border-b-4 active:border-b-2">
                    <NotebookText className="mr-2" />
                    Continue
                </Button>
            </Link>

            {/* Smooth Popup Animation (Opens from Center) */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <NotebookText
                        height={"50px"}
                        width={"50px"}
                        className="cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    />
                </DialogTrigger>
                <DialogContent className="max-w-[90%] sm:max-w-[80%] md:max-w-[60%] bg-white rounded-lg p-5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "0%" }}
                        exit={{ opacity: 0, scale: 0.8, y: "-50%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="max-h-[80vh] overflow-y-auto p-4"
                    >
                        <img
                            src="/sochupopup.jpeg"
                            alt="Popup Image"
                            className="w-full h-auto rounded-lg"
                        />
                        <p className="mt-4 text-lg text-gray-800">
                            Series 1 - Book 1 <br /> Think Outside The Box
                        </p>
                        <p className="mt-4 text-gray-700 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
                            Curabitur porta justo nec sem vehicula, id posuere dolor fermentum. Sed ut turpis nisi. 
                            Nullam vehicula.
                        </p>
                        <Button className="mt-4 w-full" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
