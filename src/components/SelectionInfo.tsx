import * as React from 'react';
import {CandidateInfo, FloridaHouseCandidates, FloridaSenateCandidates, LocalCandidates, StateWideCandidates, USCongressionalCandidates} from "./CandidateData";
import {CountyType, NationalCongressionalDistrictType, StateHouseDistrictType, StateSenateDistrictType, StateWideType} from "./MapView";

interface Props {
  code: string;
  featureType: string;
  showAll: boolean;
}

interface State {
  name: string;
  candidates: CandidateInfo[];
  typeName: string;
}

class SelectionInfo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const typeName = this.typeNameFromFeatureType(props.featureType);
    this.state = {name: '', candidates: [], typeName};
  }

  private typeNameFromFeatureType(featureType: string) {
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

      const typeName = this.typeNameFromFeatureType(this.props.featureType);
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
      switch (this.props.featureType) {
        case CountyType: {
          candidates = LocalCandidates.filter(c => c.county === this.props.code);
          break;
        }
        case NationalCongressionalDistrictType: {
          candidates = USCongressionalCandidates.filter(c => c.district === this.props.code);
          break;
        }
        case StateSenateDistrictType: {
          candidates = FloridaSenateCandidates.filter(c => c.district === this.props.code);
          break;
        }
        case StateHouseDistrictType: {
          candidates = FloridaHouseCandidates.filter(c => c.district === this.props.code);
          break;
        }
        case StateWideType: {
          candidates = StateWideCandidates;
          break;
        }
      }
    }
    this.setState({candidates});
  };

  public render() {
    const waveIcon = <span className="candidate-bullet-point">🌊 </span>;
    // {candidate.url ? <a href={candidate.url} target="_blank">{waveIcon}</a> : <span>{waveIcon}</span>}

    return (
      <div>
        <div className="main-content">
          {this.props.code.length > 0 || this.props.showAll ?
            <div>
              {this.props.showAll
                ? <span><h2>Showing all candidates</h2><p><i>(click on county/district in map to filter)</i></p></span>
                : <h2>{this.state.typeName}: {this.props.code}</h2>
              }
              {this.state.candidates.length > 0 ? <p><b>Candidates endorsed by <a href="https://www.progressivefl.org/endorsements-2018/" target="_blank">Democratic Progressive Caucus of Florida</a>
                {this.props.featureType === CountyType || this.props.showAll ? ' (including Local Chapters) ' : ''}
                :</b></p> : ''}
              {this.state.candidates.map((candidate) =>
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
