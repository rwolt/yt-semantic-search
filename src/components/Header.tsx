import { SignInButton, UserButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
export const Header = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <>
      <div className="p-4 bg-dark-gray-800 text-white flex justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl">Youtube Semantic Search</h1>
        </div>
        {isAuthenticated ? (
          <UserButton afterSignOutUrl="http://localhost:5173/" />
        ) : (
          <SignInButton mode="modal" />
        )}
      </div>
    </>
  );
};
