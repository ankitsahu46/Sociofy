const GetUserNameUnderLineText = (isAvailable) => {
  if (isAvailable === "checking") return (<span className="text-yellow-600">checking...</span>);
  else if (isAvailable === "error") return (<span className="text-red-600">Username can not contain spaces!</span>);
  else if (isAvailable === true) return (<span className="text-green-500">Available.</span>);
  else if (isAvailable === false) return (<span className="text-red-600">Not Available!</span>);
}

export default GetUserNameUnderLineText;