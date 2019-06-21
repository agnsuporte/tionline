import React, { Component } from 'react'

import Pesquisar from '../Pesquisar/Pesquisar'
import fbDatabase from '../../util/firebaseUtils'

import './hotel.css'

export default class Hotel extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            setores: {}
        }

        this.getSetores = this.getSetores.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        this.getSetores('')
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getSetores(texto) {

        fbDatabase.fetch('setores', {
            context: this,
            asArray: true
        }).then(data => {

            let array = data
            let dados = array

            if (texto.length > 0) {
                dados = array.filter((elem) => {
                    let ramal = elem.ramal
                    let setor = elem.nome.toLowerCase()
                    return (setor.indexOf(texto.toLowerCase()) > -1 || ramal.indexOf(texto) > -1)
                })
            }

            if (this._isMounted) {
                this.setState({ setores: dados.reverse() })
            }

        }).catch(error => {
            console.log('ERRO [REMOTE]:', error)
        })

    }

    render() {

        const setores = this.state.setores

        return (
            <div className="container">

                <Pesquisar
                    titulo='Ramais'
                    descricao='Relação de ramais dos Hoteis'
                    textoDaCaixa='Pesquisar pelo setor ou ramal'
                    buscar={texto => this.getSetores(texto)}
                />

                <div className="panel-body" id="tab-hotel">
                    <ul>
                        {
                            Object.keys(setores).map((k, i) => {
                                let setor = setores[k]
                                return (
                                    <li key={setor.key}>
                                        <strong><h3>{setor.ramal}</h3><i>{setor.nome}</i></strong>
                                        <span>{setor.nome_hotel}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

