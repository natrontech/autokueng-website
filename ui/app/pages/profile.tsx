import { NextPage } from "next";
import Heading from "../components/general/typo/Heading";
import ProfileSettingsForm from "../components/profile/ProfileSettingsForm";

const Profile: NextPage = () => {
    return (
        <div>
            <Heading title="Einstellungen" subtitle="Profil Einstellungen" />
            <div>
                <ProfileSettingsForm />
            </div>
        </div>
    )
}

export default Profile;
