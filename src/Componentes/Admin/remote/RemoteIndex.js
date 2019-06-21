import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import Pesquisar from '../../Pesquisar/Pesquisar';
import fbDatabase from '../../../util/firebaseUtils';
import FirebaseService from '../../../services/FirebaseService';

import './styles.css';

export default class RemoteIndex extends Component {

    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            remote: {}
        }

        this.handleLista = this.handleLista.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.handleLista('')
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleLista(texto) {

        fbDatabase.fetch('remote', {
            context: this,
            asArray: true
        }).then(data => {

            let dados = data.reverse()

            if (texto.length > 0) {
                dados = dados.filter((elem) => {
                    let val = elem.description.toLowerCase();
                    return (val.indexOf(texto.toLowerCase()) > -1);
                });
            }

            if (this._isMounted) {
                this.setState({ remote: dados })
            }

        }).catch(error => {
            console.log('ERRO [REMOTE]:', error);
        })
    }

    remove = async (id) => {
        let resp = window.confirm("Deseja realmente excluir este item?");
        if (resp) {
            await FirebaseService.remove(id, 'remote');
            await toastr.success('Registro Excluido.', 'SUCESSO:', { timeOut: 3500 })
            await this.handleLista('');
        }
    }

    render() {

        return (
            <div id='adm-remote-index'>

                <Pesquisar
                    titulo='Acesso Remoto'
                    descricao='Relação de identificadores para acesso remoto'
                    textoDaCaixa='Pesquisar pela Descrição'
                    buscar={texto => this.handleLista(texto)}
                />

                <header>
                    <Link to='/admin/remote/form' className='btn btn-info'>
                        <span className='glyphicon glyphicon-check'> Novo</span>
                    </Link>
                </header>

                <ul>
                    {Object.keys(this.state.remote).map(key => {
                        let conteudo = this.state.remote[key]
                        return (
                            <li key={conteudo.key}>
                                <strong data-toggle="tooltip" data-placement="top" title={conteudo.password}>
                                    <h3>{conteudo.number}</h3>
                                    {conteudo.description} - [{conteudo.app}]
                                </strong>
                                <strong>
                                    <Link to={'/admin/remote/form/' + conteudo.key} className='btn btn-default link' data-toggle="tooltip" data-placement="top" title="Editar">
                                        <span className='glyphicon glyphicon-pencil'></span>
                                    </Link>
                                    <button onClick={() => this.remove(conteudo.key)} className='btn btn-default link' data-toggle="tooltip" data-placement="top" title="Excluir">
                                        <span className='glyphicon glyphicon-trash'></span>
                                    </button>
                                </strong>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
}

