import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
export const DocumentPreview = () => {
  const chatResponse = useQuery(api.message.get);
  return <div className="w-1/2 bg-slate-300 h-full"> {chatResponse?.text}</div>;
};
