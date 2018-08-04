import * as React from 'react';

interface Props {
  code: string;
}

interface State {
  name: string;
}

class SelectionInfo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { name: '' };
  }

  public componentDidMount() {
    console.log(this.props.code);
  }

  public render() {
    return (
      <div>
        {this.props.code.length > 0 ?
          <div>
            District: {this.props.code}
          </div>
          : ''}
      </div>
    )
  }

}

export default SelectionInfo;
