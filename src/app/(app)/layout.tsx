import Header from "@/components/ui/layout/layoutHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="bg-[#edeef0] min-h-screen">{children}</div>
    </>
  );
}
