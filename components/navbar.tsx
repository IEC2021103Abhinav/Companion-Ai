"use client";


import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

// cn import is seperate from the global one 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toogle";
import { MobileSidebar } from "./ui/mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";


const font = Poppins({
    weight: "600",
    subsets: ["latin"]
});

interface NavBarProps {
    isPro: boolean,
}

export const Navbar = ({
    isPro
}: NavBarProps) => {
    const proModal = useProModal();
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                {/* <Menu className="block md:hidden" /> */}
                <MobileSidebar isPro={isPro}/>
                <Link href="/">
                    <h1 className={cn("hidden md:block text-xl  md:text-3xl font-bold text-primary",
                        font.className    // dynamic classname
                    )}>
                        companion.ai
                    </h1>
                </Link>
            </div>
            <div className=" flex items- center gap-x-3">
                {!isPro && (
                    <Button variant="premiuim" size="sm" onClick={proModal.onOpen}>
                        Upgrade
                        <Sparkles className="h-4 w-4 fill-white text-white" />
                    </Button>
                )}
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>

    );
}