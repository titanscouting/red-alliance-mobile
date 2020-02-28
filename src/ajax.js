const apiHost = 'https://scouting-api.herokuapp.com/';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';

import { Alert } from "react-native";

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

  
exports.AsyncAlert = async () => new Promise((resolve) => {
    Alert.alert(
      'Sign In',
      'You must be signed in with an IMSA Google account to use the app.',
      [
        {
          text: 'Okay',
          onPress: () => {
            resolve('YES');
          },
        },
      ],
      { cancelable: false },
    );
  });

exports.isJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



exports.getIDToken = async () => {
    try {
        try {
            // console.log(await exports.isSignedIn() ? "The user is signed in." : "The user is not signed in.");
            await GoogleSignin.hasPlayServices();
            const tokens = await GoogleSignin.getTokens();
            await GoogleSignin.clearCachedToken(tokens.idToken);
            return tokens.idToken;
        } catch (error) {
            console.log("There was an error with getting the tokens: " + error);
            await GoogleSignin.hasPlayServices();
            try {
                const userInfo = await GoogleSignin.signIn();
                if (userInfo) {
                    await AsyncStorage.setItem('name', userInfo.user.name);
                }
            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    await exports.AsyncAlert();
                    return await exports.getIDToken();
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    console.log("Woah! Sign in is in progress");
                } else {
                    // Could also be: statusCodes.PLAY_SERVICES_NOT_AVAILABLE]
                    console.error(error);
                    return await exports.getIDToken();
                }
            }
        }

    } catch(error) {
        console.error(error);
    }

}

exports.fetchTeamsForMatch= async (competition, match)  => {
    const endpoint = encodeURI(apiHost + "api/fetchScouterUIDs?competition="+competition+"&match_number=" + match);
    console.log("Getting data for " + competition + " and match " + match)
    try {
        return await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            let meme_review;
            if (response.status != 200) {
                meme_review = {"competition": "Central2020", "scouters": [{"id": "0", "name": "ERROR: MATCH NOT IN DB"},{"id": "0", "name": "ERROR: MATCH NOT IN DB"},{"id": "0", "name": "ERROR: MATCH NOT IN DB"},{"id": "0", "name": "ERROR: MATCH NOT IN DB"},{"id": "0", "name": "ERROR: MATCH NOT IN DB"},{"id": "0", "name": "ERROR: MATCH NOT IN DB"}], "success": false, "teams": ["0", "0", "0", "0", "0", "0"]}
            }
            else {
                meme_review = response.json()
            }
            return meme_review;
        }).then((myJson) => {
            console.log(myJson)
            let data = []
            let is_blue;
            let desc = null;
            for (let i = 0; i<myJson.scouters.length; i++) {
                if (i < 3) {
                    is_blue = true;
                } else {
                    is_blue = false;
                }
                try {
                    desc = myJson.scouters[i].name;
                } catch (e) {
                    desc = null;
                }
                data.push({teamNumber: parseInt(myJson.teams[i]), isBlue: is_blue, scouterDescription: desc})
            }
            return data;
        });
    } catch(error) {
        console.error(error)
    }
}


exports.fetchConfiguration = async () => {
    const endpoint = encodeURI(apiHost + "api/fetchMatchConfig");
    try {
        return await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            return myJson
        });

    } catch(error) {
        console.error(error);
    }
}

exports.fetchPitConfiguration = async () => {
    const endpoint = encodeURI(apiHost + "api/fetchPitConfig");
    try {
        return await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            return myJson
        });

    } catch(error) {
        console.error(error);
    }
}

exports.isSignedIn = async () => {
    try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn;
    } catch (error) {
        console.error(error);
    }
}

exports.signOut = async () => {
    try {
        const isSignedIn = await exports.isSignedIn();
        if (isSignedIn) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                await AsyncStorage.removeItem('name');
            } catch (error) {
                console.error(error);
            }
        }

        exports.getIDToken();
        
    } catch(error) {
        console.error(error);
    }
},

exports.fetchMatches = async (competition) => {

    const endpoint = encodeURI(apiHost + "api/fetchMatches?competition="+competition);
    const token = await exports.getIDToken();
    
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
exports.submitMatchData = async (competition, team, match, data) => {

    const endpoint = apiHost + "api/submitMatchData";
    try {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': exports.getIDToken()
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
exports.fetchMatchData = async (competition, matchNumber, team) => {
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
}

exports.addScouterToMatch = async (team, match) => {

    const endpoint = apiHost + "api/addScouterToMatch";
    try {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': exports.getIDToken()
            },
            body: JSON.stringify({
                match: match,
                team_scouting: team,
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
}

exports.removeScouterFromMatch = async (team, match) => {

    const endpoint = apiHost + "api/removeScouterFromMatch";
    try {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': exports.getIDToken()
            },
            body: JSON.stringify({
                match: match,
                team_scouting: team,
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
}

exports.fetchCompetitionSchedule = async (competition) => {

    const endpoint = apiHost + "api/fetchCompetitionSchedule?competition="+competition;
    try {
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            console.warn(myJson);
            // ADD FUNCTIONALITY HERE AS NEEDED
        })
        // let responseJson = await JSON.parse(response);
        // console.warn("This is from dev: "+responseJson);
    } catch(error) {
        console.error(error);
    }
}

exports.fetch2022Schedule = async (competition) => {

    const endpoint = apiHost + "api/fetch2022Schedule?competition="+competition;
    try {
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            console.warn(myJson);
            // ADD FUNCTIONALITY HERE AS NEEDED
        })
        // let responseJson = await JSON.parse(response);
        // console.warn("This is from dev: "+responseJson);
    } catch(error) {
        console.error(error);
    }
}

exports.submitStrategy = async (competition, match, team, data) => {

    const endpoint = apiHost + "api/submitStrategy";
    try {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': exports.getIDToken()
            },
            body: JSON.stringify({
                competition: competition, 
                match: match, 
                team: team, 
                data: data
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
}