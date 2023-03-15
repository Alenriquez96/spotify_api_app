import { useSession, getSession } from "next-auth/react";
import useWidth from "@/hooks/useWidth";

const UserDropDown = () => {
  const { data: session } = useSession();

  const windowWidth = useWidth();

  return (
    <div className="shadow-white md:absolute md:right-5 bg-black rounded-3xl h-[30px]  grid place-content-center">
      {windowWidth < 500 ? (
        <p className="m-3">{session?.user?.name?.slice(0, 1)}</p>
      ) : (
        <p className="m-5">{session?.user?.name}</p>
      )}
    </div>
  );
};

export default UserDropDown;
