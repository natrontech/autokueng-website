import { MemberInterface } from "../../lib/interfaces"
import MemberCard from "./MemberCard"

interface Props {
    members: MemberInterface[]
}

const Team = (props: Props) => {
    return (
        <div className="bg-white">
            <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 ">
                <div className="space-y-12">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Das Team</h2>
                        <p className="text-xl text-gray-500">
                            Hochqualifizierte Mitarbeitende mit langjähriger Erfahrung und Expertise.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
                    >
                        {props.members?.map((member) => (
                            <li key={member.id}>
                                <MemberCard member={member} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Team
