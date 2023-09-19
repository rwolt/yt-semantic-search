import { SideBar } from './SideBar';
import { Header } from './Header';
import { Main } from './Main';
import { Authenticated, Unauthenticated } from 'convex/react';
import { SignInCard } from './SignInCard';

export const Layout = () => {
  return (
    <div className="flex flex-col max-h-screen overflow-hidden bg-deep-blue  ">
      <header>
        <Header />
      </header>
      <main>
        <Unauthenticated>
          <SignInCard />
        </Unauthenticated>
        <Authenticated>
          <div className="flex flex-row w-full bg-deep-blue-900 text-white bg-dark-gray-700">
            <SideBar />
            <Main />
            {/* {children} */}
          </div>
        </Authenticated>
      </main>
      <footer></footer>
    </div>
  );
};
