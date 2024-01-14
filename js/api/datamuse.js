export default class DataMuse {
    constructor() {
        this.savedRhyme;
        this.savedNearRhyme;
        this.lastQuery;
    }

    async sendRequest(searchInput, query) {
        return new Promise(async resolve => {

            const API = { base: 'https://api.datamuse.com/words' }
            const QUERY_PARAMS = {
                // Rhymes ("perfect" rhymes, per RhymeZone)	
                // spade → aid
                rhyme: 'rel_rhy',
                // Approximate rhymes (per RhymeZone)	
                // forest → chorus
                nearRhyme: 'rel_nry',
                //Synonyms (words contained within the same WordNet synset)	
                // ocean → sea
                synonym: 'rel_syn',
                related: 'rel_spc'
            }
            
            const url = `${API.base}?${QUERY_PARAMS[query]}=${searchInput}`;
            
            
            const options = {
                method: 'GET'
            };
            
            try {
                const rhymeResponse = await fetch(url, options);
                const rhymeResult = await rhymeResponse.text();
                if(query == 'rhyme') this.savedRhyme = JSON.parse(rhymeResult);
                if(query == 'nearRhyme') this.savedNearRhyme = JSON.parse(rhymeResult);
                this.lastQuery = query;
                resolve();
            } catch (error) {
                console.error(error);
            }
        })
    }
} 