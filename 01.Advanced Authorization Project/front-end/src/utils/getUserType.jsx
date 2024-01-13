const getUserType = (userCode) => {
  let userType
  switch (userCode) {
    case '1995':
      userType = 'admin'
      break;
    case '2001':
      userType = 'user'
      break;
    case '1996':
      userType = 'writer'
      break;
    default:
      userType = 'writer'
      break;
  }
  return userType
}

export default getUserType