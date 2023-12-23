/* eslint-disable react/prop-types */
function Main({ children }) {
  return (
    <>
      <main className='order-1 md:order-2 w-full max-h-[100vh-2.5rem] md:max-h-[100vh]'>
        <div className='grid grid-cols-10'>
          {children}
        </div>
      </main>
    </>
  )
}

export default Main