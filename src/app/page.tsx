import Hero from "@/component/Hero";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = (await getServerSession(authOptions)) as Session;
  return <Hero session={session} />;
}
