"use client";

import Link from "next/link"; // allows you to use the Link component from Next.js.
import Image from "next/image"; // allows you to use the Image component from Next.js
import { useState, useEffect } from "react"; // useState for adding state to functional components, useEffect allows you to perform side effects in function components(like data fetching)
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; // signIn is a function to sign in a user, signOut is a function to sign out a user, useSession is a hook to get the current authentication session, getProviders is a function to get the list of authentication providers configured for your app

const Nav = () => {
    const { data: session} = useSession();

    const [providers, setProviders] = useState(null); 
    const [toggleDropDown, setToggleDropDown] = useState(false);

    // useEffect is used to run side effects in your functional component. In this case, the effect is fetching authentication providers and storing them in the state.

    // Since the dependency array [] is empty, the effect runs only once when the component is mounted. It won't run again unless the component unmounts and mounts again.

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders(); // Fetch providers, calls the getProviders function, which likely makes a network request to fetch available authentication providers.

            setProviders(response); // Update state with fetched providers
        }

        setUpProviders(); // Invoke the async function
    }, []); // Dependency array ensures this runs only once

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
        src="/assets/images/logo.svg" alt="Prompt Share Logo"
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text">PromptShare</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
            <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                    Create Post
                </Link>

                <button type="button" onClick={signOut} className="outline_btn">
                    Sign Out
                </button>

                <Link href="/profile">
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                    />
                </Link>
            </div>
        ) : (
            <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button 
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="black_btn"
                        >
                            Sign In
                        </button>
                    )
                )}
            </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
            <div className="flex">
                <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                    onClick={() => setToggleDropDown((prev) => !prev)}
                />

                {toggleDropDown && (
                    <div className="dropdown">
                        <Link 
                        href="/profile"
                        className="dropdown_link"
                        onClick={() => setToggleDropDown(false)}
                        >
                            My Profile
                        </Link>

                        <Link 
                        href="/create-prompt"
                        className="dropdown_link"
                        onClick={() => setToggleDropDown(false)}
                        >
                            
                            Create Prompt
                        </Link>
                        <button
                            type="button"
                            onClick={() => {setToggleDropDown(false);
                                signOut();
                            }}
                            className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                    </div>
                )}
            </div>
        ): (
            <>
            {providers && 
                Object.values(providers).map((provider) => (
                    <button 
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    >
                        Sign In
                    </button>
                )
            )}
        </>
        )}
      </div>
    </nav>
  )
}

export default Nav