import React, { Component } from 'react'

import Pesquisar from '../Pesquisar/Pesquisar'
import fbDatabase from '../../util/firebaseUtils'

import './remote.css'

export default class Remote extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            remote: {}
        }

        this.getRemote = this.getRemote.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        this.getRemote('')
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getRemote(texto) {

        fbDatabase.fetch('remote', {
            context: this,
            asArray: true
        }).then(data => {

            let array = data.reverse()
            let dados = array

            if (texto.length > 0) {
                dados = array.filter((elem) => {
                    let val = elem.description.toLowerCase()
                    return (val.indexOf(texto.toLowerCase()) > -1)
                })
            }

            if (this._isMounted) {
                this.setState({ remote: dados })
            }

        }).catch(error => {
            console.log('ERRO [REMOTE]:', error)
        })
    }

    render() {

        return (
            <div id="" className="container">

                <Pesquisar
                    titulo='Acesso Remoto'
                    descricao='Relação de identificadores para acesso remoto'
                    textoDaCaixa='Pesquisar pela Descrição'
                    buscar={texto => this.getRemote(texto)}
                />

                <div className="panel-body" id="remote-list">
                    <ul>
                        {Object.keys(this.state.remote).map(key => {
                            let conteudo = this.state.remote[key]
                            return (
                                <li key={conteudo.key}>
                                    <strong><h3>{conteudo.number}</h3>{conteudo.description} - [{conteudo.app}]</strong>
                                    <span data-toggle="tooltip" data-placement="top" title={conteudo.password}>*****</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

