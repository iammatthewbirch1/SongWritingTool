let resultDiv
export default class Tabs {
    constructor() {
        this.activeTab = 'rhymes';
        
        resultDiv = document.getElementById('result');

        this.rhymes = document.getElementsByClassName('rhymesTab')[0];
        this.rhymes.name = 'rhymes';
        this.synonyms = document.getElementsByClassName('synonymsTab')[0];
        this.synonyms.name = 'synonyms';
        this.definition = document.getElementsByClassName('definitionTab')[0];
        this.definition.name = 'definition';
        
        this.children = [this.rhymes, this.synonyms, this.definition];
        
        this.children.forEach(tab => {
            tab.addEventListener('click', () => {
                this.children.forEach(allTabs => {
                    allTabs.classList.remove('active');
                })
                tab.classList.add('active');
                this.activeTab = tab.name; 
                this.displayResult(); 
            });
        })
    }

    displayResult(tab = this.activeTab) {
        switch(tab){
            case 'rhymes':
                this.showRhymes();
                break;
            case 'synonyms':
                this.showSynonyms();
                break;
            case 'definition':
                this.showDefinition();
                break;
        }
    }

    showRhymes() {
        if(!DataMuse.savedRhyme) return;
        let result = DataMuse.savedRhyme;
        resultDiv.innerHTML = '';

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
            backToRhymeBtn.addEventListener('click', () => displayResult(DataMuse.savedRhyme, 'rhyme'));
            resultDiv.appendChild(backToRhymeBtn);
        }
    }

    showSynonyms() {

    }

    showDefinition() {
        if(!Dictionary.savedDefinition) return;
        let result = Dictionary.savedDefinition;
        resultDiv.innerHTML = '';

        result.forEach(wordGroup => {
            let sylSection = document.createElement('div');
            sylSection.classList.add('section');

            let wordGroupTitle = document.createElement('p');
            wordGroupTitle.classList.add('wordGroup');
            sylSection.appendChild(wordGroupTitle);
            wordGroupTitle.innerHTML = wordGroup.meanings[0].partOfSpeech;

            wordGroup.definitions.forEach(definition => {
                let wordDefinition = document.createElement('p');
                wordDefinition.classList.add('wordDefinition');
                wordDefinition.innerHTML = definition.definition;
                sylSection.appendChild(wordDefinition);

                let wordExample = document.createElement('p');
                wordExample.classList.add('wordExample');
                wordExample.innerHTML = definition.example;
                sylSection.appendChild(wordExample);
            });
            
            resultDiv.appendChild(sylSection);
        });

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
            backToRhymeBtn.addEventListener('click', () => displayResult(DataMuse.savedRhyme, 'rhyme'));
            resultDiv.appendChild(backToRhymeBtn);
        }
    }


}