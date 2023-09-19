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
    const collectionInput = document.querySelector('#collectionNameInput');
    if (collectionInput instanceof HTMLFormElement) {
      collectionInput?.checkValidity();
      collectionInput?.reportValidity();
    }
    setLoading(true);
    try {
      if (user && collectionName) {
        await createCollection({ name: collectionName, owner: user.id });
      }
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
    <form className="flex flex-col align-center p-4 bg-slate-600 text-neutral-300 text-xl text-center  rounded-md">
      <label htmlFor="collectionNameInput" className="mb-2 select-none">
        Enter name for new collection
      </label>
      <input
        className="text-black rounded-md px-2 text-xl"
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        name="collectionNameInput"
        id="collectionNameInput"
        placeholder="Collection Name"
        required={true}
      />
      <p className="text-red-400">{errorMessage}</p>
      <button
        className={`px-4 py-2 mt-2 rounded-md bg-black text-sky-400 text-xl ${
          loading && 'disabled '
        }`}
        onClick={(e) => handleClick(e)}
      >
        Create Collection
      </button>
    </form>
  );
};
