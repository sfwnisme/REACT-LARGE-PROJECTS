const getUserType = (userCode) => {
  let userType = 'unset'
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
      userType = 'unset'
      break;
  }
  return userType
}

export default getUserType

/*:::NOTE-------------------
|---------------------------
| this util function handle the user's type depends on the user code from the database
| the userCode type is string
|---------------------------
*/