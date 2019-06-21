export const dataAtual = () => {
    let data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = (mes.length === 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
}

export const displayShow = (elID) => {
    document.getElementById(elID).style.display = 'block';
}

export const displayNone = (elID) => {
    document.getElementById(elID).style.display = 'none';
}