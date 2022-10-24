import { ArrowDownOnSquareIcon, PlusIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Tabs } from "flowbite-react";
import { NextPage } from "next"
import { ClientResponseError } from "pocketbase";
import { useEffect, useRef, useState } from "react";
import { Toast, ToastType } from "../components/alerts/Toast";
import FahrzeugCard from "../components/fahrzeugpark/FahrzeugCard";
import FahrzeugForm from "../components/fahrzeugpark/FahrzeugForm";
import StyledButton, { StyledButtonType } from "../components/general/buttons/StyledButton";
import ModalSkeleton from "../components/general/modals/ModalSkeleton";
import Heading from "../components/general/typo/Heading";
import { useUserContext } from "../contexts/userContext";
import { VehicleInterface } from "../lib/interfaces";

const Fahrzeugpark: NextPage = () => {

    const { user, client, loading, reload }: any = useUserContext();

    const [vehicles, setVehicles] = useState<VehicleInterface[]>([])
    const createModalRef = useRef<any>(null)

    useEffect(() => {
        (
            async () => {
                const records = await client.records.getFullList('vehicles', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });
                setVehicles(records)
            }
        )()
        const script = document.createElement("script");
        script.src =
            "https://www.autoscout24.ch/MVC/Content/as24-hci-desktop/js/e.min.js";
        script.async = true;
        document.head.appendChild(script);
        return () => {
            //document.head.removeChild(script);
        };
    }, [client.records, reload])

    const handleDownloadVehicles = () => {
        // download vehicles as csv
        const csv = vehicles.map((vehicle: VehicleInterface) => {
            return {
                'Name': vehicle.name,
                'Beschreibung': vehicle.description,
                'Kilometerstand': vehicle.km,
                'PS': vehicle.ps,
                'Kraftstoff': vehicle.fuel,
                'Getriebe': vehicle.gearbox,
                'Erstzulassung': vehicle.date,
                'Preis': vehicle.price,
                'Bilder': vehicle.images,
            }
        })


        const replacer = (key: any, value: any) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(csv[0])
        let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\r";

        csv.forEach((row: any) => {
            csvContent += header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(",");
            csvContent += "\r";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "fahrzeuge.csv");
        document.body.appendChild(link); // Required for FF

        link.click();

        Toast("Fahrzeuge wurden heruntergeladen", ToastType.success)
    }

    return (
        <div>
            <Heading title="FAHRZEUGPARK" subtitle="Unser Fahrzeugpark" />
            <ModalSkeleton ref={createModalRef}>
                <FahrzeugForm modalRef={createModalRef} type="create" />
            </ModalSkeleton>
            <Tabs.Group
                aria-label="Fahrzeugpark Tabs"
                style="default"

            >
                <Tabs.Item
                    active={true}
                    title="Autokueng"
                >
                    {
                        user && !loading && (
                            <div
                                className=" grid sm:grid-cols-1 gap-2 justify-center items-center max-w-md mx-auto"
                            >
                                <StyledButton
                                    name="Fahrzeug erfassen"
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
                    <div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-2 sm:px-20 my-10"
                    >
                        {vehicles?.map((vehicle) => (
                            <FahrzeugCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    title="Autoscout24"
                >
                    <div
                        data-embedded-src="https://www.autoscout24.ch/de/hci/list?design=846&filter=1276"
                        className="embedded-content-area"
                    />
                </Tabs.Item>
            </Tabs.Group>

        </div>
    )

}

export default Fahrzeugpark;
