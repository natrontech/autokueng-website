import { faCalendar, faGasPump, faGaugeHigh, faGears, faRoad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { VehicleInterface } from "../../lib/interfaces";
import { dateParser, formatNumber, parseImageUrl } from "../../lib/parser";

const FahrzeugCard = ({ vehicle }: { vehicle: VehicleInterface }) => {

    const specList = [
        {
            icon: faRoad,
            title: "Kilometerstand",
            value: `${formatNumber(vehicle?.km)} km`
        },
        {
            icon: faGaugeHigh,
            title: "PS",
            value: `${vehicle?.ps} PS`
        },
        {
            icon: faCalendar,
            title: "Erstzulassung",
            value: dateParser(vehicle?.date)
        },
        {
            icon: faGasPump,
            title: "Kraftstoff",
            value: vehicle?.fuel
        },
        {
            icon: faGears,
            title: "Getriebe",
            value: vehicle?.gearbox
        }
    ]


    return (
        <div key={vehicle.id} className="group relative cursor-pointer shadow-lg rounded-lg sm:hover:scale-105 transition-all duration-150 ease-in-out">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={parseImageUrl(vehicle)}
                    alt={vehicle?.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 relative p-4">
                <div>
                    <h3 className="text-lg font-bold">
                        <div>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {vehicle?.name}
                        </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{vehicle?.description}</p>
                    <hr className="my-2 text-gray-500" />
                    {
                        specList.map((spec, index) => (
                            <div className="flex-row" key={index}>
                                <div
                                    className=""
                                >
                                    <FontAwesomeIcon icon={spec.icon} className="h-4 w-4 text-gray-700 inline" />
                                    <span
                                        className="ml-2 text-gray-500"
                                    >
                                        {spec.value}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div
                    className="text-md font-bold text-primary absolute bottom-4 right-4"
                >
                    <BanknotesIcon className="h-6 w-6 inline" /> {' '}
                    <span>{formatNumber(vehicle?.price)} CHF</span>

                </div>
            </div>
        </div>
    )
}

export default FahrzeugCard
