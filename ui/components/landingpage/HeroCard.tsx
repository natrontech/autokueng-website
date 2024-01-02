import React, { useEffect, useState } from "react"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../lib/design";
import Link from "next/link";

const  HeroCard = ({ data }: any) => {
    const [show, setShow] = useState(false);
    function showOpenDoors() {
        setShow(!show);
    }

    return (
        <div className="relative -mt-6 z-20">
            <div className="absolute inset-x-0 bottom-0 h-1/2" />
            <div className=" ">
                <div className="relative shadow-xl">
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="h-full w-full object-cover"
                            src="/images/background/background_old.jpg"
                            alt="Autoküng AG Foto"
                        />
                        <div className="absolute inset-0 bg-blue-300 mix-blend-multiply" />
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">Auto Küng AG</span>
                        </h1>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <Popover className="relative">
                                    <a
                                        onClick={showOpenDoors}
                                        className="cursor-pointer flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-500 bg-white sm:hover:bg-blue-50 sm:px-8"
                                    >
                                        Öffnungszeiten
                                        <ChevronDownIcon
                                            className={classNames(show ? 'text-gray-500 rotate-180' : 'text-blue-500', 'h-5 w-5')} aria-hidden="true"
                                        />
                                    </a>

                                    <Transition
                                        show={show}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            style={{
                                                display: show ? "block" : "none"
                                            }}
                                            className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                                        >
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-8">
                                                    <p className="p-2">
                                                        <span className="font-bold">Montag bis Freitag:</span>
                                                        <br />
                                                        GESCHLOSSEN
                                                    </p>
                                                    <p className="p-2">
                                                        <span className="font-bold">Samstag</span>
                                                        <br />
                                                        GESCHLOSSEN
                                                    </p>
                                                    <p className="p-2">
                                                        <span className="font-bold">Sonntag</span>
                                                        <br />
                                                        GESCHLOSSEN
                                                    </p>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                                {/* eslint-disable-next-line */}
                                <a
                                    href="/kontakt"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 bg-opacity-80 sm:hover:bg-opacity-90 sm:px-8"
                                >
                                    Kontakt
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeroCard
