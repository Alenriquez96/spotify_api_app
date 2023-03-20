import { useSession, getSession } from "next-auth/react";
import useWidth from "@/hooks/useWidth";
import { useState } from "react";
import Link from "next/link";

const UserDropDown = () => {
  const { data: session } = useSession();
  const windowWidth = useWidth();
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-white md:absolute md:right-5 bg-black rounded-3xl h-[30px]  grid place-content-center relative">
      {windowWidth < 500 ? (
        <p onClick={() => setOpen(!open)} className="m-3 font-bold">
          {session?.user?.name?.slice(0, 1)}
        </p>
      ) : (
        <p onClick={() => setOpen(!open)} className="m-5">
          {session?.user?.name}
        </p>
      )}
      {open && (
        <div className="z-10 right-0 top-[43px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow min-w-44 dark:bg-gray-700 dark:divide-gray-600 transition duration-200">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link
                href="/me/favorites"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Favorites
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
