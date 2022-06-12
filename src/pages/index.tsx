import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = () => {
    fetch(`/api/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, shortUrl }),
    })
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center">
      <div className="flex  items-center flex-col">
        <form onSubmit={handleSubmit} className="w-1/4 flex flex-col justify-center gap-2 shadow-md p-4 rounded-md">
          <div>
            <label htmlFor="url">URL</label>
            <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} />
          </div>
          <div>
            <label htmlFor="short">Short</label>
            <input type="text" onChange={(e) => setShortUrl(e.target.value)} value={shortUrl} />
          </div>
          <button className='mt-4'>Gerar</button>
        </form>
      </div>
    </main>
  )
}

export default Home
