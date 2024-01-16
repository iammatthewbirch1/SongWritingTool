export default class Dictionary {
    constructor() {
        this.savedDefinition;
    }

    async sendRequest(searchInput, query) {
        return new Promise(async resolve => {
            const API = { base: 'https://api.dictionaryapi.dev/api/v2/entries/en/' }
            const url = `${API.base}${searchInput}`;
            
            const options = {
                method: 'GET'
            };
            
            try {
                const dictionaryResponse = await fetch(url, options);
                const dictionaryResult = await dictionaryResponse.text();
                this.savedDefinition = this.parseResult(dictionaryResult);
                resolve();
            } catch (error) {
                console.error(error);
            }
        });
    }

    parseResult(result) {
        result = JSON.parse(result);
        let newResult = {};
        newResult.wordTypes = [];
        newResult.phonetic = result[0].phonetic;
        newResult.word = result[0].word;

        result.forEach(r => {
            r.meanings.forEach(meaning => {
                if(!newResult.wordTypes[meaning.partOfSpeech]) newResult.wordTypes[meaning.partOfSpeech] = [];
                
                newResult.wordTypes[meaning.partOfSpeech].push({
                    'synonyms': meaning.synonyms,
                    'antonyms': meaning.antonyms,
                    'definitions': meaning.definitions.map(definition => { return {'definition': definition.definition, 'example': definition.example}})
                });
                 
            });
        });

        return newResult;
    }
} 