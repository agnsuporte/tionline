import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Menu from './Menu';
import FormRemote from './Forms/FormRemote';
import RemoteIndex from './remote/RemoteIndex';

import { auth } from '../../util/firebaseUtils';

export default class Admin extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            isNotLogged: null
        }
    }

    componentDidMount() {
        this._isMounted = true
        auth.onAuthStateChanged(user => {
            if (this._isMounted) {
                this.setState({ isNotLogged: !user })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {

        let url = this.props.match.url;

        if (this.state.isNotLogged) {
            return <Redirect to='/login' />
        }

        return (

            <div className='container' style={{ marginTop: "50px" }}>

                <div style={{ borderBottom: '1px solid #080808' }}>
                    <h1>Painel Administratvo <small>Área Restrita</small></h1>
                </div>

                <Route path={`${url}/menu`} component={Menu} />
                <Route path={`${url}/remote/index`} exact component={RemoteIndex} />
                <Route path={`${url}/remote/form`} exact component={FormRemote} />
                <Route path={`${url}/remote/form/:id`} component={FormRemote} />

            </div>
        )
    }
}
