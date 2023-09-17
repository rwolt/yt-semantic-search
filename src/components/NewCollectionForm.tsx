import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';

export const NewCollectionForm = () => {
  const [collectionName, setCollectionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUser();
  const createCollection = useMutation(api.collection.post);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCollection({ name: collectionName, owner: user.id });
      setCollectionName('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };

  return (
    <form className="flex flex-col align-center p-4 bg-slate-500 text-neutral-300  rounded-md">
      <label htmlFor="collectionNameInput">
        Enter a name to create a new collection
      </label>
      <input
        className="text-black rounded-md px-2"
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        name="collectionNameInput"
        id="collectionNameInput"
      />
      <p className="text-red-400">{errorMessage}</p>
      <button
        className={`px-4 py-2 mt-2 rounded-md bg-black text-sky-400 ${
          loading && 'disabled '
        }`}
        onClick={(e) => handleClick(e)}
      >
        Create Collection
      </button>
    </form>
  );
};
