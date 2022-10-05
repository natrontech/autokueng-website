import { NextPage } from "next"
import HeaderSection from "../components/general/typo/HeaderSection";
import Heading from "../components/general/typo/Heading";
import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from "react";
import { ImageInterface, MemberInterface } from "../lib/interfaces";
import { useUserContext } from "../contexts/userContext";
import { ClientResponseError } from "pocketbase";
import { parseImageUrl, parseImageUrlSpecific } from "../lib/parser";
import Team from "../components/firma/Team";

const Firma: NextPage = () => {

    const { client }: any = useUserContext()

    const [members, setMembers] = useState<MemberInterface[]>([])
    const [images, setImages] = useState<ImageInterface[]>([])

    useEffect(() => {
        (
            async () => {
                const records: ImageInterface[] = await client.records.getFullList('gallery', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });

                // iterate over records and parse image url
                const parsedRecords = records?.map((record: ImageInterface) => {
                    return {
                        ...record,
                        original: parseImageUrlSpecific(record, record.original),
                        thumbnail: parseImageUrlSpecific(record, record.thumbnail),
                    }
                })

                // typecast to ImageInterface
                setImages(parsedRecords as ImageInterface[])
            }
        )(),
        (
            async () => {
                const records = await client.records.getFullList('members', 200 /* batch size */, {
                    sort: '-created',
                }).catch((error: ClientResponseError) => {
                    console.log(error);
                });
                setMembers(records)
            }
        )()
    }, [client.records])

    return (
        <div>
            <Heading title="FIRMA" subtitle="Unsere Firma im Überblick" />
            <Team members={members} />
            <HeaderSection theme="Unsere Bilder" title="GALERIE" description="Eindrücke des Alltages" />
            <div
                className="container mx-auto px-4"
            >
                {images && <ImageGallery items={images} showPlayButton={false} />}
            </div>
        </div>
    )

}

export default Firma;
