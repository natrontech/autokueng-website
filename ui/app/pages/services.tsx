import { NextPage } from "next"
import { useEffect, useState } from "react";
import Service from "../components/services/Service";
import { useUserContext } from "../contexts/userContext";
import { ServiceInterface } from "../lib/interfaces";
import { ClientResponseError } from 'pocketbase';
import Heading from "../components/general/typo/Heading";

const Services: NextPage = () => {

    const { client }: any = useUserContext()

    const [services, setServices] = useState<ServiceInterface[]>([])

    useEffect(() => {
        (
            async () => {
                const records = await client.records.getFullList('services', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });
                setServices(records)
            }
        )()
    }, [client.records])

    return (
        <>
            <Heading title="SERVICES" subtitle="Unsere Services und Dienstleistungen" />
            <Service services={services} />
        </>
    )

}

export default Services;
