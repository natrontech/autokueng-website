interface Props {
    title: string
    subtitle: string
}

const Heading = (props: Props) => {
    return (
        <div className="my-6 text-center">
            <h1 className="my-2 font-bold text-4xl">{props.title}</h1>
            <h2 className="text-xl text-blue-500 font-semibold">{props.subtitle}</h2>
        </div>
    )
}

export default Heading;
