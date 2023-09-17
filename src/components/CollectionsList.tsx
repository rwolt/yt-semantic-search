import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { CollectionsListItem } from '../components/CollectionsListItem';
import { useUser } from '@clerk/clerk-react';

export const CollectionsList = () => {
  const { user } = useUser();
  const collections = useQuery(api.collection.getUserCollections, {
    userId: user?.id,
  });

  return (
    <div className="mt-4">
      {collections?.map((item) => (
        <CollectionsListItem key={item._id} name={item.name} />
      ))}
    </div>
  );
};
