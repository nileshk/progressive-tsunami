import * as React from 'react';
import {CandidateInfo, LocalCandidates} from "./CandidateData";

interface Props {
  code: string;
  featureType: string;
}

interface State {
  name: string;
  candidates: CandidateInfo[];
  typeName: string;
}

class SelectionInfo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const typeName = props.featureType === 'county' ? 'County' : '';
    this.state = {name: '', candidates: [], typeName};
  }

  public componentDidMount() {
    console.log(this.props.code);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.code !== this.props.code || prevProps.featureType !== this.props.featureType) {
      this.updateCandidates();
    }
  }

  private updateCandidates = () => {
    const candidates = this.props.featureType === 'county' ? LocalCandidates.filter(c => c.county === this.props.code) : [];
    this.setState({ candidates });
  };

  public render() {
    return (
      <div>
        <div className="flex-item sidepanel">
          {this.props.code.length > 0 ?
            <div>
              <h2>{this.state.typeName}: {this.props.code}</h2><br/>
              {this.state.candidates.map((candidate) =>
                <p key={candidate.name}>Candidate: {candidate.name} {candidate.position}</p>
              )}
            </div>
            : ''}
        </div>
      </div>
    )
  }

}

export default SelectionInfo;
