import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from '../../util/firebaseUtils'

export default class Logoff extends Component {

    constructor(props) {
        super(props)

        try {
            auth.signOut()
            localStorage.clear()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        // window.location.href = '/'
        return (<Redirect to='/' />)
    }
}
