// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from "./pages/Home";
import { VideoProvider } from "./VideoContext";
import { CollectionProvider } from "./CollectionContext";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
// ]);

const App: React.FC = () => {
  return (
    <div>
      <CollectionProvider>
        <VideoProvider>
          <Home />
        </VideoProvider>
      </CollectionProvider>
    </div>
  );
};

export default App;
