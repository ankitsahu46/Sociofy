import './App.css'
import { Header, Main } from './pages'

function App() {
  return (
    <>
      <div className='w-full m-0 p-0 h-full bg-white'>
        <div className='flex max-h-[100vh]'>
          <Header />
          <Main />
        </div>
      </div>
    </>
  )
}

export default App
