import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";

const TopNav: React.FC = () => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "javascript";
  const router = useRouter();

  return (
    <header className="top-nav-container w-full fixed top-0 left-0 flex justify-between items-center z-50 py-0.5 bg-light-slate-3 border-b">
      <div className="container flex items-start justify-between px-2 mx-auto sm:items-center md:px-16">
        <div className="flex flex-wrap items-center gap-3 md:gap-8">
          <HeaderLogo withBg={false} textIsBlack />
          <nav>
            <ul className="flex flex-wrap w-full gap-3 mb-3 ml-2 md:gap-8 sm:m-0 sm:w-auto">
              <li>
                {!!user ? (
                  <Link
                    className={`text-sm ${getActiveStyle(router.asPath === "/hub/insights")}`}
                    href={"/hub/insights"}
                  >
                    Insights
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                <Link
                  className={`text-sm ${getActiveStyle(router.asPath === `/${userInterest}/dashboard/filter/recent`)}`}
                  href={`/${userInterest}/dashboard/filter/recent`}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link className={`text-sm ${getActiveStyle(router.pathname === "/feed")}`} href={"/feed"}>
                  Highlights
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <AuthSection />
      </div>
    </header>
  );
};

function getActiveStyle(isActive: boolean) {
  return isActive ? "text-light-orange-10" : "text-light-slate-10";
}

export default TopNav;
