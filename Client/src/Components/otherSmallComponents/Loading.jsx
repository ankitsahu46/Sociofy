/* eslint-disable react/prop-types */

function Loading({ loading, classes="w-full h-full"}) {
  return (
    <div className={`${classes} flex justify-center items-center text-2xl font-medium text-[var(--blue)]`}>
      {
        loading ?
          <span>Loading...</span>
          :
          <span>No post Found</span>
      }
    </div>
  )
}

export default Loading