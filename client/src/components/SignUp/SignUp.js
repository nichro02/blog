import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

//import components
import FormGroup from '../FormGroup/FormGroup'

//import helpers
import { register, login } from '../../services/auth.service'

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

//validate username
const validateUsername = (value) => {
    if(value.length < 4 || value.length > 20) {
        return(
            <div>
                Your username must be between 3 and 20 characters
            </div>
        )
    }
}

//validate password
const validatePassword = (value) => {
    if(value.length < 6 || value.length > 40) {
        return(
            <div>
                Your password must be between 6 and 40 characters
            </div>
        )
    }
}

//validate email
const validateEmail = (value) => {
    if(!isEmail(value)){
        return(
            <div>
                Please check the format of your email
            </div>
        )
    }
}

const SignUp = (props) => {
    const form = useRef()
    const checkButton = useRef()

    //manage state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    //store username onChange
    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    //store password onChange
    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    //store email onChange
    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    //handle signup form submit
    const handleSignup = e => {
        //stop page refresh
        e.preventDefault()

        setMessage('')
        setSuccessful(false)

        //validate form fields
        form.current.validateAll()

        //check to see if errors exist
        if(checkButton.current.context._errors.length === 0){
            register(username, email, password)
            .then(response => {
                setMessage(response.data.message)
                setSuccessful(true)

                login(username, password)
                .then(() => {
                    props.history.push('//home')
                    window.location.reload()
                })
            },
            (error) => {
                setMessage(error)
                setSuccessful(false)
            }
            )
        }
    }
    
    return(
        <h1>Sign-inForm goes here</h1>
    )
}


export default SignUp