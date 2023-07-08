import BackButton from "./BackButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const ProfilePageHeading = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);
 
  return (
    <div >
      <BackButton page="settings" />
      <h1 className="text-[0.975rem] sm:text-xl">
        Welcome {session?.user.name || session?.user.email}!
      </h1>
    </div>
  );
};

export default ProfilePageHeading;
