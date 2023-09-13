import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const InputBox = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const postTranscript = useMutation(api.transcripts.post);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await postTranscript({ videoUrl });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form className="flex flex-col align-center p-4 bg-slate-500 text-neutral-300 mt-4 rounded-md">
        <label htmlFor="videoLinkInput">
          Enter video link to add to knowledge base
        </label>
        <input
          className="text-black"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          name="videoLinkInput"
          id="videoLinkInput"
        />
        <p className="text-red-400">{errorMessage}</p>
        <button
          className="px-4 py-2 mt-2 rounded-md bg-black text-sky-400"
          onClick={(e) => handleClick(e)}
        >
          Add to Knowledge Base
        </button>
      </form>
    </div>
  );
};