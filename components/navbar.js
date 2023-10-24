import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";

const Navbar = () => {
  const navigation = [
    { name: "Faucet", link: "https://faucet.etherlink.com" },
    { name: "Explorer", link: "https://explorer.ghostnet-evm.tzalpha.net/" },
    { name: "Bridge", link: "https://bridge.etherlink.com" },
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-1 text-3xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/etherlink_logo.png"
                        alt="N"
                        width="128"
                        height="128"
                        className="w-8 mr-2"
                      />
                    </span>
                    <span >Etherlink</span>
                  </span>
                </Link>

                {/* mobile menu */}
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href={item.link} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800" target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </Link>
                    ))}
                    <Link href="https://docs.etherlink.com" className="w-full px-6 py-2 mt-3 text-center text-black bg-shaderGreen rounded-md lg:ml-5">
                      Etherlink Docs
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

      {/* menu  */}
      <div className="hidden text-center lg:flex lg:items-center justify-between">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href={menu.link} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none hover:bg-etherlinkGreen dark:hover:text-black" target="_blank" rel="noopener noreferrer">
                    {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mr-3 space-x-4 nav__item">
            <Link href="https://docs.etherlink.com" className="px-4 py-3 text-black bg-white rounded-md md:ml-5 hover:bg-borderGreen" target="_blank" rel="noopener noreferrer">
              Etherlink Docs
            </Link>
            {/* <ThemeChanger /> */}
          </div>
        </div>  
      </nav>
    </div >
  );
}

export default Navbar;