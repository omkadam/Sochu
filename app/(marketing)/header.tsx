import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Image from "next/image"
export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg max-auto flex items-center justify-between h-full ">
                {/* create an area for our logo here */}
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    {/* <Image src="/newlogo1.jpeg" height={100} width={100} alt="Sochu"/>  */}
                    {/* <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Sochu</h1> */}
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl="/learn" signUpForceRedirectUrl="/learn" >
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>

        </header>
    )
}

// insted of exporting this Header as default lets export it directly because this is a component not a page and i prefers names to export when it comes to components
