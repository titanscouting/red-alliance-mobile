/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const apiHost = 'https://titanscouting.epochml.org/';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

exports.apiHost = apiHost;

exports.warnCouldNotAdd = async () => {
  Alert.alert(
    'Could not add user!',
    'Please try again later.',
    [{text: 'OK', onPress: () => {}}],
    {cancelable: false},
  );
};
exports.warnCouldNotSubmit = async () => {
  Alert.alert(
    'Could not submit data!',
    'Please try again later.',
    [{text: 'OK', onPress: () => {}}],
    {cancelable: false},
  );
};
exports.couldNotLogin = async () => {
  Alert.alert(
    'Could not login to The Red Alliance!',
    'Please check that you are connected to the internet and try again.',
    [{text: 'OK', onPress: () => {}}],
    {cancelable: false},
  );
};
exports.isJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
exports.getUserInfo = async idToken => {
  if (idToken === undefined) {
    idToken = await exports.getIDToken();
  }
  const endpoint = encodeURI(apiHost + 'api/getUserTeam');
  const token = idToken;
  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  }).then(async response => {
    const resp = await response.json();
    return resp;
  });
};
exports.addUserToTeam = async (team, idToken) => {
  if (idToken === undefined) {
    idToken = await exports.getIDToken();
  }
  const endpoint = apiHost + 'api/addUserToTeam';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: idToken,
    },
    body: JSON.stringify({
      team: team,
    }),
  });
  return await res.json();
};
exports.firstTimeSignIn = async () => {
  const now = Date.now();
  let userInfo;
  try {
    userInfo = await GoogleSignin.signIn();
  } catch (e) {
    if (e.code === statusCodes.SIGN_IN_REQUIRED) {
      userInfo = GoogleSignin.signIn();
    } else if (e.code === statusCodes.IN_PROGRESS) {
      console.warn('Already signing in...');
    } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      exports.firstTimeSignIn();
    } else {
      console.error('Could not sign user in', e.code);
    }
  }
  try {
    const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
    await AsyncStorage.setItem('tra-google-auth', jsonValue);
    return userInfo.idToken;
  } catch {
    exports.couldNotLogin();
  }
};

exports.getCurrentCompetition = async () => {
  const idToken = await exports.getIDToken();
  const endpoint = encodeURI(apiHost + 'api/fetchTeamCompetition');
  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: idToken,
    },
  }).then(async response => {
    const json = await response.json();
    if (json.success === true) {
      return json.competition;
    } else {
      return '2020ilch'; // default competition if API cannot be queried.
    }
  });
};

exports.getIDToken = async () => {
  const now = Date.now();
  let keyData = await AsyncStorage.getItem('tra-google-auth');
  try {
    keyData = keyData != null ? JSON.parse(keyData) : null;
    if (keyData !== null && now - keyData.time < 3500000) {
      return keyData.key;
    }
  } catch (e) {
    console.warn('Error pulling stored key');
  }
  let userInfo;
  try {
    userInfo = await GoogleSignin.signInSilently();
    if (userInfo === null) {
      throw {code: statusCodes.SIGN_IN_REQUIRED};
    }
  } catch (e) {
    if (e.code === statusCodes.SIGN_IN_REQUIRED) {
      userInfo = GoogleSignin.signIn();
    } else if (e.code === statusCodes.IN_PROGRESS) {
      console.warn('Already signing in...');
    } else {
      console.error('Could not sign user in', e);
    }
  }
  const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
  await AsyncStorage.setItem('tra-google-auth', jsonValue);
  return userInfo.idToken;
};

exports.fetchTeamsForMatch = async match => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost +
      'api/fetchScouterUIDs?competition=' +
      competition +
      '&match=' +
      match,
  );

  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  })
    .then(async response => {
      let output;
      if (response.status !== 200) {
        output = {
          competition: competition,
          scouters: [
            {id: '0', name: 'An error occurred.'},
            {id: '1', name: 'An error occurred.'},
            {id: '2', name: 'An error occurred.'},
            {id: '3', name: 'An error occurred.'},
            {id: '4', name: 'An error occurred.'},
            {id: '5', name: 'An error occurred.'},
          ],
          success: false,
          teams: ['0', '1', '2', '3', '4', '5'],
        };
      } else {
        output = response.json();
      }
      return output;
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
};

exports.fetchMatchConfig = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + `api/fetchMatchConfig?competition=${competition}`,
  );
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status === 200) {
    const resp = await response.json();
    return resp.config;
  }
  console.log('Could not get match config data');
};

exports.fetchTeamTestsData = async team => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + `api/fetchTeamTestsData?competition=${competition}&team=${team}`,
  );
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status === 200) {
    const resp = await response.json();
    return resp;
  }
  console.log('Could not get team tests data');
};

exports.fetchPitConfiguration = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + `api/fetchPitConfig?competition=${competition}`,
  );

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
        console.warn('Error fetching pit config');
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      return myJson.config;
    });
};

exports.isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  return isSignedIn;
};

exports.signOut = async () => {
  const isSignedIn = await exports.isSignedIn();
  if (isSignedIn) {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      AsyncStorage.setItem('tra-google-auth', '');
      AsyncStorage.setItem('tra-is-enrolled-user', 'false');
    } catch (error) {
      console.error(error);
    }
  }
};

