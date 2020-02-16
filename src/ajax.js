const apiHost = 'https://scouting-api.herokuapp.com/';
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MmZhNjM3YWY5NTM1OTBkYjhiYjhhNjM2YmYxMWQ0MzYwYWJjOTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjkxODYzNjk4MjQzLWVnNWk0ZmgwMDFuN3NsMjhiMGJxZ3A0aDJ2YWU5Z24yLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjkxODYzNjk4MjQzLWVnNWk0ZmgwMDFuN3NsMjhiMGJxZ3A0aDJ2YWU5Z24yLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNTE1NzM0ODQ3MDM4MTA0MjA5IiwiaGQiOiJpbXNhLmVkdSIsImVtYWlsIjoiaWZvd2xlckBpbXNhLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoib1RjaGxfdHhHSUh2LW9Ua3NxbTllZyIsIm5hbWUiOiJJYW4gRm93bGVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tMTNWdHN4SXZFRjQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyY2t4QkswN1ExdGNaaVdxQnlTeUQycGR1ODFSdy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiSWFuIiwiZmFtaWx5X25hbWUiOiJGb3dsZXIiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4MTgwNzAyNSwiZXhwIjoxNTgxODEwNjI1LCJqdGkiOiIzZWZiNWU1MzJlOTEyOWQ3ZWQ1Yzk1ODczNjg0MDA2NDU3NmE1ZTAwIn0.kQUaasaTxliUk9cUEpOJ2qKyaUwPsNMsy85gUxnADtwtiHQ0f5QGyRgoUg9RdW5gxXmv-HD34_g_0fAsGkKq2gCSqXBTukKd-mJ0saAFoK-a5JnfkCYFm4nGGTBiiRGFDxOgu7NLaC-KXJOQW2cIBi4RYNa3bF2JHcHgKe48Uf28cLfSqgVWXDk9yNVLUmcKlIW-lVLa20BR-n78_yahyxg66omZoC0gRgULZwdmV9bblQ15PkDLP8X5BjquruB9kt2q7B8DO-KH3Jdm7zGVNJ0lU8pQdDPdxmgSdzAP7vfDIfBUi74xk_pC-gZ_WJG6whYA0SSdtP0cEFu8F8T9bA';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';



export default {

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    async getIDToken() {
        try {
            const isSignedIn = await GoogleSignin.isSignedIn();

            try {
                const tokens = await GoogleSignin.getTokens();
                return tokens.idToken;
            } catch (error) {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                if (userInfo) {
                    await AsyncStorage.setItem('name', userInfo.user.name);
                }
                return this.getIDToken()
            }

        } catch(error) {
            console.error(error);
        }
    },

    async fetchMatches(competition) {
        const endpoint = encodeURI(apiHost + "api/fetchMatches?competition="+competition);
        
        try {
            return await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                }
            }).then((response) => {
                return response.json();
            }).then((myJson) => {
                // console.warn(myJson);
                matches = myJson["data"];
                arr = [];
                for (let i=0; i<matches.length; i++) {
                    dict = {};
                    dict["number"] = i+1;
                    dict["scouts"] = matches[i];
                    arr.push(dict);
                }
                return arr;
            });

        } catch(error) {
            console.error(error);
        }
    },

    // await ajax.submitMatchData('Central2020', '2042', '12', '{"myfavoritecolor":"red"}');
    async submitMatchData(competition, team, match, data) {

        const endpoint = apiHost + "api/submitMatchData";
        try {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    competition_id: competition,
                    match_number: match,
                    team_scouted: team,
                    data : data
                }),
            }).then((response) => {
                return response.json();
            }).then((myJson) => {
                console.warn(myJson);
            })
            // let responseJson = await JSON.parse(response);
            // console.warn("This is from dev: "+responseJson);
        } catch(error) {
            console.error(error);
        }
    },

    
// STATS

    // await ajax.fetchMatchData('Central2020', '2042', '12');
    async fetchMatchData(competition, matchNumber, team) {
        const endpoint = encodeURI(apiHost + "api/fetchMatchData?competition="+competition+"&match_number="+matchNumber+"&team_scouted="+team);
        
        try {
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            }).then((myJson) => {
                console.warn(myJson);
            });
        } catch(error) {
            console.error(error);
        }
    },




};