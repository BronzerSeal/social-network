import Header from "@/components/ui/layout/layoutHeader";
import SideBar from "@/components/ui/SideBar";
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
        <div className="bg-[#edeef0] min-h-screen flex justify-center">
          <div
            className={`
  grid
  grid-cols-1
  grid-rows-[fr_10fr]
  sm:grid-cols-[1fr_4fr]
  sm:gap-6
  max-w-5xl
  w-full
  px-2
`}
          >
            <SideBar />
            {children}
          </div>
        </div>
      </AppLoader>
    </>
  );
}