exports.fetchMatches = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + 'api/fetchScouters?competition=' + competition,
  );

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
};
exports.submitMatchData = async (team, match, data) => {
  const endpoint = apiHost + 'api/submitMatchData';

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
    body: JSON.stringify({
      competition: await exports.getCurrentCompetition(),
      match: match,
      teamScouted: team,
      data: data,
    }),
  });
  const response = await resp.json();
  return response;
};
exports.submitPitData = async (team, data) => {
  let match = 0; // TODO: REMOVE MATCH FROM THE API
  const endpoint = apiHost + 'api/submitPitData';
  const competition = await exports.getCurrentCompetition();
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
  })
    .then(response => {
      if (response.status !== 200) {
        console.warn('Error fetching competition schedule for ' + competition);
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      return myJson;
    });
  // let responseJson = await JSON.parse(response);
};
// STATS
exports.fetchMatchData = async (competition, matchNumber, team) => {
  const endpoint = encodeURI(
    apiHost +
      'api/fetchMatchData?competition=' +
      competition +
      '&match=' +
      matchNumber +
      '&teamScouted=' +
      team,
  );
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status !== 200) {
    console.warn('Error fetching match data for ' + competition);
  } else {
    return await response.json();
  }
};

exports.fetchPitData = async team => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + 'api/fetchPitData?competition=' + competition + '&team=' + team,
  );
  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(myJson => {
      if (myJson !== undefined) {
        return myJson.data;
      }
    });
};

exports.fetchAllTeamNicknamesAtCompetition = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost +
      'api/fetchAllTeamNicknamesAtCompetition?competition=' +
      competition,
  );

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
};

exports.findTeamNickname = async team_num => {
  const endpoint = encodeURI(
    apiHost + 'api/findTeamNickname?team_number=' + team_num,
  );

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
};

exports.addScouterToMatch = async (team_scouting, match) => {
  const endpoint = apiHost + 'api/addScouterToMatch';
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
      competition: await exports.getCurrentCompetition(),
    }),
  }).then(response => {
    return response.json();
  });
  // let responseJson = await JSON.parse(response);
};

exports.removeScouterFromMatch = async (team_scouting, match) => {
  const competition = await exports.getCurrentCompetition();
  const token = await exports.getIDToken();
  const endpoint = apiHost + 'api/removeScouterFromMatch';
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      match: match.toString(),
      team_scouting: team_scouting.toString(),
      competition: competition.toString(),
    }),
  }).then(async response => {
    const resp = await response.json();
    return resp;
  });
};

exports.fetchCompetitionSchedule = async competition => {
  const endpoint =
    apiHost + 'api/fetchCompetitionSchedule?competition=' + competition;
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
        console.warn('Error fetching competition schedule for ' + competition);
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      return myJson.data;
    });
};

exports.fetchTeamsInCompetition = async () => {
  const competition = await exports.getCurrentCompetition();
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

exports.fetchMatchDataForTeamInCompetition = async team => {
  const competition = await exports.getCurrentCompetition();
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

exports.fetchTeamSchedule = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = `${apiHost}api/fetchTeamSchedule?competition=${competition}`;
  let schedule = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  })
    .then(async response => {
      const json = await response.json();
      if (response.status !== 200) {
        console.warn(
          'Error fetching 2022 competition schedule for ' + competition,
        );
      } else {
        return json;
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
};

exports.getStrategiesForMatch = async matchNumber => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost +
      'api/fetchStrategy?competition=' +
      competition +
      '&match=' +
      matchNumber,
  );
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status !== 200) {
    console.warn(
      'Status ' +
        response.status +
        ' Error fetching scouting suggestions data for ' +
        competition,
    );
  } else {
    const resp = await response.json();
    return resp.data;
  }
};

exports.getCompetitionFriendlyName = async () => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost + 'api/fetchCompetitionFriendlyName?competition=' + competition,
  );
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status !== 200) {
    console.warn(
      'Status ' +
        response.status +
        ' Error fetching competition friendly name for ' +
        competition,
    );
  } else {
    const resp = await response.json();
    return resp.data;
  }
};

exports.submitStrategy = async (match, data) => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = apiHost + 'api/submitStrategy';
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
    .then(async response => {
      if (response.status !== 200) {
        console.warn(
          'Status ' +
            response.status +
            ' Error submitting scouting suggestions data for ' +
            competition,
        );
        try {
          return await response.json()
        } catch {
          return {"success": false}
        }
      } else {
        const json = await response.json();
        console.log(json)
        return json;
      }
    })
    .then(myJson => {
      return myJson;
    });
};

exports.getUserStrategy = async matchNumber => {
  const competition = await exports.getCurrentCompetition();
  const endpoint = encodeURI(
    apiHost +
      'api/fetchUserStrategy?competition=' +
      competition +
      '&match=' +
      matchNumber,
  );

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: await exports.getIDToken(),
    },
  });
  if (response.status !== 200) {
    console.warn(
      'Status ' +
        response.status +
        ' Error fetching fetchUserStrategy ' +
        competition,
    );
  } else {
    const resp = await response.json();
    return resp;
  }
};
