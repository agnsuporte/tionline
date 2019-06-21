import React from 'react';

const Rodape = props => {
  return (
    <footer className="container-fluid text-center">

      <address>
        Para mais detalhes, contato  <a href="mailto:agnsuporte@gmail.com"><strong>AGN</strong>Suporte</a>.
        <p>Criado com o Tema do Bootstrap em <a href="https://www.w3schools.com" title="Visit w3schools">www.w3schools.com</a></p>
      </address>

      <small className="copyright">
        <p>Copyright © 2019 - Todos os Direitos Reservados</p>
      </small>
    </footer>
  )

}
export default Rodape;