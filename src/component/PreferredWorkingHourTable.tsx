import { columns } from "@/app/profile/settings/columns";
import { DataTable } from "@/app/profile/settings/data-table"; 
import { getUserPreferredWorkingHour } from "@/lib/actions";
import { Session } from "next-auth";

const PreferredWorkingHourTable = async ({ session }: { session: Session }) => {
  const preferredWorkingHours = await getUserPreferredWorkingHour(session);

  return <DataTable data={preferredWorkingHours} columns={columns} />;
};

export default PreferredWorkingHourTable;
