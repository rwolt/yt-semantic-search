import { useState } from 'react';
import { SignIn } from '@clerk/clerk-react';

export const SignInCard = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  return !showSignIn ? (
    <div className="flex flex-col items-center mt-40 w-1/5 m-auto bg-slate-300">
      <h2>Welcome to Youtube Semantic Search</h2>
      <h2>Sign in to get started</h2>
      <img src="" height="200" />
      <button onClick={() => setShowSignIn(true)}>Sign In</button>
    </div>
  ) : (
    <div className="mt-40 m-auto flex justify-center">
      <SignIn />
    </div>
  );
};
