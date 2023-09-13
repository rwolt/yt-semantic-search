import { SideBar } from './SideBar';
import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <header>
        <Header />
      </header>
      <main>
        <div className="flex flex-row w-full">
          <SideBar />
          {children}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
