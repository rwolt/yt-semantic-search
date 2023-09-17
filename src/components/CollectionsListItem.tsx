import { PlayIcon } from '@heroicons/react/24/outline';

type CollectionsListItemProps = {
  name: string;
};

export const CollectionsListItem = ({ name }: CollectionsListItemProps) => {
  return (
    <div className="flex flex-row align-center mb-2">
      <PlayIcon className="w-6 shrink-0" />
      <div className="ml-2 flex flex-col overflow-hidden">
        <p className="whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};
