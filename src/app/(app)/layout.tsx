import Header from "@/components/ui/layout/layoutHeader";
import AppLoader from "@/hoc/app-loader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppLoader>
        <Header />
        <div className="bg-[#edeef0] min-h-screen">{children}</div>
      </AppLoader>
    </>
  );
}
