import SearchBar from "@/components/SearchBar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
          {" "}
          <SearchBar />
        </div>
      </main>
    </>
  );
}
