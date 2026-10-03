import { createFileRoute } from '@tanstack/react-router'
import {useContext, useEffect, useState } from 'react';
import api from '#/lib/api.ts';
import UrlCard from '#/components/UrlCard';
import { AuthContext } from '#/contexts/authContext';
import { Search } from 'lucide-react';

export const Route = createFileRoute('/_app/myurls')({
  component: MyUrlsPage,
})

interface IncomingUrlType {
    shorturl: string;
    longurl: string;
    clickCount: number;
  }

function MyUrlsPage() {
  const {token, isLoggedIn} = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [urls, setUrls] = useState<IncomingUrlType[]>([]);

  const fetch = async () => {
    try {
      const response = await api.get<IncomingUrlType[]>("/myurls");
      setUrls(response.data);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  const onDelete = async (shorturl: string) => {
    try {
      const id = shorturl.split('/').filter(Boolean).pop();
      if (!id) return;
      await api.delete(`/${id}`);
      setUrls((prev) => prev.filter((url) => url.shorturl !== shorturl));
    } catch (err) {
      console.error("Failed to delete URL:", err);
    }
  };

  useEffect(() => {
    if(isLoggedIn && token) {
      fetch();
    } 
  },[isLoggedIn, token]);

  const filteredUrls = urls.filter((item) => {
    if (!search.trim()) return true;
    const searchVal = search.trim().toLowerCase();
    return (
      item.shorturl.toLowerCase().includes(searchVal) ||
      item.longurl.toLowerCase().includes(searchVal)
    );
  });

  return (
    <main className="min-h-svh mx-auto bg-slate-100">
      <div className="max-w-5xl mx-auto py-6 ">
        <h1 className='font-semibold text-3xl text-gray-800 font-serif'>ShortLinks</h1>
        <div className="flex justify-start gap-x-1.5 mt-6">
          <div className="relative flex items-center">
            <Search size={18} className='absolute left-2.5 text-gray-500 pointer-events-none' />
            <input
              type='text'
              value={search}
              className='block ps-8 py-2 min-w-2xs bg-white border focus:outline focus:outline-amber-400'
              placeholder='Search Links'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <hr className='mt-4 mb-4 bg-amber-400 h-0.5'/>
        {filteredUrls.length > 0 ? (
          filteredUrls.map((item) => (
            <UrlCard
              key={item.shorturl}
              shorturl={item.shorturl}
              longurl={item.longurl}
              clickCount={item.clickCount}
              onDelete={() => onDelete(item.shorturl)}
            />
          ))
        ) : (
          <p className='mt-4 text-gray-500'>
            {urls.length === 0 ? 'None found' : 'No matching links found'}
          </p>
        )}
      </div>
    </main>
  )
}
