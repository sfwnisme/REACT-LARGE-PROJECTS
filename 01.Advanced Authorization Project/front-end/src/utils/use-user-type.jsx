const useUsertype = (code) => {
  let userType

  switch (code) {
    case 1995:
      userType = 'admin'
      break;
    case 2001:
      userType = 'user'
      break;
    case 1996:
      userType = 'writer'
      break;

    // default:
    //   userType = 'user'
    //   break;
  }
  return userType
}

export default useUsertype