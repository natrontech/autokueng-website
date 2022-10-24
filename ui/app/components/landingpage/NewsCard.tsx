import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ClientResponseError } from "pocketbase";
import { useRef } from "react";
import { useUserContext } from "../../contexts/userContext";
import { NewsInterface } from "../../lib/interfaces";
import { parseImageUrl } from "../../lib/parser";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import Modal, { ModalProps } from "../general/modals/Modal";
import ModalSkeleton from "../general/modals/ModalSkeleton";
import NewsForm from "./NewsForm";

const NewsCard = ({ news }: { news: NewsInterface }) => {
    const { user, client, loading, reload, setReload }: any = useUserContext();
    const updateModalRef = useRef<any>(null);
    const deleteModalRef = useRef<any>(null);

    const deleteModalProps: ModalProps = {
        title: "News löschen",
        description: "Möchten Sie diese News wirklich löschen?",
        type: "danger",
        confirm: "Löschen",
        cancel: "Abbrechen",
        onConfirm: async () => {
            await client.records.delete('news', news?.id)
                .then(() => {
                    Toast("News wurde gelöscht", ToastType.success)
                })
                .catch((error: ClientResponseError) => {
                    Toast(error.message, ToastType.error)
                })
                .finally(() => {
                    if (deleteModalRef.current) {
                        deleteModalRef.current.close()
                    }
                })
            setReload(!reload)
        },
    }

    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg relative">
            <Modal
                ref={deleteModalRef}
                {...deleteModalProps}
            />
            <ModalSkeleton ref={updateModalRef}>
                <NewsForm modalRef={updateModalRef} type="edit" news={news} />
            </ModalSkeleton>
            {
                user && !loading && (
                    <div
                        className="absolute top-2 right-2 z-10 grid grid-cols-1 justify-center items-center max-w-xl mx-auto gap-2"
                    >
                        <StyledButton
                            name="Bearbeiten"
                            onClick={() => {
                                if (updateModalRef.current) {
                                    updateModalRef.current.open()
                                }
                            }}
                            type={StyledButtonType.Primary}
                            icon={PencilIcon}
                            className="px-4"
                            small
                        />
                        <StyledButton
                            name="Löschen"
                            onClick={() => {
                                if (deleteModalRef.current) {
                                    deleteModalRef.current.open()
                                }
                            }}
                            type={StyledButtonType.Danger}
                            icon={TrashIcon}
                            className="px-4"
                            small
                        />
                    </div>
                )
            }
            <div className="flex-shrink-0">
                {
                    news?.image && (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="h-64 w-full object-cover"
                                src={parseImageUrl(news)}
                                alt=""
                            />
                        </>
                    )
                }
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1 mb-2">
                    <p className="text-sm font-medium text-primary">
                        {news?.category}
                    </p>
                    <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">{news?.title}</p>
                        <p className="mt-3 text-base text-gray-500 whitespace-pre-wrap">{news?.content}</p>
                    </div>
                </div>
                <hr />
                <div className="mt-6 flex items-center">
                    <div className="">
                        <div className="w-full space-x-1 text-sm text-gray-500">
                            <time dateTime="2022-10-02">
                                {
                                    new Date(news?.created).toLocaleDateString('de-DE', {
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
    )
}

export default NewsCard;
