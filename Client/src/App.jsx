import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Main, SideSection, MyProfile } from './pages';
import { Login, Notification, PrivateComponent, ShowPost, ShowProfile, SignUp } from './Components';

function App() {
  localStorage.setItem('img', JSON.stringify('http://res.cloudinary.com/dlpzgtx35/image/upload/v1718237737/xjrhsxtrme65pcjfos8q.jpg'));

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
                <Route path="/post/see/:post_id" element={<ShowPost />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Notification />
    </>
  )
}

export default App
