import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Authenticated } from 'convex/react';
import { InputBox } from './InputBox';
import { NewCollectionForm } from './NewCollectionForm';
import { CollectionsList } from './CollectionsList';
import { VideoList } from './VideoList';
import { useCollectionContext } from '../CollectionContext';

export const SideBar = () => {
  const [view, setView] = useState<'knowledge-base' | 'collections'>(
    'knowledge-base'
  );

  const { collectionInfo, setCollection } = useCollectionContext();

  const handleBackNavigation = () => {
    setView('knowledge-base');
    setCollection('', 'all');
  };

  return (
    <div className="flex flex-col min-w-[350px] max-w-[350px] grow-0 h-[calc(100vh-65px)] p-4 bg-slate-200 ">
      <div className="flex align-center mb-2">
        {view === 'collections' && (
          <>
            <ArrowLeftIcon
              className="w-6 cursor-pointer"
              onClick={handleBackNavigation}
            />
            <h2 className="ml-2 text-2xl select-none">{collectionInfo.name}</h2>
          </>
        )}
        {view === 'knowledge-base' && (
          <>
            <h2 className=" text-2xl select-none">Knowledge Base</h2>
          </>
        )}
      </div>

      {view === 'knowledge-base' && (
        <Authenticated>
          <NewCollectionForm />
          <CollectionsList setView={setView} />
        </Authenticated>
      )}

      {view === 'collections' && (
        <Authenticated>
          <InputBox collection={collectionInfo} />
          <VideoList collection={collectionInfo} />
        </Authenticated>
      )}
    </div>
  );
};
