"use strict";

let BD = [
    {
        "uf": "Brasil",
        "suspeitos": "<div class='spinner grey'></div>",
        "confirmados": "<div class='spinner blue'></div>",
        "obitos": "<div class='spinner brown'></div>"
    }
];

const showData = (data ) => {
    const panel = `
        <div class="estado">
            ${data.uf}
        </div>

        <div class='card suspeitos'>
            <div class='numeros'> ${data.suspeitos} </div>
            <div class='titulo'> SUSPEITOS </div>
        </div>

        <div class='card confirmados'>
            <div class='numeros'> ${data.confirmados} </div>
            <div class='titulo'> CONFIRMADOS </div>
        </div>

        <div class='card obitos'>
            <div class='numeros'> ${data.obitos} </div>
            <div class='titulo'> OBITOS </div>
        </div>
    `;

    const $container = document.createElement ('div');
    $container.innerHTML = panel;
    
    const $info = document.getElementById ('info');
    $info.removeChild ( $info.firstChild );
    $info.appendChild ($container);
};

const getCovidBrasil = async () => {

    const url = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil';
    const getApi = await fetch (url);
    const json = await getApi.json();
    const brasil = await {
        "uf": "Brasil",
        "suspeitos": json.data.cases,
        "confirmados": json.data.confirmed,
        "obitos": json.data.deaths
    }

    showData( brasil );
}
const getCovidState = async () => {
    const url = 'https://covid19-brazil-api.now.sh/api/report/v1/';
    const getApi = await fetch (url);
    const json = await getApi.json();
    BD = await json.data;
}

const findState = (e) => {
    const ufMap = e.target.parentNode.id;
    const getState = BD.find( state => state.uf.match (ufMap) );
    const state = {
        "uf": getState.uf,
        "suspeitos": getState.suspects,
        "confirmados": getState.cases,
        "obitos": getState.deaths
    }
    showData(state);
}

document.querySelector('svg').addEventListener('click', findState);

showData ( BD[0] ) ; 
getCovidState();
getCovidBrasil ();
