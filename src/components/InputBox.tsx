import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

type InputBoxProps = {
  collection: {
    name: string;
    id: Id<'collections'> | 'all';
  };
};

export const InputBox = ({ collection }: InputBoxProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const postTranscript = useMutation(api.transcripts.post);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postTranscript({ videoUrl, collectionId: collection.id });
      setVideoUrl('');
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };

  return (
    <form className="flex flex-col align-center p-4 bg-slate-600 text-neutral-300  rounded-md">
      <label
        htmlFor="videoLinkInput"
        className="text-center text-xl mb-2 select-none"
      >
        Enter Youtube video link
      </label>
      <input
        className="text-black rounded-md px-2 text-xl"
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="https://www.youtube.com/"
        name="videoLinkInput"
        id="videoLinkInput"
      />
      <p className="text-red-400">{errorMessage}</p>
      <button
        className={`px-4 py-2 mt-2 rounded-md text-xl bg-black text-sky-400 select-none ${
          loading && 'disabled '
        }`}
        onClick={(e) => handleClick(e)}
      >
        Add to Knowledge Base
      </button>
    </form>
  );
};
