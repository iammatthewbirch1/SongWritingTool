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
                this.savedDefinition = JSON.parse(dictionaryResult);
                resolve();
            } catch (error) {
                console.error(error);
            }
        });
    }
} 