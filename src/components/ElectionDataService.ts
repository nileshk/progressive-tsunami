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

declare type summaryResultsCallback = (results: SummaryResults[]) => void;
declare type precinctResultsCallback = (results: PrecinctResults[]) => void;

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

}