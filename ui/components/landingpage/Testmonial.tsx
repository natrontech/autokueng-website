import { useEffect, useState } from 'react'
import { MemberInterface } from "../../lib/interfaces";
import { ClientResponseError } from 'pocketbase';
import { useUserContext } from "../../contexts/userContext";
import { parseImageUrl } from "../../lib/parser";
import Link from 'next/link';

interface Props {
    members: MemberInterface[];
}

const Testmonial = (props: Props) => {

    const [randomMember, setRandomMember] = useState<MemberInterface>();

    useEffect(() => {
        if (props.members) {
            const random = Math.floor(Math.random() * props.members?.length);
            setRandomMember(props.members[random]);
        }

    }, [props])

    const quotes: string[] = [
        "Man muss nicht das Rad neu erfinden, sondern wissen, wie man es dreht",
        "Wir sind ein Team, das sich gegenseitig unterstützt",
        "Mit uns fahren Sie sicher",
    ]

    const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];

    return randomMember ? (
        <section className="py-12  overflow-hidden md:py-20 lg:py-24">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <svg
                    className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    role="img"
                    aria-labelledby="svg-workcation"
                >
                    <defs>
                        <pattern
                            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
                </svg>

                <div className="relative">
                    <blockquote className="mt-10">
                        <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                            <p>
                                &ldquo;{randomQuote}&rdquo;
                            </p>
                        </div>
                        <footer className="mt-8">
                            <div className="md:flex md:items-center md:justify-center">
                                <div className="md:flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="mx-auto h-10 w-10 rounded-full object-cover shadow-lg"
                                        src={parseImageUrl(randomMember)}
                                        alt=""
                                    />
                                </div>
                                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                                    <Link href={`/firma`}>
                                        <div className="text-base font-medium text-gray-900 cursor-pointer">{randomMember?.name}</div>
                                    </Link>

                                    <svg className="hidden md:block mx-1 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11 0h3L9 20H6l5-20z" />
                                    </svg>

                                    <div className="text-base font-medium text-gray-500">{randomMember?.role}</div>
                                </div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    ) : <></>
}

export default Testmonial;
