import { ServiceInterface } from "../../lib/interfaces"
import { parseImageUrl } from "../../lib/parser"
import { Card } from "flowbite-react"

interface Props {
    services: ServiceInterface[]
}

function Service(props: Props) {

    return (
        <div className="">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 px-2 sm:px-20">

                {props.services && props.services.map((service) => (

                    <div
                        className="max-w-sm"
                        key={service.id}
                    >
                        <Card imgSrc={parseImageUrl(service)}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {service.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {service.content}
                            </p>
                        </Card>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Service
