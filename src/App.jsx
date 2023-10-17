import './App.css'
import { Header, Main } from './Components'

function App() {
  return (
    <>
      <div className='w-full m-0 p-0 h-full bg-white'>
        <div className='grid grid-cols-12'>
          <Header />
          <Main />
        </div>
      </div>
    </>
  )
}

export default App
