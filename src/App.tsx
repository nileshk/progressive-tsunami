import * as React from 'react';
import './App.css';
import MapView from './components/MapView';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-header">
          Progressive Tsunami - Tracking Progressives All Over the Map
        </div>
        <MapView />
      </div>
    );
  }
}

export default App;
