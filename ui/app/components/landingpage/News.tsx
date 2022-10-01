
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import { useUserContext } from '../../contexts/userContext';
import { ClientResponseError, Record } from 'pocketbase';
import { parseImageUrl } from '../../lib/parser';
import Image from 'next/image';

interface News extends Record {
    title: string;
    content: string;
    image: string;
    category: string;
}

const News = () => {

    const { user, loading, client }: any = useUserContext();
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        (
            async () => {
                const records = await client.records.getFullList('news', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });
                setNews(records);
            }
        )();
    }, [client.records, loading]);

    return (
        <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="absolute inset-0">
                <div className="h-1/3 bg-white sm:h-2/3" />
            </div>
            <div className="relative mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Neuigkeiten</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                        Hier findest du das Neuste von uns.
                    </p>
                </div>
                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                    {news?.length && news.map((newsItem) => (
                        <div key={newsItem?.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                            <div className="flex-shrink-0">
                                {
                                    newsItem?.image && (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="h-48 w-full object-cover"
                                                src={parseImageUrl(newsItem)}
                                                alt=""
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1 mb-2">
                                    <p className="text-sm font-medium text-primary">
                                        {newsItem?.category}
                                    </p>
                                    <div className="mt-2 block">
                                        <p className="text-xl font-semibold text-gray-900">{newsItem?.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{newsItem?.content}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="mt-6 flex items-center">
                                    <div className="">
                                        <div className="w-full space-x-1 text-sm text-gray-500">
                                            <time dateTime="2022-10-02">
                                                {
                                                    new Date(newsItem?.created).toLocaleDateString('de-DE', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })
                                                }
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default News
