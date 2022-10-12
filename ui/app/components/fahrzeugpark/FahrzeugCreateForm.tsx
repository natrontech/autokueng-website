import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton"
import InputField from "../general/forms/InputField"

const FahrzeugCreateForm = () => {

    const { client }: any = useUserContext()

    const [images, setImages] = useState<File[]>([])

    const handleSave = async () => {
        // get values from form
        // create vehicle
        // close modal

        const formData = new FormData();
        const name = document.getElementById('name') as HTMLInputElement;
        const km = document.getElementById('km') as HTMLInputElement;
        const price = document.getElementById('price') as HTMLInputElement;
        const description = document.getElementById('description') as HTMLInputElement;
        const ps = document.getElementById('ps') as HTMLInputElement;
        const fuel = document.getElementById('fuel') as HTMLInputElement;
        const gearbox = document.getElementById('gearbox') as HTMLInputElement;
        const date = document.getElementById('date') as HTMLInputElement;

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

        await client.records.create('vehicles', formData)
            .then((record: ClientResponseError) => {
                console.log(record);
                Toast("Fahrzeug erfolgreich erstellt!", ToastType.success);
            })
            .catch((error: ClientResponseError) => {
                console.log(error);
                Toast("Fahrzeug konnte nicht erstellt werden!", ToastType.error);
            })


    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Fahrzeug erfassen</h1>
            <InputField
                label="Name"
                name="name"
                type="text"
                required
            />
            <InputField
                label="Beschreibung"
                name="description"
                type="text"
                required
            />
            <InputField
                label="Kilometerstand (km)"
                name="km"
                type="number"
                required
            />
            <InputField
                label="PS"
                name="ps"
                type="number"
                required
            />
            <InputField
                label="Kraftstoff (Benzin, Diesel, Elektro, Hybrid)"
                name="fuel"
                type="text"
                required
            />
            <InputField
                label="Getriebe (Automatik, Schaltgetriebe)"
                name="gearbox"
                type="text"
                required
            />
            <InputField
                label="Erstzulassung"
                name="date"
                type="date"
                required
            />
            <InputField
                label="Preis (CHF)"
                name="price"
                type="number"
                required
            />
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
                    onClick={() => { }}
                    small
                />
            </div>
        </div>
    )
}

export default FahrzeugCreateForm
