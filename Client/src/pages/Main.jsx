import { ShowPost } from "../Components";
import { Home, SideSection } from "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <>
      <main className='order-1 md:order-2 w-full max-h-[100vh-2.5rem] md:max-h-[100vh]'>
        <div className='grid grid-cols-10'>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <SideSection />
                  </>
                } />
              <Route
                path="/post/see/:id"
                element={
                  <ShowPost />
                } />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  )
}

export default Main