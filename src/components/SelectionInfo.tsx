import * as React from 'react';
import {CandidateInfo, FloridaHouseCandidates, FloridaSenateCandidates, LocalCandidates, StateWideCandidates, USCongressionalCandidates} from "./CandidateData";
import {CountyType, NationalCongressionalDistrictType, StateHouseDistrictType, StateSenateDistrictType, StateWideType} from "./MapView";

interface Props {
  code: string;
  featureType: string;
  showAll: boolean;
  forCoordinates: boolean;
  candidates: CandidateInfo[];
}

interface State {
  name: string;
  candidates: CandidateInfo[];
  typeName: string;
}

class SelectionInfo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const typeName = SelectionInfo.typeNameFromFeatureType(props.featureType);
    this.state = {name: '', candidates: [], typeName};
  }

  private static typeNameFromFeatureType(featureType: string) {
    if (featureType === CountyType) {
      return 'County';
    } else if (featureType === StateWideType) {
      return 'State';
    } else {
      return 'District';
    }
  }

  public componentDidMount() {
    this.updateCandidates();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.code !== this.props.code
      || prevProps.featureType !== this.props.featureType
      || prevProps.showAll !== this.props.showAll) {

      const typeName = SelectionInfo.typeNameFromFeatureType(this.props.featureType);
      this.setState({typeName});
      this.updateCandidates();
    }
  }

  private updateCandidates = () => {
    let candidates: CandidateInfo[] = StateWideCandidates;
    if (this.props.showAll) {
      candidates = [
        ...candidates,
        ...USCongressionalCandidates,
        ...FloridaSenateCandidates,
        ...FloridaHouseCandidates,
        ...LocalCandidates
      ];
    } else {
      const candidatesFiltered = SelectionInfo.filterCandidates.call(this.props.featureType, this.props.code);
      if (candidatesFiltered) {
        candidates = candidatesFiltered;
      }
    }
    this.setState({candidates});
  };


  public static filterCandidates(featureType: string, code: string): CandidateInfo[] | null {
    switch (featureType) {
      case CountyType: {
        return LocalCandidates.filter(c => c.county === code);
      }
      case NationalCongressionalDistrictType: {
        return USCongressionalCandidates.filter(c => c.district === code);
      }
      case StateSenateDistrictType: {
        return FloridaSenateCandidates.filter(c => c.district === code);
      }
      case StateHouseDistrictType: {
        return FloridaHouseCandidates.filter(c => c.district === code);
      }
      case StateWideType: {
        return StateWideCandidates;
      }
    }
    return null;
  }

  public render() {
    const waveIcon = <span className="candidate-bullet-point">🌊 </span>;
    // {candidate.url ? <a href={candidate.url} target="_blank">{waveIcon}</a> : <span>{waveIcon}</span>}

    const candidates = this.props.candidates.length > 0 ? this.props.candidates : this.state.candidates;

    return (
      <div>
        <div className="main-content">
          {this.props.code.length > 0 || this.props.showAll || this.props.forCoordinates ?
            <div>
              {this.props.showAll
                ? <span><h2>Showing all candidates</h2><p><i>(click on county/district in map to filter or click "Your Location" button)</i></p></span>
                : <span>{this.props.forCoordinates
                  ? <span><h2>Showing all candidates for Your Location</h2></span>
                  : <h2>{this.state.typeName}: {this.props.code}</h2>}</span>
              }
              {candidates.length > 0 ? <p><b>Candidates endorsed by <a href="https://www.progressivefl.org/endorsements-2018/" target="_blank">Democratic Progressive Caucus of Florida</a>
                {this.props.featureType === CountyType || this.props.showAll ? ' (including Local Chapters) ' : ''}
                :</b></p> : ''}
              {candidates.map((candidate) =>
                <p key={candidate.name}>
                  {waveIcon}
                  {candidate.url ? <a href={candidate.url} target="_blank">{candidate.name}</a>
                    : <span>{candidate.name}</span>}
                  <span> - {this.props.showAll && candidate.county !== '' ? <span>{candidate.county} </span>: ''}
                    {candidate.position}</span>
                </p>
              )}
            </div>
            : ''}
        </div>
      </div>
    )
  }

}

export default SelectionInfo;
