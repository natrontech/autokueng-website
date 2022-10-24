import { NextPage } from "next";
import { useRouter } from "next/router";
import Heading from "../components/general/typo/Heading";
import ProfileSettingsForm from "../components/profile/ProfileSettingsForm";
import { useUserContext } from "../contexts/userContext";

const Profile: NextPage = () => {

    const { user, loading }: any = useUserContext()
    const router = useRouter();

    if (!user && !loading) {
        router.push('/login')
    }

    return (
        <div>
            {
                user && !loading && (
                    <div>
                        <Heading title="Einstellungen" subtitle="Profil Einstellungen" />
                        <ProfileSettingsForm />
                    </div>
                )
            }
        </div>
    )
}

export default Profile;
