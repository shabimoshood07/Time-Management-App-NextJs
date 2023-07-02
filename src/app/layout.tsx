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
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-slate-200">
        <Provider session={session}>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
