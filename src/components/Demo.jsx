import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'
const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })
  const [allArticles, setAllArticles] = useState([])
  const [trigger, { data, error, isFetching }] = useLazyGetSummaryQuery()
  const[copied,setCopied] =useState('')
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await trigger({ articleUrl: article.url })
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]
      setArticle(newArticle)
      setAllArticles(updatedAllArticles)
      console.log(newArticle)
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }
  const summarySentences = article.summary
    ? article.summary.split('. ').filter(s => s.trim().length > 0)
    : []

    const handleCopy=(copyUrl)=>{
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(''), 3000)
    }
  return (
    <section className='mt-16 w-full max-w-2xl'>
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-between items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input
            type='url'
            placeholder='Enter a URL (ex:https://github.com/karthickramalagar)'
            value={article.url}
            onChange={e => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer'
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            <p>↵</p>
          </button>
        </form>
        {/* Browser URL History */}
        <div className='flex flex-col gap-1  max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn'   onClick={()=>handleCopy( item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt='copy-icon'
                  className='w-[40%] h-[40%] object-contain'
                
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flexx justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-10 h-20 object-contain flex justify-center items-center' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, That wasn't supposed to happen
            <br />
            <span className='font-satoshi font-normal'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <ul className='list-disc pl-5 space-y-2 text-justify'>
                  {summarySentences.map((sentence, index) => (
                    <li
                      key={index}
                      className='font-inter font-medium text-sm text-gray-700'
                    >
                      {sentence}.
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
