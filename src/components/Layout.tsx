import { SideBar } from './SideBar';
import { Header } from './Header';
import { Main } from './Main';
import { Authenticated } from 'convex/react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col max-h-screen overflow-auto">
      <header>
        <Header />
      </header>
      <main>
        <Authenticated>
          <div className="flex flex-row w-full">
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
