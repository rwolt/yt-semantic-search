import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { CollectionsListItem } from '../components/CollectionsListItem';
import { useUser } from '@clerk/clerk-react';
import { Dispatch, SetStateAction } from 'react';

type CollectionsListProps = {
  setView: Dispatch<SetStateAction<'knowledge-base' | 'collections'>>;
};

export const CollectionsList = ({ setView }: CollectionsListProps) => {
  const { user } = useUser();
  const collections = useQuery(api.collection.getUserCollections, {
    userId: user?.id,
  });

  return (
    <div className="mt-4">
      <CollectionsListItem name="All Collections" id="all" setView={setView} />
      {collections?.map((item) => (
        <CollectionsListItem
          key={item._id}
          id={item._id}
          name={item.name}
          setView={setView}
        />
      ))}
    </div>
  );
};
