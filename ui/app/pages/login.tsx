import { NextPage } from "next"
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import { Toast, ToastType } from "../components/alerts/Toast";
import Api from "../config/Api";
import { useUserContext } from "../contexts/userContext";
import { validateEmail } from "../lib/validate";

const Login: NextPage = () => {

    const { signInWithEmail }: any = useUserContext()

    const handleLogin = () => {
        // get values from input fields
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        // check if values are empty
        if (email.value === "" || password.value === "") {
            Toast("Bitte alle Felder ausfüllen!", ToastType.warning);
            document.getElementById("email")?.focus();
            return;
        }

        if (!validateEmail(email.value)) {
            Toast("Bitte valide Email Adresse eingeben!", ToastType.warning);
            return;
        }

        // login
        signInWithEmail(email.value, password.value, false)
    }

    // if enter is pressed, login
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mx-auto h-12 w-auto"
                    src="/images/logo/logo_colored_primary.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Backend Login</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Verwalte{' '}
                    <span className="font-medium text-blue-500 hover:text-blue-600">
                        den Fahrzeugpark.{' '}
                    </span><br />
                    Alles andere kannst du <a href={Api.getUri() + "/_/"} className="font-medium text-blue-500 hover:text-blue-600">hier</a> verwalten.
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Passwort
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleLogin}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
