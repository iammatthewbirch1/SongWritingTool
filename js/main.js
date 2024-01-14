import Tabs from './tabs.js';

import _DataMuse from './api/datamuse.js'; 
import _Dictionary from './api/dictionary.js';

let tabs;
let searchInput, menuBtn;

function init() {
    searchInput = document.getElementById('searchInput');
    menuBtn = document.getElementById('menuBtn');

    tabs = new Tabs();
    window.DataMuse = new _DataMuse();
    window.Dictionary = new _Dictionary();

    searchInput.focus();

    searchInput.addEventListener('search', () => sendRequest('rhyme'));
    
    menuBtn.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        menuBtn.classList.toggle('bi-x-square');
        menuBtn.classList.toggle('bi-pencil-square');
    });
}

async function sendRequest(type) {
    if(!searchInput.value) return;
    await DataMuse.sendRequest(searchInput.value, type)
    await Dictionary.sendRequest(searchInput.value, type)

    tabs.displayResult();
}


function displayResults() { 
    
}

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    init();
});