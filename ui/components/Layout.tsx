import React from "react";
import { useUserContext } from "../contexts/userContext";
import { classNames } from "../lib/design";
import Footer from "./Footer";
import Loading from "./Loading";
import Navigation from "./Navigation";

export default function Layout(props: any) {

    const { loading }: any = useUserContext();

    return (
        <div className="flex flex-col h-screen">
            <Navigation />

            <main className="flex-1 mt-20">
                {React.cloneElement(props.children)}
            </main>

            <Footer />

            {
                loading ? <Loading /> : null
            }
        </div>
    )
}
