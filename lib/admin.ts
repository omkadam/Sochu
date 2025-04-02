import { auth } from "@clerk/nextjs/server"



export const isAdmin = async () => {
    const {userId} = await auth();

    return userId === "user_2uw7b06eeZDAKs6NTpfUOgTMJji"
}