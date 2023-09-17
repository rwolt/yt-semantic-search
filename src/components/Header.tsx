import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
export const Header = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <>
      <div className="p-4 border-black border-b-[1px] flex justify-between">
        <h1 className="text-xl">Youtube Semantic Search</h1>
        {isAuthenticated ? <UserButton /> : <SignInButton mode="modal" />}
      </div>
    </>
  );
};
