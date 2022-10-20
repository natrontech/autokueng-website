import { faCalendar, faCalendarCheck, faGasPump, faGaugeHigh, faGears, faRoad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnvelopeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { useUserContext } from "../../contexts/userContext";
import { ImageInterface, VehicleInterface } from "../../lib/interfaces";
import { dateParser, formatNumber, parseImageUrl, parseImageUrlSpecific } from "../../lib/parser";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import ImageGallery from 'react-image-gallery';
import { useRef, useState } from "react";
import { createVehicleEmail } from "../../lib/email";
import Modal, { ModalProps } from "../general/modals/Modal";
import { Toast, ToastType } from "../alerts/Toast";
import { ClientResponseError } from "pocketbase";
import ModalSkeleton from "../general/modals/ModalSkeleton";
import FahrzeugForm from "./FahrzeugForm";

const FahrzeugCard = ({ vehicle }: { vehicle: VehicleInterface }) => {

    const { user, loading, client, setReload, reload }: any = useUserContext();

    const parsedImages: any = vehicle?.images?.map((vehicleImage: string) => {
        return {
            original: parseImageUrlSpecific(vehicle, vehicleImage),
        }
    })

    const [images, setImages] = useState<ImageInterface[]>(parsedImages)
    const updateModalRef = useRef<any>(null);
    const deleteModalRef = useRef<any>(null)
    const deleteModalProps: ModalProps = {
        title: "Fahrzeug löschen",
        description: "Möchten Sie das Fahrzeug wirklich löschen?",
        type: "danger",
        confirm: "Löschen",
        cancel: "Abbrechen",
        onConfirm: async () => {
            await client.records.delete('vehicles', vehicle.id)
                .then(() => {
                    Toast("Fahrzeug wurde gelöscht", ToastType.success)
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

    const specList = [
        {
            icon: faRoad,
            title: "Kilometerstand",
            value: `${formatNumber(vehicle?.km)} km`
        },
        {
            icon: faGaugeHigh,
            title: "PS",
            value: `${vehicle?.ps} PS`
        },
        {
            icon: faCalendar,
            title: "Erstzulassung",
            value: dateParser(vehicle?.date)
        },
        {
            icon: faCalendarCheck,
            title: "Letzte Motorfahrzeugkontrolle",
            value: dateParser(vehicle?.mfk)
        },
        {
            icon: faGasPump,
            title: "Kraftstoff",
            value: vehicle?.fuel
        },
        {
            icon: faGears,
            title: "Getriebe",
            value: vehicle?.gearbox
        }
    ]

    return (
        <div key={vehicle.id} className="shadow-lg p-4 flex-1 bg-white border relative rounded-lg">
            <div className="animate-pulse absolute -left-3 -top-3 select-none">
                <p className="inline-flex bg-green-100 p-2 rounded-lg text-sm font-semibold  text-green-800">
                    {
                        // if vehicle?.created is less than 7 days ago show new
                        (new Date().getTime() - new Date(vehicle?.created).getTime()) / (1000 * 3600 * 24) < 7 ? "Neu" : ""
                    }
                </p>
            </div>
            <Modal
                ref={deleteModalRef}
                {...deleteModalProps}
            />
            <ModalSkeleton ref={updateModalRef}>
                <FahrzeugForm modalRef={updateModalRef} type="edit" vehicle={vehicle} />
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
            <div className="w-full overflow-hidden mt-5">
                {vehicle?.images && <ImageGallery items={images} showPlayButton={false} showThumbnails={false} showFullscreenButton={false} additionalClass="fahrzeug-image-gallery" />}
            </div>
            <div className="mt-4">
                <div>
                    <h3 className="text-lg font-bold">
                        <div>
                            {vehicle?.name}
                        </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-700 h-14 overflow-y-scroll scrollbar-hide">{vehicle?.description}</p>
                    <hr className="my-2 text-gray-500" />
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                        {
                            specList.map((spec, index) => (
                                <div className="" key={index}>
                                    <FontAwesomeIcon icon={spec.icon} className="h-4 w-4 text-gray-700 inline" />
                                    <span
                                        className="ml-2 text-gray-500"
                                    >
                                        {spec.value}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div
                    className="text-md font-bold text-primary mt-4"
                >
                    <span>{formatNumber(vehicle?.price)} CHF</span>

                </div>
                <div
                    className="mt-4"
                >
                    <StyledButton
                        name="Anfrage senden"
                        onClick={() => createVehicleEmail(vehicle)}
                        type={StyledButtonType.Primary}
                        icon={EnvelopeIcon}
                        className="w-full"
                        small
                        iconAnimation
                    />
                </div>
            </div>
        </div>
    )
}

export default FahrzeugCard
