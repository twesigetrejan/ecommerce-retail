import { login, signup } from "./actions"



export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className=" w-1/2 shadow-xl border rounded-sm flex mt-4 h-[450px]">
                <div className="left side w-1/2 flex flex-col items-center justify-center text-green-500 bg-gray-200">Do not have an account! <button formAction={signup} className="hover:scale-105">Sign up</button></div>
                <form className="flex flex-col gap-4 w-1/2 justify-center bg-green-500 relative">
                    <p className="absolute top-10 left-18 text-gray-300 text-wrap">LocalBiz welcomes you back</p>
                    <label htmlFor="email" className="px-6 text-gray-200">email</label>
                    <input id="email" name="email" type="email" required className="mx-6 text-center" />
                    <label htmlFor="password" className="px-6 text-gray-200">password</label>
                    <input id="password" name="password" type="password" required className="mx-6 text-center" />
                    <div className=" flex justify-center">
                        <button formAction={login} className="mr-6 px-1 bg-gray-200 hover:scale-105">Log in</button>
                    </div>

                </form>
            </div>

        </div>
    )
}