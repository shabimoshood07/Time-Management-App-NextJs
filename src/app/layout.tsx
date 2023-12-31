import Navbar from "@/component/Navbar";
import "./globals.css";
import Provider from "@/component/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "TMA",
  description: "Time Management App",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200  relative -z-[6]">
        <Provider session={session}>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
