// import WordsApi from './api/wordsapi.js'; 
import DataMuse from './api/datamuse.js'; 

let searchInput, resultDiv, menuBtn;

function init() {
    searchInput = document.getElementById('searchInput');
    resultDiv = document.getElementById('result');
    menuBtn = document.getElementById('menuBtn');

    window.API = new DataMuse();

    searchInput.focus();

    searchInput.addEventListener('search', () => sendRequest('rhyme'));
    
    menuBtn.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        menuBtn.classList.toggle('bi-x-square');
        menuBtn.classList.toggle('bi-pencil-square');
    });
}

function sendRequest(type) {
    if(!searchInput.value) return;
    API.sendRequest(searchInput.value, type, displayResult)
}


function displayResult(result, type) { 
    result = JSON.parse(result);
    resultDiv.innerHTML = '';
    // API.displayResult(result);
    
    const minSyl = Math.min(...result.map(r => r.numSyllables))
    const maxSyl = Math.max(...result.map(r => r.numSyllables))

    for (let i = minSyl; i <= maxSyl; i++) {
        
        let sylSection = document.createElement('div');
        sylSection.classList.add('section');

        let rhymes = result.filter(r => {if(r.numSyllables == i) return r.word}).map(r =>r.word).join(', ');
        if(rhymes.length == 0) continue;
        let words = document.createElement('p');
        words.innerHTML = rhymes;

        let sylTitle = document.createElement('h2');
        sylTitle.innerHTML = i + ' syllable' + (i == 1 ? '' : 's');
        
        sylSection.appendChild(sylTitle);
        sylSection.appendChild(words);


        resultDiv.appendChild(sylSection);
    }

    if(type != 'nearRhyme'){
        let nearRhymeBtn = document.createElement('button');
        nearRhymeBtn.id = 'nearRhymeBtn';
        nearRhymeBtn.innerHTML = 'near rhymes';
        nearRhymeBtn.addEventListener('click', () => sendRequest('nearRhyme'));
        resultDiv.appendChild(nearRhymeBtn);
    } else {
        let backToRhymeBtn = document.createElement('button');
        backToRhymeBtn.id = 'backToRhymeBtn';
        backToRhymeBtn.innerHTML = 'back';
        backToRhymeBtn.addEventListener('click', () => displayResult(window.API.savedRhyme, 'rhyme'));
        resultDiv.appendChild(backToRhymeBtn);
    }
}

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    init();
});