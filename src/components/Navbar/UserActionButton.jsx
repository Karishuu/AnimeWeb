import Link from "next/link"
import  authUserSession  from "@/libs/auth-libs"


const UserActionButton = async() => {
    const user =  authUserSession;

    const actionLabel = user ? "Sign Out" : "Sign In"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"
    return (
        <div className="flex justify-between gap-4">
            {
                user ? <Link href="/users/dashboard" className="py-1">Dashboard</Link> : null
            }
            <Link href={actionURL} className="rounded  bg-color-dark py-1 p-2 text-color-accent shadow-xl ">{actionLabel}</Link>
        </div>
    )
}
export default UserActionButton