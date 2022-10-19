import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton"
import InputField from "../general/forms/InputField"
import { parse } from 'csv-parse';
import { VehicleInterface } from "../../lib/interfaces";
import { ClientResponseError } from "pocketbase";
import { Toast, ToastType } from "../alerts/Toast";

interface Props {
    modalRef: any
}

const FahrzeugImportForm = (props: Props) => {

    const { client, setReload, reload }: any = useUserContext()

    const [importFile, setImportFile] = useState<File>()

    const handleSave = async () => {

        const xmlClient = new XMLHttpRequest();
        if (importFile) {
            xmlClient.open("GET", importFile.name);
        }

        // get content of file
        const csvString = await importFile?.text()

        // parse csv
        const parser = parse({
            delimiter: ';',
        })

        parser.on('readable', async () => {
            let records;
            while (records = parser.read()) {
                const vehicle: any = {
                    name: records[0],
                    km: records[1],
                    price: records[2],
                    description: records[3],
                    ps: records[4],
                    fuel: records[5],
                    gearbox: records[6],
                    date: records[7],
                }

                // await client.records.create('vehicles', vehicle)
                //     .then((record: ClientResponseError) => {
                //         console.log(record);
                //         Toast("Fahrzeug erfolgreich erstellt!", ToastType.success);
                //         props.modalRef.current.close()
                //     })
                //     .catch((error: ClientResponseError) => {
                //         console.log(error);
                //         Toast("Fahrzeug konnte nicht erstellt werden!", ToastType.error);
                //     })

                console.log(vehicle);
            }
        })


    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Fahrzeuge importieren</h1>
            <InputField
                label="Import Datei (CSV)"
                name="importFile"
                type="file"
                onChange={(e: any) => setImportFile(e.target.files)}
                multiple={false}
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

export default FahrzeugImportForm
