/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const apiHost = 'https://titanscouting.epochml.org/';

import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Globals from './GlobalDefinitions';
exports.AsyncAlert = async () =>
  new Promise(resolve => {
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
      {cancelable: false},
    );
  });

exports.isJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
exports.getUserInfo = async () => {
  const endpoint = encodeURI(
    apiHost + 'api/getUserTeam',
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
    })
      .then(response => {
        return response.json();
      })
  } catch (error) {
    console.error(error);
  }
}
exports.addUserToTeam = async (team) => {
  const endpoint = apiHost + 'api/addUserToTeam';
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
      body: JSON.stringify({
        team: team
      }),
    }).then(async (response) => {
      response = await response.json();
      if (!response.success) {
        console.error("Could not add the user")
      }
      return response;
    });
    // let responseJson = await JSON.parse(response);
  } catch (error) {
    console.error(error);
  }
}
exports.getIDToken = async () => {
  const now = Date.now();
  try {
    let keyData = await AsyncStorage.getItem('tra-google-auth');
    keyData = keyData != null ? JSON.parse(keyData) : null;
    if(keyData !== null && now - keyData.time < 3500000) {
      return keyData.key
    }
  } catch (e) {
    console.warn("Error pulling stored key")
  }
  try {
    const userInfo = await GoogleSignin.signInSilently();
    const jsonValue = JSON.stringify({key: userInfo.idToken, time: now})
    await AsyncStorage.setItem('tra-google-auth', jsonValue)
    return userInfo.idToken
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      await GoogleSignin.signIn()
    } else {
      console.error(error)
    }
  }
};

exports.fetchTeamsForMatch = async (competition, match) => {
  const endpoint = encodeURI(
    apiHost +
      'api/fetchScouterUIDs?competition=' +
      competition +
      '&match_number=' +
      match,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        let meme_review;
        if (response.status !== 200) {
          meme_review = {
            competition: Globals.competition,
            scouters: [
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
              {id: '0', name: 'ERROR: MATCH NOT IN DB'},
            ],
            success: false,
            teams: ['0', '0', '0', '0', '0', '0'],
          };
        } else {
          meme_review = response.json();
        }
        return meme_review;
      })
      .then(myJson => {
        let data = [];
        let is_blue;
        let desc = null;
        for (let i = 0; i < myJson.scouters.length; i++) {
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
          data.push({
            teamNumber: parseInt(myJson.teams[i], 10),
            isBlue: is_blue,
            scouterDescription: desc,
          });
        }
        return data;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.fetchMatchConfig = async () => {
  const userInfo = await exports.getUserInfo() 
  const team = userInfo.team
  const endpoint = encodeURI(apiHost + `api/fetchMatchConfig?competition=${Globals.data.competition}&team=${team}`);
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn('Error fetching match config');
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson.config;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.fetchPitConfiguration = async () => {
  const userInfo = await exports.getUserInfo() 
  const team = userInfo.team
  const endpoint = encodeURI(apiHost + `api/fetchPitConfig?competition=${Globals.data.competition}&team=${team}`);
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn('Error fetching pit config');
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson.config;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.isSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  } catch (error) {
    console.error(error);
  }
};

(exports.signOut = async () => {
  try {
    const isSignedIn = await exports.isSignedIn();
    if (isSignedIn) {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        AsyncStorage.setItem('tra-google-auth', "");
        AsyncStorage.setItem('tra-is-enrolled-user', 'false');
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
  // eslint-disable-next-line no-sequences
}),
  (exports.fetchMatches = async competition => {
    const endpoint = encodeURI(
      apiHost + 'api/fetchMatches?competition=' + competition,
    );

    try {
      return await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: await exports.getIDToken(),
        },
      })
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          matches = myJson.data;
          arr = [];
          for (let i = 0; i < matches.length; i++) {
            dict = {};
            dict.number = i + 1;
            dict.scouts = matches[i];
            arr.push(dict);
          }
          return arr;
        });
    } catch (error) {
      console.error(error);
    }
  }),
  (exports.submitMatchData = async (competition, team, match, data) => {
    const endpoint = apiHost + 'api/submitMatchData';
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: await exports.getIDToken(),
        },
        body: JSON.stringify({
          competition: competition,
          match: match,
          teamScouted: team,
          data: data,
        }),
      }).then(response => {
        return response.json();
      });
      // let responseJson = await JSON.parse(response);
    } catch (error) {
      console.error(error);
    }
  }),
  (exports.submitPitData = async (competition, team, data) => {
    let match = 0; // TODO: REMOVE MATCH FROM THE API
    const endpoint = apiHost + 'api/submitPitData';
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: await exports.getIDToken(),
        },
        body: JSON.stringify({
          competition_id: competition,
          match_number: match,
          team_scouted: team,
          data: data,
        }),
      })
        .then(response => {
          if (response.status !== 200) {
            console.warn(
              'Error fetching competition schedule for ' + competition,
            );
          } else {
            return response.json();
          }
        })
        .then(myJson => {
          return myJson;
        });
      // let responseJson = await JSON.parse(response);
    } catch (error) {
      console.error(error);
    }
  }),
  // STATS
  (exports.fetchMatchData = async (competition, matchNumber, team) => {
    const endpoint = encodeURI(
      apiHost +
        'api/fetchMatchData?competition=' +
        competition +
        '&match_number=' +
        matchNumber +
        '&team_scouted=' +
        team,
    );

    try {
      return await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status !== 200) {
            console.warn('Error fetching match data for ' + competition);
          } else {
            return response.json();
          }
        })
        .then(myJson => {
          return myJson;
        });
    } catch (error) {
      console.error(error);
    }
  });

