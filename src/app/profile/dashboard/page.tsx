import BackButton from "@/component/BackButton";
import ProfilePageHeading from "@/component/ProfilePageHeading";

const Dashboard = (): any => {
  return (
    <div className="fixed right-0 w-[calc(100vw-48px)] 2xl:w-[calc(100vw-500px)] sm:w-[calc(100vw-142px)] border-4 border-red-950 ">
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] mt-2">
        {/* @ts-expect-error Server Component */}
        <ProfilePageHeading />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          Dashboard
        </h1>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
