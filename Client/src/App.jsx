import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Main, SideSection, MyProfile } from './pages';
import { Login, PrivateComponent, ShowPost, ShowProfile, SignUp } from './Components';

function App() {
  return (
    <>
      <div className='w-full m-0 p-0 h-full bg-white'>
        <div className='flex max-h-[100vh]'>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateComponent />} >
                <Route path="/" element={
                  <Main>
                    <Home />
                    <SideSection />
                  </Main>
                } />
                <Route path="/profile" element={
                  <Main>
                    <MyProfile />
                  </Main>
                } />
                <Route path="/profile/see" element={
                  <Main>
                    <ShowProfile />
                  </Main>} />
                <Route path="/profile/post/see/:id/:post_id/:i" element={<ShowPost />} />
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
