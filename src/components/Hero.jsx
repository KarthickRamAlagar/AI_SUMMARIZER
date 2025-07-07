import { logo } from '../assets'
import github from '../assets/github-logo.png'
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10  pt-3'>
        <img src={logo} alt='Sunz_logo' className='w-28 object-contain' />
        <button
          type='button'
          onClick={() => window.open('https://github.com/karthickramalagar')}
          className='black_btn group flex items-center gap-2 py-2 px-4 text-sm max-sm:text-xs mas-sm:px-3 text-white cursor-pointer'
        >
          <img
            src={github}
            alt='GitHub Icon' 
            className='w-5 h-5 max-sm:w-4 max-sm:h-4 invert group-hover:invert-0 transition'
          />
          <span>GitHub</span>
        </button>
      </nav>
      <h1 className='head_text'>
        Summarize Article with <br className='max-md:hidden' />
        <span className='orange_gradient'>Open AI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summarize, an open-source article summarizer
        that transforms lengthy articles into concise summaries using the power
        of OpenAI's GPT-4 model.
      </h2>
    </header>
  )
}

export default Hero
