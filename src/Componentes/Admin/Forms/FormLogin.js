import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import { auth } from '../../../util/firebaseUtils'

import './Login.css'

export default class FormLogin extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            erro: false,
            loading: false,
            logged: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        toastr.clear()
        this.setState({ loading: true })

        let email = this.state.email
        let password = this.state.password

        auth.signInWithEmailAndPassword(email, password).then(user => {
            this.setState({ erro: false, loading: false, logged: true })
        }).catch(err => {
            toastr.error('Suas credências não conferem', 'ERROR:', { timeOut: 4500 })
            this.setState({ erro: true, loading: false, logged: false })
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {

        if (this.state.logged) {
            return <Redirect to="/admin/menu" />
        }

        return (

            <div className='container'>
                <br /><br />
                <div style={{ borderBottom: '1px solid #080808' }}>
                    <h1>Painel Administratvo <small>Área Restrita</small></h1>
                </div>

                <form className='form-signin' onSubmit={this.handleSubmit}>
                    <h2 className='form-signin-heading'>Faça Login</h2>
                    <label htmlFor='inputEmail' className='sr-only'>Email</label>
                    <input type='email'
                        required
                        id='inputEmail'
                        autoFocus={true}
                        className='form-control'
                        value={this.state.email}
                        placeholder='Endereço de Email'
                        onChange={this.handleChange('email')}
                    />
                    <label htmlFor='inputPassword' className='sr-only'>Senha</label>
                    <input type='password'
                        required
                        id='inputPassword'
                        className='form-control'
                        placeholder='Senha'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                    {this.state.erro && <span id="erroLogin" className="alert-danger">Dados incorretos.</span>}
                    {/* <div className='checkbox'>
                        <label><input type='checkbox' value='remember' /> Lembrar</label>
                    </div> */}
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}
