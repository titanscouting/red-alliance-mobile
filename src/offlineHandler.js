import AsyncStorage from '@react-native-community/async-storage';
import ajax from './ajax'

exports.submitStaleData = async () => {
  try {
    const offline_data = await AsyncStorage.getItem('@offline_data')
    offline_data = offline_data != null ? JSON.parse(offline_data) : null;
  } catch(e) {
    break;
  }
  if (offline_data == [] || offline_data == null) {
    break;
  }
  for (const match of offline_data) {
    await ajax.submitMatchData(match.competition, match.team, match.match, match.data).catch((error) => {console.log(error)})
  }
};

exports.isStaleData = async () => {
  try {
    const offline_data = await AsyncStorage.getItem('@offline_data')
    offline_data = offline_data != null ? JSON.parse(offline_data) : null;
  } catch(e) {
    break;
  }
  if (offline_data == [] || offline_data == null) {
    return false;
  } else {
    return true;
  }
};

exports.addStaleData = async (competition, team, match, data) => {
  try {
    const offline_data = await AsyncStorage.getItem('@offline_data')
    offline_data = offline_data != null ? JSON.parse(offline_data) : null;
  } catch(e) {
    break;
  }
  if (offline_data == [] || offline_data == null) {
    break;
  }
  const dataToAdd = {
    competition_id: competition,
    match_number: match,
    team_scouted: team,
    data: data,
  }
  offline_data.push(dataToAdd)
  try {
    const jsonValue = JSON.stringify(offline_data)
    await AsyncStorage.setItem('@offline_data', jsonValue)
  } catch (e) {
    break;
  }
};