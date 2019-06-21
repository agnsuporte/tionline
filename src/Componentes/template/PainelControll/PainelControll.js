import React from 'react';
import { Link } from 'react-router-dom';

const PainelControll = props => {

    return (
        <div>
            <div id='services' className='container-fluid text-center'>

                <br />
                <div className='row '>
                    <div className='col-sm-4' >
                        <Link to='/admin/remote/index' className='btn btn-default' style={{ width: "70%" }}>
                            {/* <span className='glyphicon glyphicon-off logo-small'></span> */}
                            <span className='glyphicon glyphicon-import logo-small'></span>
                            <h4>REMOTO</h4>
                            {/* <p className="text-center">Gerenciar Acesso Remoto</p> */}
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/admin/menu/#' className='btn btn-default' style={{ width: "70%" }}>
                            <span className='glyphicon glyphicon-header logo-small'></span>
                            <h4>HOTEL</h4>
                            {/* <p>Registrar Hotel</p> */}
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/admin/menu/#' className='btn btn-default' style={{ width: "70%" }}>
                            <span className='glyphicon glyphicon-tags logo-small'></span>
                            <h4>SETOR</h4>
                            {/* <p>Registrar Setor/Departamento</p> */}
                        </Link>
                    </div>
                </div>
                <br /><br />
                <div className='row '>
                    <div className='col-sm-4'>
                        <Link to='/admin/menu/#' className='btn btn-default' style={{ width: "70%" }}>
                            <span className='glyphicon glyphicon-phone-alt logo-small'></span>
                            <h4>RAMAL</h4>
                            {/* <p>Registrar Ramal / Setor</p> */}
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/admin/menu/#' className='btn btn-default' style={{ width: "70%" }}>
                            <span className='glyphicon glyphicon-user logo-small'></span>
                            <h4>USUÁRIOS</h4>
                            {/* <p>Acesso e Permissões</p> */}
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/admin/menu/#' className='btn btn-default' style={{ width: "70%" }}>
                            <span className='glyphicon glyphicon-wrench logo-small'></span>
                            <h4 style={{ color: '#303030' }}>CONFIGURAÇÕES</h4>
                            {/* <p>Lorem ipsum dolor sit amet..</p> */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PainelControll