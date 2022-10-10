import { ArrowDownOnSquareIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next"
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import FahrzeugCard from "../components/fahrzeugpark/FahrzeugCard";
import StyledButton, { StyledButtonType } from "../components/general/buttons/StyledButton";
import Heading from "../components/general/typo/Heading";
import { useUserContext } from "../contexts/userContext";
import { VehicleInterface } from "../lib/interfaces";

const Fahrzeugpark: NextPage = () => {

    const { user, client, loading }: any = useUserContext();

    const [vehicles, setVehicles] = useState<VehicleInterface[]>([])

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
    }, [client.records])

    return (
        <div>
            <Heading title="FAHRZEUGPARK" subtitle="Unser Fahrzeugpark" />
            {
                user && !loading && (
                    <div
                        className="grid grid-cols-1 justify-center items-center max-w-xl mx-auto"
                    >
                        <div className="mx-auto">
                            <StyledButton
                                name="Fahrzeug Excel abgleichen"
                                onClick={() => { }}
                                type={StyledButtonType.Primary}
                                icon={TableCellsIcon}
                                className="px-4"
                                small
                            />
                        </div>
                        <div className="mx-auto">
                            <StyledButton
                                name="Aktuelle Fahrzeugliste herunterladen"
                                onClick={() => { }}
                                type={StyledButtonType.Secondary}
                                icon={ArrowDownOnSquareIcon}
                                className="px-4"
                                small
                            />
                        </div>
                    </div>
                )
            }
            <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-2 sm:px-20 mt-10"
            >
                {vehicles?.map((vehicle) => (
                    <FahrzeugCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    )

}

export default Fahrzeugpark;
