import React from 'react';
import { Link } from 'react-router-dom'

const Cabecalho = props => {

    let linkToUserLogged = '/login'
    let textoUserLogged = 'ENTRAR'

    if (props.userLogged) {
        linkToUserLogged = '/logoff'
        textoUserLogged = 'SAIR'
    }

    return (
        <div style={{ marginBottom: "25px" }}>
            <nav className='navbar navbar-inverse navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#navbarHeard'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link to='/' className='navbar-brand'>Logo</Link>
                    </div>
                    <div className='collapse navbar-collapse' id='navbarHeard'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><Link to='/'>INÍCIO</Link></li>
                            <li><Link to='/Remote'>REMOTO</Link></li>
                            <li><Link to={linkToUserLogged}>{textoUserLogged}</Link></li>

                            {
                                props.userLogged && (
                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ADMIN <span className="caret"></span></Link>
                                        <ul className="dropdown-menu navbar-inverse" >
                                            <li><Link to='/admin/menu'>ADM</Link></li>
                                            <li><Link to='/admin/remote/index'>Acesso Remoto</Link></li>
                                        </ul>
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Cabecalho;