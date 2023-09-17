// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Unauthenticated, Authenticated } from "convex/react";
import { Home } from "./pages/Home";
import { VideoProvider } from "./VideoContext";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
// ]);

const App: React.FC = () => {
  return (
    <div>
      <VideoProvider>
        <Home />
      </VideoProvider>
    </div>
  );
};

export default App;
