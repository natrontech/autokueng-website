import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Spinner } from "flowbite-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Api from "../../config/Api";
import { Toast, ToastType } from "../alerts/Toast";
import Heading from "../general/typo/Heading";

const ContactForm = () => {
    const [captchaCode, setCaptchaCode] = useState("");
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [loading, setLoading] = useState(false);

    const onReCAPTCHAChange = (captchaCode: string) => {
        if (!captchaCode) {
            return;
        }
        setCaptchaCode(captchaCode);
    }

    async function handleSubmit(event: any) {
        setLoading(true);
        event.preventDefault();

        const firstName: HTMLInputElement | null = firstNameRef.current;
        const lastName: HTMLInputElement | null = lastNameRef.current;
        const email: HTMLInputElement | null = emailRef.current;
        const phone: HTMLInputElement | null = phoneRef.current;
        const subject: HTMLInputElement | null = subjectRef.current;
        const message: HTMLTextAreaElement | null = messageRef.current;


        const body = {
            "firstname": firstName?.value,
            "lastname": lastName?.value,
            "email": email?.value,
            "phone": phone?.value,
            "subject": subject?.value,
            "message": message?.value,
            "g-recaptcha-response": captchaCode
        }

        Api.post('/api/contactmail', body)
            .then((response) => {
                console.log(response);
                Toast('Nachricht erfolgreich versendet!', ToastType.success);
            }).catch((error) => {
                Toast('Nachricht konnte nicht versendet werden!', ToastType.error);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
                <div className='hidden sm:block'>
                    <Heading title="KONTAKT" subtitle="" />
                </div>
                <div className="relative shadow-xl">

                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Contact information */}
                        <div className="relative overflow-hidden py-10 px-6 bg-blue-600 sm:px-10 xl:p-12">
                            <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    width={343}
                                    height={388}
                                    viewBox="0 0 343 388"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                                        fill="url(#linear1)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear1"
                                            x1="254.553"
                                            y1="107.554"
                                            x2="961.66"
                                            y2="814.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div
                                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                                aria-hidden="true"
                            >
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    width={359}
                                    height={339}
                                    viewBox="0 0 359 339"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                                        fill="url(#linear2)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear2"
                                            x1="192.553"
                                            y1="28.553"
                                            x2="899.66"
                                            y2="735.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div
                                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                                aria-hidden="true"
                            >
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    width={160}
                                    height={678}
                                    viewBox="0 0 160 678"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                                        fill="url(#linear3)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear3"
                                            x1="192.553"
                                            y1="325.553"
                                            x2="899.66"
                                            y2="1032.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-white">Kontakt Informationen</h3>
                            <p className="mt-6 text-base text-blue-50 max-w-3xl">
                                Zögern Sie nicht uns mit Ihrem Anliegen zu kontaktieren.
                            </p>
                            <dl className="mt-8 space-y-6">
                                <dt>
                                    <span className="sr-only">Telefonnummer</span>
                                </dt>
                                <dd className="flex text-base text-blue-50">
                                    <PhoneIcon className="flex-shrink-0 w-6 h-6 text-blue-200" aria-hidden="true" />
                                    <a href="tel:+41319585757" className='hover:text-gray-100'><span className="ml-3">031 958 57 57</span></a>
                                </dd>
                                <dt>
                                    <span className="sr-only">E-Mail</span>
                                </dt>
                                <dd className="flex text-base text-blue-50">
                                    <EnvelopeIcon className="flex-shrink-0 w-6 h-6 text-blue-200" aria-hidden="true" />
                                    <a href="mailto:info@autokueng.ch" className='hover:text-gray-100'><span className="ml-3">info@autokueng.ch</span></a>
                                </dd>
                            </dl>
                            <h3 className="text-lg font-medium text-white mt-10">Webdesigner</h3>

                            <dl className="mt-2 space-y-6">
                                <dd className="flex text-base text-blue-50">
                                    <a className="text-blue-200 hover:text-blue-100" href="https://github.com/janlauber">
                                        <span className="sr-only">GitHub</span>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                    <a className="text-blue-200 hover:text-blue-100" href="https://github.com/janlauber"><span className="ml-3">Jan Lauber</span></a>
                                </dd>
                            </dl>

                            <h3 className="text-lg font-medium text-white mt-10">&Ouml;ffnungszeiten</h3>

                            <dl className="mt-2 space-y-6">
                                <dd className="flex text-base text-blue-50">
                                    <div className="">
                                        <p className="font-thin">
                                            <span className="font-normal">Montag bis Freitag:</span>
                                            <br />
                                            GESCHLOSSEN
                                        </p>
                                        <p className="font-thin">
                                            <span className="font-normal">Samstag</span>
                                            <br />
                                            GESCHLOSSEN
                                        </p>
                                        <p className="font-thin">
                                            <span className="font-normal">Sonntag</span>
                                            <br />
                                            GESCHLOSSEN
                                        </p>
                                    </div>
                                </dd>
                            </dl>
                        </div>

                        {/* Contact form */}
                        <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                            <h3 className="text-lg font-medium text-gray-900">Senden Sie uns eine Nachricht</h3>
                            <form id="contact-form" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                        Vorname
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            ref={firstNameRef}
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                        Nachname
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            ref={lastNameRef}
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                        E-Mail
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            ref={emailRef}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                            Telefon
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            ref={phoneRef}
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            autoComplete="tel"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                                        Betreff
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            ref={subjectRef}
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="flex justify-between">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                            Nachricht
                                        </label>
                                        <span id="message-max" className="text-sm text-gray-500">
                                            Max. 500 Zeichen
                                        </span>
                                    </div>
                                    <div className="mt-1">
                                        <textarea
                                            ref={messageRef}
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                                            aria-describedby="message-max"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="mt-8">
                                        <ReCAPTCHA
                                            sitekey="6LcuuWUiAAAAANFHccE5ik2Hph01SOAmQEjq6n2F"
                                            size="normal"
                                            onChange={onReCAPTCHAChange as any}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 sm:flex sm:justify-end">
                                    <button
                                        type="submit"
                                        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
                                        onClick={handleSubmit}
                                    >
                                        {loading ? <Spinner aria-label="Default status example" /> : <>Senden</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm
