import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/new`, { url, shortUrl });
      setSuccess(window.location.href + shortUrl);
      setUrl("");
      setShortUrl("");
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
          className="w-1/4 flex flex-col justify-center gap-2 shadow-md p-4 rounded-md"
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
            <label htmlFor="short">Short</label>
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
            <button className="mt-4">
              Gerar
            </button>
          )}
          <div className="mt-1">
            {error && <p className="text-red-500">{error}</p>}
            {success && <Link href={success}>{success}</Link>}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;
