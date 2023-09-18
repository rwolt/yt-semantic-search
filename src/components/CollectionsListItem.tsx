import { CircleStackIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useCollectionContext } from "../CollectionContext";

type CollectionsListItemProps = {
  name: string;
  id: Id<"collections"> | "all";
  setView: Dispatch<SetStateAction<"knowledge-base" | "collections">>;
};

export const CollectionsListItem = ({
  name,
  id,
  setView,
}: CollectionsListItemProps) => {
  const { setCollection } = useCollectionContext();
  const handleClick = (id: Id<"collections"> | "all") => {
    setCollection(name, id);
    setView("collections");
  };

  return (
    <div
      className="flex flex-row align-center mb-2 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <CircleStackIcon className="w-6 shrink-0" />
      <div className="ml-2 flex flex-col overflow-hidden">
        <p className="whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};
