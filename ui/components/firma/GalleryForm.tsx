import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton"
import InputField from "../general/forms/InputField"

interface Props {
    modalRef: any
}

const GalleryForm = (props: Props) => {

    const { client, setReload, reload }: any = useUserContext()

    const [images, setImages] = useState<File[]>([])

    const handleSave = async () => {

        let errors: number = 0

        if (images) {
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append('original', images[i])

                client.records.create('gallery', formData)
                    .then((record: ClientResponseError) => {
                        console.log(record);
                    })
                    .catch((error: ClientResponseError) => {
                        console.log(error);
                        errors++
                    })
                    .finally(() => {
                        setReload(!reload)
                    })

            }

            if (errors === 0) {
                Toast("Bild(er) erfolgreich hochgeladen!", ToastType.success);
                props.modalRef.current.close()
            } else {
                Toast("Es konnten " + errors + " Bilder nicht hochgeladen werden!",  ToastType.error);
            }
        }


    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Bilder hochladen</h1>
            <p className="text-sm text-gray-500 mt-2">Bilder können nicht bearbeitet, sondern nur ergänzt werden.</p>
            <InputField
                label="Bilder"
                name="images"
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

export default GalleryForm
