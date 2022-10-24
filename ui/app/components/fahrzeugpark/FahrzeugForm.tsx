import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { VehicleInterface } from "../../lib/interfaces";
import { parseImageUrlSpecific } from "../../lib/parser";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton"
import InputField from "../general/forms/InputField"
import Textarea from "../general/forms/TextArea";

interface Props {
    modalRef: any
    type: "create" | "edit"
    vehicle?: VehicleInterface
}

const FahrzeugForm = (props: Props) => {

    const { client, setReload, reload }: any = useUserContext()

    const [images, setImages] = useState<File[]>([])

    const handleSave = async () => {

        const formData = new FormData();
        const name = document.getElementById('name') as HTMLInputElement;
        const km = document.getElementById('km') as HTMLInputElement;
        const price = document.getElementById('price') as HTMLInputElement;
        const description = document.getElementById('description') as HTMLInputElement;
        const ps = document.getElementById('ps') as HTMLInputElement;
        const fuel = document.getElementById('fuel') as HTMLInputElement;
        const gearbox = document.getElementById('gearbox') as HTMLInputElement;
        const date = document.getElementById('date') as HTMLInputElement;
        const mfk = document.getElementById('mfk') as HTMLInputElement;

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }

        formData.append('name', name.value);
        formData.append('km', km.value);
        formData.append('price', price.value);
        formData.append('description', description.value);
        formData.append('ps', ps.value);
        formData.append('fuel', fuel.value);
        formData.append('gearbox', gearbox.value);
        formData.append('date', date.value);
        formData.append('mfk', mfk.value);


        if (props.type === "create") {
            await client.records.create('vehicles', formData)
                .then((record: ClientResponseError) => {
                    console.log(record);
                    Toast("Fahrzeug erfolgreich erstellt!", ToastType.success);
                    props.modalRef.current.close()
                })
                .catch((error: ClientResponseError) => {
                    console.log(error);
                    Toast("Fahrzeug konnte nicht erstellt werden!", ToastType.error);
                })
                .finally(() => {
                    setReload(!reload)
                })
        } else {
            await client.records.update('vehicles', props.vehicle?.id , formData)
                .then((record: ClientResponseError) => {
                    console.log(record);
                    Toast("Fahrzeug erfolgreich bearbeitet", ToastType.success);
                    props.modalRef.current.close()
                })
                .catch((error: ClientResponseError) => {
                    console.log(error);
                    Toast("Fahrzeug konnte nicht bearbeitet werden!", ToastType.error);
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
                <h1 className="text-2xl font-bold text-primary mb-2">Fahrzeug erfassen</h1> :
                <h1 className="text-2xl font-bold text-primary mb-2">Fahrzeug bearbeiten</h1>
            }
            <InputField
                label="Name"
                name="name"
                type="text"
                defaultValue={props.vehicle?.name}
                required
            />
            <Textarea
                label="Kurze Beschreibung"
                name="description"
                defaultValue={props.vehicle?.description}
                required
            />
            <InputField
                label="Kilometerstand (km)"
                name="km"
                type="number"
                defaultValue={props.vehicle?.km}
                required
            />
            <InputField
                label="PS"
                name="ps"
                type="number"
                defaultValue={props.vehicle?.ps}
                required
            />
            <InputField
                label="Kraftstoff (Benzin, Diesel, Elektro, Hybrid)"
                name="fuel"
                type="text"
                defaultValue={props.vehicle?.fuel}
                required
            />
            <InputField
                label="Getriebe (Automatik, Schaltgetriebe)"
                name="gearbox"
                type="text"
                defaultValue={props.vehicle?.gearbox}
                required
            />
            <InputField
                label="Erstzulassung"
                name="date"
                type="date"
                defaultValue={
                    props.vehicle?.date &&
                    parseDateDay(props.vehicle?.date)}
                required
            />
            <InputField
                label="Letzte Motorfahrzeugkontrolle"
                name="mfk"
                type="date"
                defaultValue={
                    props.vehicle?.mfk &&
                    parseDateDay(props.vehicle?.mfk)}
                required
            />
            <InputField
                label="Preis (CHF)"
                name="price"
                type="number"
                defaultValue={props.vehicle?.price}
                required
            />
            { props.type === "edit" &&
                // information about the images
                <p className="text-sm text-gray-500 mt-2">Bilder können nicht bearbeitet, sondern nur ergänzt werden.</p>
            }
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

export default FahrzeugForm
