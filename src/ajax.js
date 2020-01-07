const apiHost = 'https://api.myjson.com/bins/97ves'

export default {
    async fetchMatches(team, competition) {
        try {
            // let response = await fetch(apiHost + '/appBuilding/team-2022/competitions/');
            let response = await fetch(apiHost);
            console.log("RESPONSE");
            console.log(response);
            let responseJson = await response.json(response);
            console.log("RESPONSE JSON");
            console.log(responseJson);
            console.log("Filtered:");
            console.log(responseJson['appBuilding']['team-' + team]['competitions'][competition]['scoutsAndSchedule']);
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }
};