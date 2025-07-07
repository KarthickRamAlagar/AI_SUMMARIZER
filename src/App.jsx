
import './App.css'
import Hero from './components/Hero'
import Demo from './components/Demo'
const App = () => {
  return (
    <div>
       <main>
        <div className="main">
          {/* for background gradient */}
          <div className='gradient'/>  
          <div className="app">
          <Hero/>
          <Demo/>
          </div>
        </div>
       </main>

    </div>
  )
}

export default App