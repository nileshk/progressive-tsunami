import * as React from 'react';
import {PrecinctResults} from "./ElectionDataService";

interface Props {
  code: string;
  precinctDataItems: PrecinctResults[];
  contestId: string;
}

interface State {
  precinctFilteredItems: PrecinctResults[];
}

class PrecinctInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const precinctDataFiltered = props.precinctDataItems.filter(p => p.PrecinctCode === props.code && p.ContestId === props.contestId);
    this.state = {precinctFilteredItems: precinctDataFiltered};
  }

  public componentDidMount() {
    this.updateData();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.code !== this.props.code) {
      this.updateData();
    }
  }

  private updateData = () => {
    const precinctDataFiltered = this.props.precinctDataItems.filter(p => p.PrecinctCode === this.props.code && p.ContestId === this.props.contestId);
    this.setState({precinctFilteredItems: precinctDataFiltered});
  };

  public render() {
    const list: JSX.Element[] = [];
    if (this.state.precinctFilteredItems) {
      for (const item of this.state.precinctFilteredItems) {
        list.push(<p>{item.Candidate_Issue} - {item.TotalVotes}</p>);
        console.log(item);
      }
    }

    return (
      <div>
        { this.props.code ?
        <h3>Precinct {this.props.code} Information</h3>
          : '' }
        {list}
      </div>
    )
  }
}

export default PrecinctInfo;