exports.fetchPitData = async (competition, team) => {
  let matchNumber = 0;
  const endpoint = encodeURI(
    apiHost +
      'api/fetchPitData?competition=' +
      competition +
      '&match_number=' +
      matchNumber +
      '&team_scouted=' +
      team,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(myJson => {
        if (myJson !== undefined) {
          return myJson.data;
        }
      });
  } catch (error) {
    console.error(error);
  }
};

exports.fetchAllTeamNicknamesAtCompetition = async competition => {
  const endpoint = encodeURI(
    apiHost +
      'api/fetchAllTeamNicknamesAtCompetition?competition=' +
      competition,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.warn('Error fetching nicknames for ' + competition);
        }
      })
      .then(myJson => {
        return myJson.data;
      });
  } catch (e) {
    console.error(e);
  }
};

exports.findTeamNickname = async team_num => {
  const endpoint = encodeURI(
    apiHost + 'api/findTeamNickname?team_number=' + team_num,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        let meme_review;
        if (response.status === 200) {
          meme_review = response.json();
        } else {
          meme_review = {
            success: false,
            team_num: team_num,
            nickname: 'ERR: TEAM NOT IN DB',
          };
        }
        return meme_review;
      })
      .then(myJson => {
        return myJson.data;
      });
  } catch (e) {
    console.error(e);
  }
};

exports.addScouterToMatch = async (team_scouting, match, competition) => {
  const endpoint = apiHost + 'api/addScouterToMatch';
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
      body: JSON.stringify({
        match,
        team_scouting,
        competition
      }),
    }).then(response => {
      return response.json();
    });
    // let responseJson = await JSON.parse(response);
  } catch (error) {
    console.error(error);
  }
};

exports.removeScouterFromMatch = async (team_scouting, match, competition) => {
  const endpoint = apiHost + 'api/removeScouterFromMatch';
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
      body: JSON.stringify({
        match,
        team_scouting,
        competition
      }),
    }).then(response => {
      return response.json();
    });
    // let responseJson = await JSON.parse(response);
  } catch (error) {
    console.error(error);
  }
};

