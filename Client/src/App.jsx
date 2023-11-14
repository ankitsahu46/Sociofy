import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages';
import { Login, PrivateComponent, ShowPost, SignUp } from './Components';

function App() {
  return (
    <>
      <div className='w-full m-0 p-0 h-full bg-white'>
        <div className='flex max-h-[100vh]'>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateComponent />} >
                <Route path="/" element={<Main />} />
                <Route path="/post/see/:id" element={<ShowPost />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
