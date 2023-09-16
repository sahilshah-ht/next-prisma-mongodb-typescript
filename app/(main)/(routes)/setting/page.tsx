import { currentProfile } from "@/lib/currentProfile";

const SettingPage = async () => {
    const user = await currentProfile()
    return (
        <div>Setting page</div>
    );
}

export default SettingPage;