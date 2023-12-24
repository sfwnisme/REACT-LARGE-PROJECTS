import Form from './Components/Form';
import Header from './Components/Header'

const SignUp = () => {

  return (
    <div className="container">
      <Header />
      <div className="register">
        <Form hasLocalStorate={true} endPoint='register' navigateTo='' hasEmailExistence={true} button='Register' />
      </div>
    </div>
  )
}

export default SignUp