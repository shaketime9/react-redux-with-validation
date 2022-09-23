import React from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector} from 'react-redux'
import { updateVal } from './slice'
import { Button, Container, FlexboxGrid, Input, Tooltip, Whisper} from 'rsuite'
import * as yup from 'yup'
import { useDebouncedCallback } from 'use-debounce'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().required().oneOf([yup.ref("password")],   'Passwords must match'),
    username : yup.string().test('username', "We already got this username" , async(inputValue)=> {
        const data = await ( await fetch ('https://jsonplaceholder.typicode.com/users').then(res => res.json()))

        const user = data.find(({username}) => username === inputValue)
        return user ? false : true
    })
})
const selectEmail = state => state.register.email
const selectPassword = state => state.register.password


const Register = () => {
    const email = useSelector(selectEmail)
    const password = useSelector(selectPassword)
    const dispatch = useDispatch()
    const updateStore = useDebouncedCallback((key,val) => {
        dispatch(updateVal({key, val}))},375)
    
    
  return <Container style={{height:'100vh', display:"flex"}}>
            <FlexboxGrid align='middle' justify='center' style={{height:"100vh"}}>
                <Formik
                validateOnChange={false} 
                initialValues={{
                    username: '',
                    email: email,
                    password: password,
                    passwordConfirmation: '',
                }}
                validationSchema={schema}
                onSubmit = {(values) => {
                    console.log({values})

                }}
                >
                    {({handleSubmit, handleChange, handleBlur, isValid, errors, touched , values})=>{
                        return <form onSubmit={handleSubmit}>
                            <Whisper trigger="none" open={errors.username && touched.username} speaker={<Tooltip>{errors.username}</Tooltip>}>
                            <Input
                             className='mb-20'
                             type="text"
                             name='username'
                             placeholder='Username'
                             onChange={( val, event) =>
                                {handleChange(event)
                                 updateStore('username' , val)
                            }}
                             onBlur={handleBlur}
                             value = {values.username}
                             />
                             </Whisper>
                             <Whisper trigger="none" open={errors.email && touched.email} speaker={<Tooltip>{errors.email}</Tooltip>}>
                                <Input
                                className='mb-20'
                                type="email"
                                name='email'
                                placeholder='E-mail'
                                onChange={( val, event) =>
                                    {handleChange(event)
                                     updateStore('email' , val)
                                }}
                                style= {{borderColor: errors.email ? 'red' : 'inherit'}}
                                onBlur={handleBlur}
                                value = {values.email}
                                />
                             </Whisper>
                             <Whisper trigger="none" open={errors.password && touched.password} speaker={<Tooltip>{errors.password}</Tooltip>}>
                             <Input
                             className='mb-20'
                             type='password'
                             name='password'
                             placeholder='Password'
                             onChange={( val, event) =>
                                {handleChange(event)
                                 updateStore('password' , val)
                             }}
                             style= {{borderColor: errors.password ? 'red' : 'inherit'}}
                             onBlur={handleBlur}
                             value = {values.password}
                             />
                             </Whisper>
                             <Whisper trigger="none" open={errors.passwordConfirmation && touched.passwordConfirmation} speaker={<Tooltip>{errors.passwordConfirmation}</Tooltip>}>
                             <Input
                             className='mb-20'
                             type='password'
                             name='passwordConfirmation'
                             placeholder='Password Confirmation'
                             onChange={( val, event) =>
                                {handleChange(event)
                                 updateStore('passwordConfrimation' , val)
                             }}
                             style= {{borderColor: errors.passwordConfirmation? 'red' : 'inherit'}}
                             onBlur={handleBlur}
                             value = {values.passwordConfirmation}
                             />
                             </Whisper>
                            <Button type="submit" disabled={!isValid}>Submit</Button>
                        </form>
                    }}
                </Formik>
            </FlexboxGrid>
</Container>
}


export default Register