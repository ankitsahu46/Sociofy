/* eslint-disable react/prop-types */

import Loader from "./Loader"

function Loading({ loading, classes="w-full h-full"}) {
  return (
    <div className={`${classes} flex justify-center items-center text-2xl font-medium text-[var(--blue)]`}>
      {
        loading ?
          <Loader />
          :
          <span>No post Found</span>
      }
    </div>
  )
}

export default Loading