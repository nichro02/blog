import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'
import { useNavigate } from 'react-router-dom'

//import components
import FormGroup from '../FormGroup/FormGroup'

//import helpers
import { login } from '../../services/auth.service'

//check required field is populated
const requiredField = (value) => {
    if(!value) {
        return (
            <div>
                This field is required
            </div>
        )
    }
}

const Login = (props) => {
    const form = useRef()
    const checkButton = useRef()
    const navigate = useNavigate()

    //manage state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    //store username onChange
    const onChangeUsername = e => {
        const username = e.target.value
        console.log('UPDATED USERNAME TO ', username)
        setUsername(username)
    }

    //store password onChange
    const onChangePassword = e => {
        const password = e.target.value
        console.log('PASSWORD UPDATED TO ', password)
        setPassword(password)
    }

    //handle login
    const handleLogin = e => {
        e.preventDefault()
        setMessage('')
        setSuccessful(true)

        //validate form fields
        form.current.validateAll()
        //check for errors in form
        if(checkButton.current.context._errors.length === 0){
            login(username, password)
            .then(() => {
                navigate('/')
                window.location.reload()
            },
            (error) => {
                setSuccessful(false)
            }
            )
        } else {
            setSuccessful(false)
        }
    }

    return(
        <div>
            <Form onSubmit={handleLogin} ref={form}>
                <FormGroup text='username'>
                    <Input
                        type='text'
                        className='form-control'
                        name='username'
                        value={username}
                        onChange={onChangeUsername}
                        validations={[requiredField]}
                    />
                </FormGroup>
                <FormGroup text='password'>
                    <Input
                        type='password'
                        className='form-control'
                        name='password'
                        value={password}
                        onChange={onChangePassword}
                        validations={[requiredField]}
                    />
                </FormGroup>
                <button>Sign Up</button>

                <CheckButton style={{ display: "none" }} ref={checkButton} />
            </Form>
        </div>
    )
}

export default Login