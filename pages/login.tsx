import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Layout from "@/components/Layout";

const login = ({ providers }: any) => {
  const callButton = (): any => {
    return (
      <main className="text-white bg-[#383838] font-roboto min-h-screen min-w-[100vw] text-center flex items-center justify-center">
        <div className="bg-black rounded-[20px] min-h-[450px] flex flex-col justify-center items-center px-[40px]">
          <div className="flex items-center my-3 sm:w-[400px] w-[300px]">
            <img
              className="w-16 bg-white rounded-full mr-4"
              src="https://links.papareact.com/9xl"
              alt="spotify logo"
            />
            <h1 className="text-4xl text-[#1ed760] uppercase font-bold">
              spotify
            </h1>
          </div>

          {Object.values(providers).map((provider: any) => (
            <div key={provider.name} className=" flex flex-col cursor-pointer">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="sm:w-[400px] w-[300px] h-[80px] bg-green-300 animate-pulse rounded-[50px]"
              >
                Sign In
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  };
  return <>{callButton()}</>;
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
