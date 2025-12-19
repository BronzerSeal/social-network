import Header from "@/components/ui/layout/layoutHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="bg-gray-300">{children}</div>
    </>
  );
}
