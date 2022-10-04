import { MemberInterface } from "../../lib/interfaces";
import { parseImageUrl } from "../../lib/parser";

const MemberCard = ({ member }: {member: MemberInterface}) => {
    return (
        <div id={member.id}>
            <div
                className="space-y-4 my-4"
            >
                <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src={parseImageUrl(member)} alt="" />
                </div>

                <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{member.name}</h3>
                        <p className="text-blue-600">{member.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberCard
