import { NextPage } from "next"
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import Heading from "../components/general/typo/Heading";
import Link from "../components/links/Link";
import { useUserContext } from "../contexts/userContext";
import { LinkInterface } from "../lib/interfaces";

const Links: NextPage = () => {

    const { client }: any = useUserContext()

    const [links, setLinks] = useState<LinkInterface[]>([])

    useEffect(() => {
        (
            async () => {
                const records = await client.records.getFullList('links', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });
                setLinks(records)
            }
        )()
    }, [client.records])

    return (
        <div>
            <Heading title="LINKS" subtitle="Nützliche Links" />
                <div>
                    {links?.map((link) => (
                        <Link key={link.id} link={link} />
                    ))}

                </div>
        </div>
    )

}

export default Links;
