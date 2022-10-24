import 'react-loading-skeleton/dist/skeleton.css'
import { parseImageUrl } from '../../lib/parser';
import { NewsInterface } from '../../lib/interfaces';
import { useUserContext } from '../../contexts/userContext';
import ModalSkeleton from '../general/modals/ModalSkeleton';
import { ReactElement, useRef } from 'react';
import StyledButton, { StyledButtonType } from '../general/buttons/StyledButton';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import NewsForm from './NewsForm';
import Modal, { ModalProps } from '../general/modals/Modal';
import { Toast, ToastType } from '../alerts/Toast';
import { ClientResponseError } from 'pocketbase';
import NewsCard from './NewsCard';

interface Props {
    news: NewsInterface[]
}

const News = (props: Props) => {
    const { user, loading }: any = useUserContext();

    const createModalRef = useRef<any>(null)

    if (props.news?.length === 0) {
        return (
            <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28 -z-10">
                <div className="absolute inset-0">
                    <div className="h-1/3 bg-white sm:h-2/3" />
                </div>
                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Neuigkeiten</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                            Derzeit haben wir keine Neuigkeiten.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
            <ModalSkeleton ref={createModalRef}>
                <NewsForm modalRef={createModalRef} type='create' />
            </ModalSkeleton>
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
                {
                    user && !loading && (
                        <div
                            className=" grid sm:grid-cols-1 gap-2 justify-center items-center max-w-md mx-auto my-10"
                        >
                            <StyledButton
                                name="News erstellen"
                                onClick={() => {
                                    if (createModalRef.current) {
                                        createModalRef.current.open()
                                    }
                                }}
                                type={StyledButtonType.Primary}
                                icon={PlusIcon}
                                className="w-full"
                                small
                            />
                        </div>
                    )
                }
                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                    {props.news?.length == 1 && <div></div>}
                    {props.news?.length && props.news.slice(0, 3).map((newsItem) => (
                        <NewsCard key={newsItem?.id} news={newsItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default News
