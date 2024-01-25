import { faBookOpenReader, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    id: '1',
    name: 'Users',
    path: 'users',
    icon: faUsers,
    role: '1995'
  },
  {
    id: '2',
    name: 'Add User',
    path: '/dashboard/user/add',
    icon: faPlus,
    role: '1995'
  },
  {
    id: '3',
    name: 'Writer',
    path: '/dashboard/writer',
    icon: faBookOpenReader,
    role: ['1995', '1996']
  },
]

//NOTES
/*
link = {
  id: string,
  name: string || NavLink name,
  paht: strnig || NavLink path => to={path},
  icon: fontawesome icon,
  role: string || the user role 
}
*/