import SearchBar from "@/components/SearchBar";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw]">
        <div className="bg-gradient-to-b to-[#383838] from-indigo-500 min-h-[390px] flex flex-col flex-wrap justify-between items-center">
          {" "}
          <SearchBar />
        </div>
      </main>
    </Layout>
  );
}
