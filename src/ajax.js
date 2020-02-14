
// Have no idea where this is hosted currently
const apiHost = 'https://api.dev.com/'

export default {

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },


    async fetchMatches(competition) {
        let endpoint = apiHost + "/api/getMatchSchedule";
        try {
            let extension = "competitions"


            let response = await fetch(endpoint);
            
            if (this.isJSON(response)) {
                let responseJson = await response.json(response);
                let schedule = responseJson['appBuilding']['team-' + team]['competitions'][competition]['scoutsAndSchedule'];
                return schedule;
            } else {
                console.warn("Not valid JSON in endpoint "+endpoint)
            }

            
            
            
        } catch(error) {
            console.error(error);
        }
    },

    async submitMatchData() {
        let endpoint = apiHost + "/api/submitMatchData";
        try {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstParam: 'yourValue',
                    secondParam: 'yourOtherValue',
                }),
            });
        } catch(error) {
            console.error(error);
        }
    }





};