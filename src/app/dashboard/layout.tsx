import Panel from "@/layouts/Panel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Panel>{children}</Panel>;
}
