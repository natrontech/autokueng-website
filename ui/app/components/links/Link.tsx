import { ChevronRightIcon, LinkIcon } from "@heroicons/react/24/outline"
import { LinkInterface } from "../../lib/interfaces"
import { parseImageUrl } from "../../lib/parser"

const Link = ({ link }: { link: LinkInterface }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                <li className='relative'>
                    <a href={link.url} className="block hover:bg-gray-50" target="_blank" rel="noreferrer">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img className="h-24 w-24 rounded" src={parseImageUrl(link)} alt="" />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 truncate">{link.title}</p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                            <LinkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="truncate">{link.url}</span>
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div>
                                            <p className="text-sm text-gray-900">
                                                {link.description}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {link.tag}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )

}

export default Link
