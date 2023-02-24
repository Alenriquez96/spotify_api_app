import { useSession, getSession } from "next-auth/react";
const UserDropDown = () => {
  const { data: session } = useSession();

  return (
    <div className="shadow-white md:absolute md:right-5 bg-black rounded-3xl h-[30px] px-5 grid place-content-center">
      <p>{session?.user?.name}</p>
    </div>
  );
};

export default UserDropDown;
