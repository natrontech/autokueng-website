import { faCalendar, faGasPump, faGaugeHigh, faGears, faRoad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BanknotesIcon, EnvelopeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "../../contexts/userContext";
import { ImageInterface, VehicleInterface } from "../../lib/interfaces";
import { dateParser, formatNumber, parseImageUrl, parseImageUrlSpecific } from "../../lib/parser";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import ImageGallery from 'react-image-gallery';
import { useState } from "react";
import { createVehicleEmail } from "../../lib/email";

const FahrzeugCard = ({ vehicle }: { vehicle: VehicleInterface }) => {

    const { user, loading }: any = useUserContext();

    const parsedImages: any = vehicle?.images?.map((vehicleImage: string) => {
        return {
            original: parseImageUrlSpecific(vehicle, vehicleImage),
            thumbnail: parseImageUrlSpecific(vehicle, vehicleImage),
        }
    })

    const [images, setImages] = useState<ImageInterface[]>(parsedImages)

    console.log(images)

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
        <div key={vehicle.id} className="shadow-lg rounded-lg">
            {
                user && !loading && (
                    <div
                        className="absolute top-2 right-2 z-10 grid grid-cols-1 justify-center items-center max-w-xl mx-auto gap-2"
                    >
                        <StyledButton
                            name="Bearbeiten"
                            onClick={() => { }}
                            type={StyledButtonType.Primary}
                            icon={PencilIcon}
                            className="px-4"
                            small
                        />
                        <StyledButton
                            name="Löschen"
                            onClick={() => { }}
                            type={StyledButtonType.Danger}
                            icon={TrashIcon}
                            className="px-4"
                            small
                        />
                    </div>
                )
            }
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {vehicle?.images && <ImageGallery items={images} showPlayButton={false} showThumbnails={false} showFullscreenButton={false} />}
            </div>
            <div className="mt-4 p-4">
                <div>
                    <h3 className="text-lg font-bold">
                        <div>
                            {vehicle?.name}
                        </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{vehicle?.description}</p>
                    <hr className="my-2 text-gray-500" />
                    {
                        specList.map((spec, index) => (
                            <div className="flex-row" key={index}>
                                <div
                                    className=""
                                >
                                    <FontAwesomeIcon icon={spec.icon} className="h-4 w-4 text-gray-700 inline" />
                                    <span
                                        className="ml-2 text-gray-500"
                                    >
                                        {spec.value}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div
                    className="text-md font-bold text-primary mt-4"
                >
                    <BanknotesIcon className="h-6 w-6 inline" /> {' '}
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
                        className="px-4"
                        small
                        iconAnimation
                    />
                </div>
            </div>
        </div>
    )
}

export default FahrzeugCard
