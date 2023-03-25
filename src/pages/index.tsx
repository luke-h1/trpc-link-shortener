import { trpc } from '@frontend/utils/trpc';
import { Link } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>('');
  const [link, setLink] = useState<Link | undefined>(undefined);

  const create = trpc.useMutation('link.create', {
    onSuccess: setLink,
  });

  const onCreate = () => {
    create.mutate({ url });
  };
  const onCopy = (slug: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/${slug}`);
  };

  return (
    <>
      <Head>
        <title>TRPC url shortener</title>
      </Head>
      <main className="flex h-screen bg-gray-50">
        <div className="m-auto flex w-full max-w-sm flex-col">
          <h1 className="text-center text-xl font-semibold text-slate-700">
            TRPC link shortener
          </h1>
          <div className="mt-2 flex w-full flex-col rounded bg-white p-4 shadow-lg">
            <input
              type="url"
              id="url"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://www.google.com"
              className="h-10 rounded px-2"
            />
            <button
              className="mt-4 h-10 rounded bg-slate-700 text-white"
              onClick={onCreate}
              disabled={create.isLoading || !url}
              type="button"
            >
              Create a tiny link via TRPC
            </button>
          </div>
          {create.isLoading && (
            <div className="relative mt-4 cursor-pointer rounded bg-white p-4 shadow-lg">
              <div className="mb-3 h-5 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transform animate-pulse rounded bg-gray-200" />
            </div>
          )}
          {!create.isLoading ||
            (create.isError && link && (
              <button
                className="relative mt-4 cursor-pointer rounded bg-white p-4 shadow-lg"
                onClick={() => onCopy(link.slug)}
                type="button"
              >
                <p className="mb-1">
                  {process.env.NEXT_PUBLIC_URL}
                  {link.slug}
                </p>
                <p className="text-sm text-gray-600">{link.url}</p>
                <FiCopy className="absolute right-4 top-1/2 -translate-y-1/2 transform" />
              </button>
            ))}
          {create.error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">
                {create.error.data?.httpStatus}
              </strong>
              <span className="block sm:inline">{create.error.message}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Home;
