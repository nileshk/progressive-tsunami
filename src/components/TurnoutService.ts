import axios from 'axios';

declare type turnoutResultsCallback = (results: any[]) => void;

export default class TurnoutService {

  public static fetchDaily = (earlyResponseHandler: turnoutResultsCallback, absenteeResponseHandler: turnoutResultsCallback) => {
    const urlEarly = '/api/turnout/Stats_10481_EarlyVoted.json';
    const urlAbsentee = '/api/turnout/Stats_10481_AbsVoted.json';
    axios.get(urlEarly).then((response) => {
      const results: any[] = response.data;
      earlyResponseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
    axios.get(urlAbsentee).then((response) => {
      const results: any[] = response.data;
      absenteeResponseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetchCounty = (county: string, responseHandler: turnoutResultsCallback) => {
    const url = '/api/turnout/HIL.json';
    axios.get(url).then((response) => {
      const results: any[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };
}