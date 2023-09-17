import { useState } from 'react';
import { Authenticated } from 'convex/react';
import { InputBox } from './InputBox';
import { NewCollectionForm } from './NewCollectionForm';
import { CollectionsList } from './CollectionsList';

export const SideBar = () => {
  const [view, setView] = useState<'knowledge-base' | 'collections'>(
    'knowledge-base'
  );
  return (
    <div className="flex flex-col w-3/10 h-[calc(100vh-61px)] p-4 bg-slate-200 ">
      <h2 className="text-lg">Knowledge Base</h2>
      {view === 'knowledge-base' && (
        <Authenticated>
          <NewCollectionForm />
          <CollectionsList />
        </Authenticated>
      )}

      {view === 'collections' && (
        <Authenticated>
          <InputBox />
          <VideoList />
        </Authenticated>
      )}
    </div>
  );
};
