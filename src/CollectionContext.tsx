import { useState, createContext, PropsWithChildren, useContext } from "react";
import { Id } from "../convex/_generated/dataModel";

export type CollectionState = {
  name: string;
  id: Id<"collections"> | "all";
};

type CollectionContextType = {
  collectionInfo: CollectionState;
  setCollection: (name: string, id: Id<"collections"> | "all") => void;
};

export const CollectionContext = createContext({} as CollectionContextType);

export const useCollectionContext = () => {
  return useContext(CollectionContext);
};

export const CollectionProvider = ({ children }: PropsWithChildren) => {
  const [collectionInfo, setCollectionInfo] = useState<CollectionState>({
    name: "",
    id: "all",
  });

  const setCollection = (name: string, id: Id<"collections"> | "all") => {
    setCollectionInfo({ name, id });
  };

  return (
    <CollectionContext.Provider value={{ collectionInfo, setCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};
