import Navbar from "@/component/Navbar";
import "./globals.css";
import Provider from "@/component/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode | Promise<JSX.Element>;
  session: any;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200 overflow-x-hidden">
        <Provider session={session}>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
