import ProfileSidebar from "@/component/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode | Promise<JSX.Element>;
}) {
  return (
    <div className="relative -z-[6] flex justify-end ">
      <ProfileSidebar />
      {children}
    </div>
  );
}
