import React, { Component } from 'react';

export default class Pesquisar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            texto: ''
        }

        this.buttonClik = this.buttonClik.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    buttonClik() {
        this.props.buscar(this.state.texto)
    }

    render() {
        return (
            <div>
                <div className='jumbotron text-center'>
                    <h1>{this.props.titulo}</h1>
                    <p>{this.props.descricao}</p>
                    <form>
                        <div className='input-group'>
                            <input type='text'
                                size='50'
                                className='form-control'
                                placeholder={this.props.textoDaCaixa}
                                value={this.state.texto}
                                onChange={this.handleChange('texto')}
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        this.buttonClik()
                                    }
                                }}
                                onKeyUp={event => {
                                    if (event.key === "Escape") {
                                        this.setState({ texto: '' })
                                        this.buttonClik()
                                    }
                                }}
                            />
                            <div className='input-group-btn'>
                                <button type='button'
                                    className='btn btn-danger'
                                    onClick={this.buttonClik()}
                                >Pesquisar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