exports.fetchCompetitionSchedule = async competition => {
  const endpoint =
    apiHost + 'api/fetchCompetitionSchedule?competition=' + competition;
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Error fetching competition schedule for ' + competition,
          );
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson.data;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.fetchTeamsInCompetition = async competition => {
  let compSchedlule = await exports.fetchCompetitionSchedule(competition);
  var teams = [];
  for (let i in compSchedlule) {
    match = compSchedlule[i];
    teamsForMatch = match.teams;
    for (let j in teamsForMatch) {
      let t = parseInt(teamsForMatch[j], 10);
      if (!teams.includes(t)) {
        teams.push(t);
      }
    }
  }
  return teams.sort(function(a, b) {
    return a - b;
  });
};

exports.fetchMatchesForTeamInCompetition = async (competition, team) => {
  let compSchedlule = await exports.fetchCompetitionSchedule(competition);
  var matches = [];
  for (let i in compSchedlule) {
    match = compSchedlule[i];
    teamsForMatch = match.teams;
    for (let j in teamsForMatch) {
      let t = parseInt(teamsForMatch[j], 10);
      if (team === t) {
        matches.push(match.match);
      }
    }
  }
  return matches.sort(function(a, b) {
    return a - b;
  });
};

exports.fetchMatchDataForTeamInCompetition = async (competition, team) => {
  let matches = await exports.fetchMatchesForTeamInCompetition(
    competition,
    team,
  );
  let matchDataArr = [];
  for (let i in matches) {
    let match = matches[i];
    let matchData = await exports.fetchMatchData(competition, match, team);
    matchDataArr.push(matchData);
  }
  let config = await exports.fetchMatchConfig();
  let stuffToReturn = [];
  for (var k in config) {
    if (config.hasOwnProperty(k)) {
      for (var l in config[k]) {
        let category = l; // Auto, Teleop, Notes
        for (var m in config[k][l]) {
          let name = config[k][l][m].name;
          let key = config[k][l][m].key;
          let d = [];
          for (i in matchDataArr) {
            let match = matches[i];
            let matchObj = matchDataArr[i];
            let val = 'Not Scouted';
            if (matchObj.data !== null && matchObj.data[key] !== null) {
              val = matchObj.data[key];
            }
            d.push({
              match: match,
              val: val,
            });
          }
          let response = {
            category: category,
            name: name,
            data: d,
          };
          stuffToReturn.push(response);
        }
      }
    }
  }
  return stuffToReturn;
};

// Strategies

exports.fetch2022Schedule = async competition => {
  const endpoint = apiHost + 'api/fetch2022Schedule?competition=' + competition;
  try {
    let schedule = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Error fetching 2022 competition schedule for ' + competition,
          );
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        let data = [];
        for (match of myJson.data) {
          data.push({
            match: match.match,
            teams: [
              match.teams[0],
              match.teams[1],
              match.teams[2],
              match.teams[3],
              match.teams[4],
              match.teams[5],
            ],
          });
        }
        return data.sort(function(a, b) {
          return a.match - b.match;
        });
      });
    return schedule;
  } catch (error) {
    console.error(error);
  }
};

exports.getStrategiesForMatch = async (competition, matchNumber) => {
  const endpoint = encodeURI(
    apiHost +
      'api/fetchScouterSuggestions?competition=' +
      competition +
      '&matchNumber=' +
      matchNumber,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Status ' +
              response.status +
              ' Error fetching scouting suggestions data for ' +
              competition,
          );
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson.data;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.submitStrategy = async (competition, match, data) => {
  const endpoint = apiHost + 'api/submitStrategy';
  try {
    return await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
      body: JSON.stringify({
        competition: competition,
        match: match,
        data: data,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Status ' +
              response.status +
              ' Error submitting scouting suggestions data for ' +
              competition,
          );
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson;
      });
  } catch (error) {
    console.error(error);
  }
};

exports.getUserStrategy = async (competition, matchNumber) => {
  const endpoint = encodeURI(
    apiHost +
      'api/fetchUserStrategy?competition=' +
      competition +
      '&match_number=' +
      matchNumber,
  );
  try {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: await exports.getIDToken(),
      },
    })
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Status ' +
              response.status +
              ' Error fetching fetchUserStrategy ' +
              competition,
          );
        } else {
          return response.json();
        }
      })
      .then(myJson => {
        return myJson.data;
      });
  } catch (error) {
    console.error(error);
  }
};
