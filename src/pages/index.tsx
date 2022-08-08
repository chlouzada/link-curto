import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { LS } from "@/utils/LS";
import dynamic from "next/dynamic";
import { Recent } from "@/components/Recents";

const Recents = dynamic(() => import("@/components/Recents"), { ssr: false });

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");

      const regex =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

      if (!regex.test(url)) {
        setError("URL inválida");
        return;
      }

      setLoading(true);
      const res = await axios.post(`/api/new`, { url, shortUrl });
      setSuccess(window.location.href + shortUrl);
      setUrl("");
      setShortUrl("");

      LS.set(
        "recents",
        [
          { url: url, short: shortUrl, createdAt: new Date().toISOString() },
          ...(LS.get<Recent[]>("recents") || []),
        ].slice(0, 5)
      );

      setLoading(false);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      if (axios.isAxiosError(error))
        if (error.response?.status === 403) return setError("Short já existe");

      setError("Algo deu errado");
    }
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center">
      <div className="flex  items-center flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-1/4 flex flex-col justify-center gap-4 shadow-md p-4 rounded-md"
        >
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="short">Short</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={() => {
                  setShortUrl(generateSlug());
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setShortUrl(e.target.value)}
              value={shortUrl}
            />
          </div>
          {loading ? (
            <button className="mt-4" disabled>
              Enviando...
            </button>
          ) : (
            <button className="mt-4">Gerar</button>
          )}
          {error && <p className="text-red-500">{error}</p>}

          <Recents />
        </form>
      </div>
    </main>
  );
};

export default Home;
