import { CircleStackIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { Id } from '../../convex/_generated/dataModel';

type CollectionsListItemProps = {
  name: string;
  id: Id<'collections'>;
  setView: Dispatch<SetStateAction<'knowledge-base' | 'collections'>>;
  setCollection: Dispatch<SetStateAction<string>>;
};

export const CollectionsListItem = ({
  name,
  id,
  setView,
  setCollection,
}: CollectionsListItemProps) => {
  const handleClick = (id: Id<'collections'>) => {
    setCollection(id);
    setView('collections');
  };

  return (
    <div
      className="flex flex-row align-center mb-2"
      onClick={() => handleClick(id)}
    >
      <CircleStackIcon className="w-6 shrink-0" />
      <div className="ml-2 flex flex-col overflow-hidden">
        <p className="whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};
