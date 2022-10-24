import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { NewsInterface } from "../../lib/interfaces";
import { parseImageUrlSpecific } from "../../lib/parser";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton"
import InputField from "../general/forms/InputField"
import Textarea from "../general/forms/TextArea";

interface Props {
    modalRef: any
    type: "create" | "edit"
    news?: NewsInterface
}

const NewsForm = (props: Props) => {

    const { client, setReload, reload }: any = useUserContext()

    const [images, setImages] = useState<File[]>([])

    const handleSave = async () => {

        const formData = new FormData();
        const title = document.getElementById('title') as HTMLInputElement;
        const content = document.getElementById('content') as HTMLInputElement;
        const category = document.getElementById('category') as HTMLInputElement;

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('image', images[i])
            }
        }

        formData.append('title', title.value);
        formData.append('content', content.value);
        formData.append('category', category.value);

        if (props.type === "create") {
            await client.records.create('news', formData)
                .then((record: ClientResponseError) => {
                    console.log(record);
                    Toast("News erfolgreich erstellt!", ToastType.success);
                    props.modalRef.current.close()
                })
                .catch((error: ClientResponseError) => {
                    console.log(error);
                    Toast("News konnte nicht erstellt werden!", ToastType.error);
                })
                .finally(() => {
                    setReload(!reload)
                })
        } else {
            await client.records.update('news', props.news?.id , formData)
                .then((record: ClientResponseError) => {
                    console.log(record);
                    Toast("News erfolgreich bearbeitet", ToastType.success);
                    props.modalRef.current.close()
                })
                .catch((error: ClientResponseError) => {
                    console.log(error);
                    Toast("News konnte nicht bearbeitet werden!", ToastType.error);
                })
                .finally(() => {
                    setReload(!reload)
                })
        }
    }

    const parseDateDay = (date: any) => {
        const dateArray = date?.split(' ');
        return dateArray[0];
    }

    return (
        <div>
            {props.type == "create" ?
                <h1 className="text-2xl font-bold text-primary mb-2">News erfassen</h1> :
                <h1 className="text-2xl font-bold text-primary mb-2">News bearbeiten</h1>
            }
            <InputField
                label="Titel"
                name="title"
                type="text"
                defaultValue={props.news?.title}
                required
            />
            <Textarea
                label="Inhalt"
                name="content"
                defaultValue={props.news?.content}
                required
            />
            <InputField
                label="Katagorie"
                name="category"
                type="text"
                defaultValue={props.news?.category}
                required
            />
            <InputField
                label="Bild"
                name="image"
                type="file"
                onChange={(e: any) => setImages(e.target.files)}
                multiple
                required
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
                <StyledButton
                    name="Speichern"
                    type={StyledButtonType.Primary}
                    onClick={handleSave}
                    small
                />
                <StyledButton
                    name="Abbrechen"
                    type={StyledButtonType.Secondary}
                    onClick={() => {
                        props.modalRef.current.close()
                    }}
                    small
                />
            </div>
        </div>
    )
}

export default NewsForm
