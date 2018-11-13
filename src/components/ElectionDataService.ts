import axios from 'axios';

export interface SummaryResults {
  ContestId: string,
  Contest: string,
  Candidate_IssueId: string,
  Candidate_Issue: string,
  Party: string,
  EarlyVotes: string,
  MailVotes: string,
  ElectionDateVotes: string,
  ProvisionalVotes: string,
  TotalVotes: string
}

export interface PrecinctResults {
  ContestId: string,
  Contest: string,
  Candidate_IssueId: string,
  Candidate_Issue: string,
  Party: string,
  PrecinctCode: string,
  PrecinctName: string,
  EarlyVotes: string,
  MailVotes: string,
  ElectionDateVotes: string,
  ProvisionalVotes: string,
  TotalVotes: string
}

export interface StateResults {
  ElectionDate: string,
  PartyCode: string,
  PartyName: string,
  RaceCode: string,
  RaceName: string,
  CountyCode: string,
  CountyName: string,
  Juris1num: number,
  Juris2num: number,
  Precincts: number,
  PrecinctsReporting: number,
  CanNameLast: string | number,
  CanNameFirst: string | number,
  CanNameMiddle: string | number,
  CanVotes: number
}

declare type summaryResultsCallback = (results: SummaryResults[]) => void;
declare type precinctResultsCallback = (results: PrecinctResults[]) => void;
declare type stateSummaryResultsCallback = (results: StateResults[]) => void;

export default class ElectionDataService {

  public static fetchSummaryResults = (county: string, responseHandler: summaryResultsCallback) => {
    const url = 'downloaded/election_results/primary/FL/' + county.toLowerCase() + '/SummaryResults_2018_Primary.json';
    axios.get(url).then((response) => {
      const results: SummaryResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetchPrecinctResults = (county: string, responseHandler: precinctResultsCallback) => {
    const url = 'downloaded/election_results/primary/FL/' + county.toLowerCase() + '/PrecinctResults_2018_Primary.json';
    axios.get(url).then((response) => {
      const results: PrecinctResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetch2018GeneralSummaryResults = (county: string, responseHandler: summaryResultsCallback) => {
    const url = 'downloaded/election_results/2018/general/FL/' + county.toLowerCase() + '/SummaryResults_2018_General.json';
    axios.get(url).then((response) => {
      const results: SummaryResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetch2018GeneralPrecinctResults = (county: string, responseHandler: precinctResultsCallback) => {
    const url = 'downloaded/election_results/2018/general/FL/' + county.toLowerCase() + '/PrecinctResults_2018_General.json';
    axios.get(url).then((response) => {
      const results: PrecinctResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetch2018GeneralStateSummaryResults = (responseHandler: stateSummaryResultsCallback) => {
    const url = 'downloaded/election_results/2018/general/FL/20181106_ElecResultsFL.json';
    axios.get(url).then((response) => {
      const results: StateResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

  public static fetch2016GeneralStateSummaryResults = (responseHandler: stateSummaryResultsCallback) => {
    const url = 'downloaded/election_results/2016/general/FL/11082016Election.json';
    axios.get(url).then((response) => {
      const results: StateResults[] = response.data;
      responseHandler(results);
    }).catch((error) => {
      console.log("ERROR:");
      console.log(error);
    });
  };

}
