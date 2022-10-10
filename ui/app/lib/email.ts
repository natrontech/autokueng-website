import { VehicleInterface } from "./interfaces";

export const createVehicleEmail = (vehicle: VehicleInterface) => {
    // open email client with pre-filled data
    const subject = `Anfrage zu Fahrzeug: ${vehicle.name}`;
    const body = `Guten Tag, ich interessiere mich für das Fahrzeug ${vehicle.name}.%0D%0AIch würde mich freuen, wenn Sie sich bei mir melden.%0D%0AMit freundlichen Grüssen%0D%0A[Ihre Kontaktdaten]`;
    const email = `mailto:kontakt@autokueng.ch?subject=${subject}&body=${body}`;
    window.open(email);
};
