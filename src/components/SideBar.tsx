import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Authenticated } from 'convex/react';
import { InputBox } from './InputBox';
import { NewCollectionForm } from './NewCollectionForm';
import { CollectionsList } from './CollectionsList';
import { VideoList } from './VideoList';

export const SideBar = () => {
  const [view, setView] = useState<'knowledge-base' | 'collections'>(
    'knowledge-base'
  );
  const [collection, setCollection] = useState('');

  const handleBackNavigation = () => {
    setView('knowledge-base');
    setCollection('');
  };

  return (
    <div className="flex flex-col w-3/10 h-[calc(100vh-61px)] p-4 bg-slate-200 ">
      <div className="flex align-center mb-2">
        {view === 'collections' && (
          <>
            <ArrowLeftIcon className="w-5" onClick={handleBackNavigation} />
            <h2 className="ml-2">Collection Name</h2>
          </>
        )}
        {view === 'knowledge-base' && (
          <>
            <h2 className="ml-5">Knowledge Base</h2>
          </>
        )}
      </div>

      {view === 'knowledge-base' && (
        <Authenticated>
          <NewCollectionForm />
          <CollectionsList setView={setView} setCollection={setCollection} />
        </Authenticated>
      )}

      {view === 'collections' && (
        <Authenticated>
          <InputBox />
          <VideoList collection={collection} />
        </Authenticated>
      )}
    </div>
  );
};
