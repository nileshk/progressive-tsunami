import Feature from 'ol/Feature';
import FeatureRender from 'ol/render/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point';
import Layer from 'ol/layer/Layer';
import Tile from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Style from 'ol/style/Style';

import 'ol/ol.css'
import * as React from 'react';
import SelectionInfo from "./SelectionInfo";
import * as GeoData from './GeoData';
import {CandidateInfo, FloridaHouseCandidates, FloridaSenateCandidates, LocalCandidates, StateWideCandidates, USCongressionalCandidates} from "./CandidateData";
import ElectionDataService, {PrecinctResults, SummaryResults} from "./ElectionDataService";
import PrecinctInfo from "./PrecinctInfo";
// import * as ol from "ol";

export const NationalCongressionalDistrictType = 'national';
export const StateSenateDistrictType = 'statesenate';
export const StateHouseDistrictType = 'state';
export const CountyType = 'county';
export const StateWideType = 'statewide';
export const LocationType = 'location';
export const PrecinctType = 'precinct';

// TODO Use enum instead of this
const featureTypes = [
  CountyType,
  NationalCongressionalDistrictType,
  StateSenateDistrictType,
  StateHouseDistrictType,
  StateWideType,
  LocationType,
  PrecinctType
];

interface State {
  map?: Map;
  selectedCode: string;
  selectedFeature?: Feature | FeatureRender;
  selectedFeatureType?: string;
  selectedLayer?: Layer;
  selectedType: string;
  showAllCandidates: boolean;
  geolocationBrowserSupport: boolean;
  showCandidatesForYourLocation: boolean;
  //coordinates?: Coordinates;
  districtLayers: Layer[];
  candidates: CandidateInfo[];
  locationLayer?: any;
  electionDataSummaryLoaded: boolean;
  electionDataSummary: SummaryResults[];
  electionDataPrecinctsLoaded: boolean;
  electionDataPrecincts: PrecinctResults[];
  advancedMode: boolean;
  selectedCandidateIssueId: string;
  selectedContestId: string;
  candidateSummaryResult?: SummaryResults;
}

const DEFAULT_OPACITY: number = 1;
const SELECTED_OPACITY: number = 0;
const DEFAULT_NATIONAL_LAYER: boolean = true;
const TSUNAMI_COLOR = 'rgba(0,48,204,0.1)';

