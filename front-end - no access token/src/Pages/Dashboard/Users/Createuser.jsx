import Form from '../../../Components/Form'

const Createuser = () => {
  return (
    <div className='register'>
      <Form title="Create New User" endPoint='user/create' navigateTo="dashboard/users" button="Create" />
    </div>
  )
}

export default Createuser