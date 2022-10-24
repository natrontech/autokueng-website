import { EnvelopeIcon, CodeBracketIcon, PhoneIcon } from "@heroicons/react/24/solid"

const navigation = [
    {
        name: 'Telefon',
        href: 'tel:+41319585757',
        icon: PhoneIcon,
    },
    {
        name: 'E-Mail',
        href: 'mailto:info@autokueng.ch',
        icon: EnvelopeIcon,
    },
    {
        name: 'Code',
        href: 'https://natron.io',
        icon: CodeBracketIcon,
    },
]


const Footer = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:items-center lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500" target="_blank" rel="noreferrer">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <div className="mt-8 sm:mt-4 md:order-1">
                    <p className="text-center text-base text-gray-400">&copy; 2022 Auto Küng AG. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
