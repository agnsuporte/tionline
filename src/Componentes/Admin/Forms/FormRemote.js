import React, { Component } from 'react'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import { dataAtual } from '../../../util/dateUtils'
import fbDatabase from '../../../util/firebaseUtils'
import FirebaseService from '../../../services/FirebaseService'

import './styles.css'

export default class FormRemote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            app: 'TeamViewer',
            number: '',
            password: '',
            description: '',
            date: '',
            data: []
        }

        this.add = this.add.bind(this)
        this.upd = this.upd.bind(this)
        this.handleClearState = this.handleClearState.bind(this)
    }

    componentWillMount() {

        const { id } = this.props.match.params

        fbDatabase.fetch('app-remote', {
            context: this,
            asArray: true
        }).then(data => {
            this.setState({ data })
        }).catch(error => {
            console.log('ERRO [SelectApp]:', error)
        })

        if (!(id === undefined || !id)) {
            this.setState({ id })
            FirebaseService.getUniqueDataById('remote', id, (data) => this.setState({ ...data }))
        }

    }

    handleSubmit = (event) => {

        event.preventDefault()

        toastr.clear()
        toastr.options.closeButton = true

        let data = dataAtual()

        let objToSubmit = {
            date: data,
            app: this.state.app,
            number: this.state.number,
            password: this.state.password,
            description: this.state.description,
        }

        if (this.props.match.params.id === undefined) {
            this.add(objToSubmit)
        } else {
            this.upd(this.props.match.params.id, objToSubmit)
        }

    }

    add(objAdd) {

        fbDatabase.push('remote', {
            data: objAdd
        }).then(() => {
            this.handleClearState()
            toastr.success('Registro salvo com sucesso.', 'SUCESSO:', { timeOut: 3500 })
            this.props.history.push('/admin/remote/index')
        }).catch(err => {
            console.log('ERRO [SALVA]:', err)
        })

    }

    upd(id, objUpd) {

        let result = FirebaseService.updateData(id, 'remote', objUpd)

        result.then((r) => {
            toastr.success('Registro salvo com sucesso.', 'SUCESSO:', { timeOut: 3500 })
        }).catch((err) => {
            toastr.error(err, 'ERROR:', { timeOut: 4500 })
        })

        this.handleClearState()
        this.props.history.push('/admin/remote/index')
    }

    handleClearState() {
        this.setState({
            id: null,
            app: 'TeamViewer',
            number: '',
            password: '',
            description: '',
            date: '',
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {
        return (
            <div id="box-container" className='container-fluid'>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div id="alertSuccess" className="alert alert-success" role="alert" style={{ display: "none" }}>
                        <strong>Sucesso!</strong> Registro salvo.
                    </div>
                    <div className='form-group'>
                        <label htmlFor='colFormApp'>Aplicativo</label>
                        <select
                            id="colFormApp"
                            className="form-control"
                            autoFocus={true}
                            value={this.state.app}
                            onChange={this.handleChange('app')}>
                            {
                                this.state.data.map((item, index) =>
                                    <option key={item.key} value={item.app}>{item.app}</option>
                                )
                            }
                            <option key={1000} value='Outros'>Outros</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='colFormID'>ID do Parceiro</label>
                        <input
                            required
                            type="text"
                            id="colFormID"
                            className="form-control"
                            value={this.state.number}
                            onChange={this.handleChange('number')}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='colFormPass'>Senha</label>
                        <input
                            required
                            type="text"
                            id="colFormPass"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='colFormDescrip'>Obseervação</label>
                        <input
                            required
                            type="text"
                            id="colFormDescrip"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                        />
                    </div>

                    <button type='submit' className='btn btn-default'>Salvar</button>
                </form>
            </div>
        )
    }

}