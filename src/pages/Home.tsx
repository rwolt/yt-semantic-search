import { Layout } from '../components/Layout';
import { SearchBox } from '../components/SearchBox';

export const Home: React.FC = () => {
  return (
    <Layout>
      <div className="p-4 w-full ">
        <SearchBox />
      </div>
    </Layout>
  );
};
