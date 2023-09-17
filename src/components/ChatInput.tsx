import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
export const ChatInput = () => {
  return (
    <form className="flex flex-row items-center border-gray-500 border absolute bottom-4 right-4 left-4 focus-within:outline-1 rounded-md ">
      <input
        type="text"
        name="chat"
        placeholder="Send a Message"
        className="outline-none grow focus:outline-none rounded-md py-2 px-2 "
      />
      <button>
        <PaperAirplaneIcon className="w-6 absolute bottom-2 right-4" />
      </button>
    </form>
  );
};
