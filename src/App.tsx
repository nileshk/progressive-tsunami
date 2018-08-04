import * as React from 'react';
import './App.css';
import MapView from './components/MapView';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MapView />
      </div>
    );
  }
}

export default App;
