import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { CollectionsListItem } from '../components/CollectionsListItem';
import { useUser } from '@clerk/clerk-react';
import { Dispatch, SetStateAction } from 'react';

type CollectionsListProps = {
  setView: Dispatch<SetStateAction<'knowledge-base' | 'collections'>>;
  setCollection: Dispatch<SetStateAction<string>>;
};

export const CollectionsList = ({
  setView,
  setCollection,
}: CollectionsListProps) => {
  const { user } = useUser();
  const collections = useQuery(api.collection.getUserCollections, {
    userId: user?.id,
  });

  return (
    <div className="mt-4">
      {collections?.map((item) => (
        <CollectionsListItem
          key={item._id}
          id={item._id}
          name={item.name}
          setView={setView}
          setCollection={setCollection}
        />
      ))}
    </div>
  );
};
