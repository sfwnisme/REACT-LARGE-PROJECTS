import Form from '../../../Components/Form';
import Header from '../../../Components/Header'

const SignUp = () => {

  return (
    <div className="container">
      <Header />
      <div className="register">
        <Form title="Sign Up" hasLocalStorage="true" endPoint='register' navigateTo='' button='Register' />
      </div>
    </div>
  )
}

export default SignUp