class MapView extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {selectedCode: '', selectedType: CountyType, showAllCandidates: true, geolocationBrowserSupport: navigator.geolocation !== null, showCandidatesForYourLocation: false, districtLayers: [], candidates: [], electionDataSummaryLoaded: false, electionDataSummary: [], electionDataPrecinctsLoaded: false, electionDataPrecincts: [], advancedMode: false, selectedCandidateIssueId: '79631' /* Andrew Gillum */,
    selectedContestId: '17363' /* Dem Governor */};
  }

  public componentDidMount() {

    const layers: Array<Tile | Vector> = [
      new Tile({
        source: new OSM(
          /*{ url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'} */
          /* { url: 'http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' } */)
      })
    ];

    const districtLayers: any[] = [];

    const makeLayer = (urls: string[], districtType: string, sourceFormat: any, styleFunction: (feature: (Feature | FeatureRender)) => Style[], addToDistrictLayers = true): void => {
      if (urls && urls.length > 0) {
        for (const url of urls) {

          const geoJSONLayer = new Vector({
            source: new VectorSource({
              format: sourceFormat,
              url
            }),
            opacity: DEFAULT_OPACITY,
            style: styleFunction
          });
          geoJSONLayer.setProperties({featureType: districtType});
          layers.push(geoJSONLayer);
          if (addToDistrictLayers) {
            districtLayers.push(geoJSONLayer);
          }
        }
      }
    };

    makeLayer(GeoData.STATE_URLS, StateWideType, new GeoJSON(), this.stateStyleFunction);
    makeLayer(GeoData.DISTRICT_URLS, NationalCongressionalDistrictType, new GeoJSON(), this.styleFunction);
    makeLayer(GeoData.COUNTY_URLS, CountyType, new GeoJSON(), this.styleFunction);
    makeLayer(GeoData.STATE_DISTRICT_KML_URLS, StateSenateDistrictType, new KML({extractStyles: false}), this.styleFunction);
    makeLayer(GeoData.STATE_HOUSE_DISTRICT_KML_URLS, StateHouseDistrictType, new KML({extractStyles: false}), this.styleFunction);
    makeLayer(GeoData.PRECINCT_URLS, PrecinctType, new GeoJSON(), this.precinctStyleFunction);



    const map: Map = new Map({
      target: 'map',
      layers,
      view: new View({
        center: fromLonLat([-82.452606, 28.3]),
        zoom: 7
      })
    });
    map.on('singleclick', this.mapClick);

    /*
    HACK It appears if you don't allow a layer to visible initially, feature.getGeometry().intersectsCoordinate won't pick up features of the layer.
    To workaround this, we allow all layers to be visible for 1/2 a second before making them invisible.
     */
    setTimeout(() => {
      districtLayers.filter(layer => !('featureType' in layer.getProperties()) || layer.get('featureType') !== CountyType).forEach(layer => layer.setVisible(false));
    }, 2000);

    this.setState({map, districtLayers});
    this.changeType(0);

    window.onresize = () => {
      setTimeout(() => map.updateSize(), 200);
    };
  }

  public componentDidUpdate(prevProps: {}, prevState: State) {
    if (this.state.selectedType !== prevState.selectedType && this.state.map) {
      this.state.map.getLayers().forEach(mapLayer => {
        const visible = !('featureType' in mapLayer.getProperties())
          || mapLayer.get('featureType') === this.state.selectedType;
        mapLayer.setVisible(visible);
      });
    }
    if (this.state.electionDataSummaryLoaded !== prevState.electionDataSummaryLoaded && this.state.selectedCandidateIssueId.length > 0) {
      this.selectCandidate(this.state.selectedCandidateIssueId);
    }
    if (this.state.selectedCandidateIssueId !== prevState.selectedCandidateIssueId) {
      if (this.state.map) {
        this.state.map.render();
      }
    }
  }

  private mapClick = (evt: any) => { // ol.events.Event) {
    if (this.state.selectedType === LocationType) {
      // const coordinates = this.state.map.getCoordinateFromPixel(evt.pixel);
      //console.log(evt);
      this.showCandidatesForCoordinates(evt.coordinate, true);
      return;
    }
    this.setState({showCandidatesForYourLocation: false});
    if (this.state.map && this.state.selectedType !== StateWideType) {
      this.state.map.forEachFeatureAtPixel(evt.pixel,
        (feature: Feature | FeatureRender, featureLayer: Layer) => {
          // do stuff here with feature
          console.log(feature);
          // console.log(featureLayer);
          /*
          if (this.state.selectedLayer) {
            this.state.selectedLayer.setOpacity(DEFAULT_OPACITY);
          }
          if ('Code' in feature.getProperties()) {
            featureLayer.setOpacity(SELECTED_OPACITY);
          }
          */
          const code: string = MapView.codeFromFeature(feature);
          const candidateCount = MapView.candidateCount(feature);
          const showAllCandidates: boolean = false; // !(this.state.selectedType === StateWideType) && this.state.showAllCandidates && candidateCount === 0;
          // console.log('Code: ' + code);
          this.setState({selectedCode: code, selectedFeature: feature, selectedLayer: featureLayer, selectedFeatureType: this.state.selectedType, showAllCandidates});
          // console.log(code);
        //   try { // HACK Scroll down in landscape mode on clicking a feature with candidates so can see results
        //     if (window.matchMedia("(orientation: landscape)").matches && (window.innerWidth < 800 || window.innerHeight < 500) && window.pageYOffset < 150 && candidateCount > 0) {
        //       console.log("Scrolling down");
        //       window.scrollBy(0, 150);
        //     }
        //   } catch (e) {
        //     console.log("Error in trying to scroll down");
        //     console.log(e);
        //   }
          return [feature, featureLayer];
        });
    }
  };

  private static featureLabel(feature: Feature | FeatureRender): string {
    const code = this.codeFromFeature(feature);
    const candidateCount = this.candidateCount(feature, code);
    return code + (candidateCount > 0 ? "\n(" + candidateCount.toString() + ")" : "");
  }

  private static candidateCount(feature: Feature | FeatureRender, code?: string): number {
    if (!code) {
      code = this.codeFromFeature(feature);
    }
    if (feature != null && (('featureType' in feature.getProperties()) && code) || ('kind' in feature.getProperties()) || ('Code' in feature.getProperties() && 'District' in feature.getProperties()) || ('LSAD' in feature.getProperties())) {
      let featureType: any;
      if ('featureType' in feature.getProperties()) {
        featureType = feature.get('featureType');
      } else  if ('kind' in feature.getProperties()) {
        featureType = feature.get('kind');
      } else if ('LSAD' in feature.getProperties()) {
        const lsad = feature.get("LSAD");
        if (lsad) {
          if (lsad === 'LL') {
            featureType = StateHouseDistrictType;
          }
          if (lsad === 'LU') {
            featureType = StateSenateDistrictType;
          }
        }
      }
      if (!featureType || featureType === "") {
        featureType = NationalCongressionalDistrictType;
      }

      switch (featureType) {
        case CountyType: {
          return LocalCandidates.filter(c => c.county === code).length;
        }
        case NationalCongressionalDistrictType: {
          return USCongressionalCandidates.filter(c => c.district === code).length;
        }
        case StateSenateDistrictType: {
          return FloridaSenateCandidates.filter(c => c.district === code).length;
        }
        case StateHouseDistrictType: {
          return FloridaHouseCandidates.filter(c => c.district === code).length;
        }
      }
    }
    return 0;
  }

  private precinctLevel = (feature: Feature | FeatureRender, code?: string): number => {
    const totalsVsMax = false;

    if (!code) {
      code = MapView.codeFromFeature(feature);
    }
    if (code && this.state.electionDataPrecinctsLoaded && this.state.candidateSummaryResult) {
      const precinctDataItems = this.state.electionDataPrecincts;
      const contestId = this.state.candidateSummaryResult.ContestId;
      const candidateIssueId = this.state.candidateSummaryResult.Candidate_IssueId;
      if (totalsVsMax) { // Value is compared to all other precincts
        const totalVotesList = precinctDataItems.filter(p => p.ContestId === contestId && p.Candidate_IssueId === candidateIssueId).map(p => p.TotalVotes !== '-' ? parseInt(p.TotalVotes, 10) : 0);
        const maxTotalVotes: number = Math.max(...totalVotesList);
        if (maxTotalVotes > 0) {
          const precinctData = precinctDataItems.find(p => p.ContestId === contestId && p.Candidate_IssueId === candidateIssueId && p.PrecinctCode === code);
          if (precinctData && precinctData.TotalVotes !== '-') {
            const totalVotes: number = parseInt(precinctData.TotalVotes, 10);
            if (totalVotes > 0) {
              return (totalVotes / maxTotalVotes);
            }
          }
        }
      } else { // Value is compared with other candidates in the selected precinct
        const totalForAllCandidates = precinctDataItems.filter(p => p.ContestId === contestId && p.PrecinctCode === code).map(p => p.TotalVotes !== '-' ? parseInt(p.TotalVotes, 10) : 0).reduce((x, y) => x + y, 0);

        if (totalForAllCandidates > 0) {
          const precinctData = precinctDataItems.find(p => p.ContestId === contestId && p.Candidate_IssueId === candidateIssueId && p.PrecinctCode === code);
          if (precinctData && precinctData.TotalVotes !== '-') {
            const totalVotes: number = parseInt(precinctData.TotalVotes, 10);
            if (totalVotes > 0) {
              return (totalVotes / totalForAllCandidates);
            }
          }
        }
      }
    }
    return 0;
  };

  private static codeFromFeature(feature: Feature | FeatureRender): string {
    return 'Code' in feature.getProperties()
      ? feature.get('Code')
      : ('GEOID' in feature.getProperties()
        ? feature.get('GEOID').slice(-2).replace(/^0+/, '')
        : ('kind' in feature.getProperties() && feature.get('kind') === 'county' ?
          feature.get('name')
          : ('PRECINCT' in feature.getProperties() ? feature.get('PRECINCT') : '')));
  }

  private styleFunction = (feature: Feature | FeatureRender) => {
    const hasCandidates = MapView.candidateCount(feature) > 0;
    return [
      new Style({
        fill: new Fill({
          color: (hasCandidates ? TSUNAMI_COLOR : 'rgba(255,255,255,0.4)'),
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        }),
        text: new Text({
          font: (hasCandidates ? ' bold ' : '') + '10px Calibri,sans-serif',
          fill: new Fill({color: '#000'}),
          stroke: new Stroke({
            color: '#fff', width: 2
          }),
          text: MapView.featureLabel(feature)
        })
      })
    ];
  };

  private stateStyleFunction = (feature: Feature | FeatureRender) => {
    const hasCandidates = true;
    return [
      new Style({
        fill: new Fill({
          color: TSUNAMI_COLOR,
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        }),
        text: new Text({
          font: (hasCandidates ? ' bold ' : '') + '10px Calibri,sans-serif',
          fill: new Fill({color: '#000'}),
          stroke: new Stroke({
            color: '#fff', width: 2
          }),
          text: 'Florida\n(' + StateWideCandidates.length + ')'
        })
      })
    ];
  };

  private precinctStyleFunction = (feature: Feature | FeatureRender) => {
    const precinctLevel: number = this.precinctLevel(feature);
    let baseColor = 'rgba(0,0,255,';
    if (precinctLevel < 0.75) {
      baseColor = 'rgba(0,255,0,';
    }
    if (precinctLevel < 0.5) {
      baseColor = 'rgba(255,255,0,';
    }
    if (precinctLevel < 0.25) {
      baseColor = 'rgba(255,0,0,';
    }
    const color = baseColor + precinctLevel.toString() + ')';

    return [
      new Style({
        fill: new Fill({
          color,
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        }),
        text: new Text({
          font: '10px Calibri,sans-serif',
          fill: new Fill({color: '#000'}),
          stroke: new Stroke({
            color: '#fff', width: 2
          }),
          text: MapView.featureLabel(feature)
        })
      })
    ];
  };

  private changeType = (n: number) => {
    this.setState({selectedType: featureTypes[n], showCandidatesForYourLocation: false, candidates: []});
    if (n === 4) {
      // State-wide type, set code to Florida and disable show all
      this.setState({ selectedCode: 'Florida', selectedFeatureType: StateWideType, showAllCandidates: false });
    }
    if (n === 6 && !this.state.electionDataSummaryLoaded) {
      ElectionDataService.fetchSummaryResults((results) => {
        console.log('Fetched summary results');
        this.setState({ electionDataSummary: results, electionDataSummaryLoaded: true });
      });
      ElectionDataService.fetchPrecinctResults((results => {
        console.log('Fetched precinct results');
        this.setState({ electionDataPrecincts: results, electionDataPrecinctsLoaded: true });
      }))
    }
  };

  private showAllCandidates = () => {
    this.setState({showAllCandidates: true, showCandidatesForYourLocation: false});
  };


  private showCandidatesForYourLocation = () => {
    if (this.state.geolocationBrowserSupport) {
      navigator.geolocation.getCurrentPosition(position => {
          //console.log(position);
          const coordinates = position.coords;
          this.showCandidatesForCoordinates(coordinates);
        },
        error => {
          console.log(error);
        });
    }
  };

  private showCandidatesForCoordinates = (coordinates: any, isXy: boolean = false) => {
    //console.log(coordinates);
    const map = this.state.map;
    if (!map) {
      console.log('map is null');
      return;
    }
    const xyCoordinates = isXy ? coordinates : fromLonLat([coordinates.longitude, coordinates.latitude]);
    const geometry = coordinates ? new Point(xyCoordinates) : null;
    //console.log(geometry);
    //console.log(geometry.getCoordinates());
    //console.log(geometry.getType());

    const positionFeature: any = new Feature();
    positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }));
    positionFeature.setGeometry(geometry);

    const vectorSource = new VectorSource({
      features: [positionFeature]
    });
    if (this.state.locationLayer) {
      this.state.locationLayer.setSource(vectorSource);
    } else {
      const locationLayer = new Vector({
        source: vectorSource,
        zIndex: 999,
      });
      map.addLayer(locationLayer);
      this.setState({locationLayer});
    }

    let candidates: CandidateInfo[] = SelectionInfo.filterCandidates(StateWideType, 'Florida', false, false) || [];
    //const pixel = map.getPixelFromCoordinate(xyCoordinates);
    this.state.districtLayers.forEach(layer => {
      const source = layer.getSource();
      if (source instanceof VectorSource) {
        const features: Feature[] = source.getFeatures();
        features.filter(feature => feature.getGeometry().intersectsCoordinate(xyCoordinates)).forEach(feature => {
          const featureType: string = 'featureType' in layer.getProperties() ? layer.get('featureType') : ('featureType' in feature.getProperties() ? feature.get('featureType') : '');
          if (featureType !== '' && featureType !== StateWideType) {
            const code: string = MapView.codeFromFeature(feature);
            //const candidateCount = MapView.candidateCount(feature);
            const filteredCandidates = SelectionInfo.filterCandidates(featureType, code, false, false);
            if (filteredCandidates && filteredCandidates.length > 0) {
              candidates = candidates.concat(filteredCandidates);
            }
          }
        });
      }
    });
    this.setState({showCandidatesForYourLocation: true, showAllCandidates: false, candidates});
  };

  private enableAdvancedMode = () => {
    this.setState({advancedMode: true});
  };

  private selectCandidate = (candidateIssueId: string) => {
    this.setState({ selectedCandidateIssueId: candidateIssueId});
    if (this.state.electionDataSummaryLoaded && candidateIssueId.length > 0) {
      const dataWithCandidateIssueId = this.state.electionDataSummary.find(d => d.Candidate_IssueId === candidateIssueId);
      if (dataWithCandidateIssueId) {
        this.setState({candidateSummaryResult: dataWithCandidateIssueId, selectedContestId: dataWithCandidateIssueId.ContestId});
      }
    }
  };

  public render() {
    return (
      <div>
        <div className="map">
          <div id="map"/>
        </div>
        <div className="flex-master">
          <header className="page-header"/>
          <div className="page-content">
            <div className="sidebar-left">
              <input type="radio" name="featureType" value={CountyType} checked={this.state.selectedType === CountyType} onClick={(e) => this.changeType(0)}/>
              <span className="type-selection">County</span><br/>
              <input type="radio" name="featureType" value={NationalCongressionalDistrictType} checked={this.state.selectedType === NationalCongressionalDistrictType}
                     onClick={(e) => this.changeType(1)}/>
              <span className="type-selection">U.S. House</span><br/>
              <input type="radio" name="featureType" value={StateSenateDistrictType} checked={this.state.selectedType === StateSenateDistrictType} onClick={(e) => this.changeType(2)}/>
              <span className="type-selection">State Senate</span><br/>
              <input type="radio" name="featureType" value={StateHouseDistrictType} checked={this.state.selectedType === StateHouseDistrictType} onClick={(e) => this.changeType(3)}/>
              <span className="type-selection">State House</span><br/>
              <input type="radio" name="featureType" value={StateWideType} checked={this.state.selectedType === StateWideType} onClick={(e) => this.changeType(4)}/>
              <span className="type-selection">State-Wide</span><br/>

              {this.state.advancedMode ?
                <span><input type="radio" name="featureType" value={PrecinctType} checked={this.state.selectedType === PrecinctType} onClick={(e) => this.changeType(6)}/>
                <span className="type-selection">Precincts</span><br/></span>
                : ''}

              <input type="radio" name="featureType" value={LocationType} checked={this.state.selectedType === LocationType} onClick={(e) => this.changeType(5)}/>
              <span className="type-selection">Location</span><br/>
              {this.state.geolocationBrowserSupport ?
                <span className="type-selection">
                <button onClick={this.showCandidatesForYourLocation}>Your Location</button>
              </span>
                : ''}
              <span className="type-selection">
                <button onClick={this.showAllCandidates}>Show All Candidates</button>
              </span>
              <br/>
              <span className="sidebar-icon" onDoubleClick={(e) => this.enableAdvancedMode()}>🌊</span>
            </div>
            <div className="splitter"/>
            <div>
              <div className="main-content">
                {this.state.selectedType === PrecinctType && this.state.electionDataSummaryLoaded ?
                  <select value={this.state.selectedCandidateIssueId} onChange={(e) => this.selectCandidate(e.target.value)}>
                    {this.state.electionDataSummary.map(d =>
                      <option key={d.Candidate_IssueId} value={d.Candidate_IssueId}>{d.Candidate_Issue} - {d.Contest}</option>
                    )}
                  </select>
                  : ''}
                {this.state.selectedType === PrecinctType && this.state.electionDataPrecinctsLoaded ? <span><PrecinctInfo code={this.state.selectedCode} precinctDataItems={this.state.electionDataPrecincts} contestId={this.state.selectedContestId}/></span> :
                <SelectionInfo code={this.state.selectedCode} featureType={this.state.selectedFeatureType ? this.state.selectedFeatureType : this.state.selectedType} showAll={this.state.showAllCandidates} forCoordinates={this.state.showCandidatesForYourLocation} candidates={this.state.candidates}/>
                }
              </div>
            </div>
          </div>
          <footer>&copy; 2018 <a href="https://nileshk.com">Nilesh Kapadia</a></footer>
        </div>
      </div>
    );
  }
}

export default MapView;
