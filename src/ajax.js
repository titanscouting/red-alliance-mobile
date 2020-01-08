const apiHost = 'https://api.myjson.com/bins/hram8'

export default {
    async fetchMatches(team, competition) {
        try {
            // let response = await fetch(apiHost + '/appBuilding/team-2022/competitions/');
            let response = await fetch(apiHost);
            let responseJson = await response.json(response);
            let schedule = responseJson['appBuilding']['team-' + team]['competitions'][competition]['scoutsAndSchedule'];
            return schedule;
        } catch(error) {
            console.error(error);
        }
    }
};