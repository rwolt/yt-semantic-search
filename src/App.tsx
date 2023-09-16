// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { VideoProvider } from './VideoContext';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
// ]);

const App: React.FC = () => {
  return (
    <VideoProvider>
      <Home />
    </VideoProvider>
  );
};

export default App;
