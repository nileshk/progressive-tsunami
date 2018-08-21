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
// import * as ol from "ol";

export const NationalCongressionalDistrictType = 'national';
export const StateSenateDistrictType = 'statesenate';
export const StateHouseDistrictType = 'state';
export const CountyType = 'county';
export const StateWideType = 'statewide';
export const LocationType = 'location';

// TODO Use enum instead of this
const featureTypes = [
  CountyType,
  NationalCongressionalDistrictType,
  StateSenateDistrictType,
  StateHouseDistrictType,
  StateWideType,
  LocationType
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
}

const DEFAULT_OPACITY: number = 1;
const SELECTED_OPACITY: number = 0;
const DEFAULT_NATIONAL_LAYER: boolean = true;
const TSUNAMI_COLOR = 'rgba(0,48,204,0.1)';

class MapView extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {selectedCode: '', selectedType: CountyType, showAllCandidates: true, geolocationBrowserSupport: navigator.geolocation !== null, showCandidatesForYourLocation: false, districtLayers: [], candidates: []};
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

    const stateUrls = GeoData.STATE_URLS;

    if (stateUrls && stateUrls.length > 0) {
      for (const url of stateUrls) {

        const geoJSONLayer = new Vector({
          source: new VectorSource({
            format: new GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.stateStyleFunction
        });
        geoJSONLayer.setProperties({featureType: StateWideType});
        layers.push(geoJSONLayer);
        districtLayers.push(geoJSONLayer);
      }
    }

    const districtUrls = GeoData.DISTRICT_URLS;

    if (districtUrls && districtUrls.length > 0) {
      for (const url of districtUrls) {

        const geoJSONLayer = new Vector({
          source: new VectorSource({
            format: new GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        geoJSONLayer.setProperties({featureType: NationalCongressionalDistrictType});
        layers.push(geoJSONLayer);
        districtLayers.push(geoJSONLayer);
      }
    }

    const countyUrls = GeoData.COUNTY_URLS;

    if (countyUrls && countyUrls.length > 0) {
      for (const url of countyUrls) {
        // console.log(url);
        const geoJSONLayer = new Vector({
          source: new VectorSource({
            format: new GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        geoJSONLayer.setProperties({featureType: CountyType});
        layers.push(geoJSONLayer);
        districtLayers.push(geoJSONLayer);
      }
    }

    const stateDistrictsKml = GeoData.STATE_DISTRICT_KML_URLS;

    if (stateDistrictsKml && stateDistrictsKml.length > 0) {
      for (const url of stateDistrictsKml) {
        const kmlSource = new VectorSource({
          format: new KML({extractStyles: false}),
          url
        });
        const kmlLayer = new Vector({
          source: kmlSource,
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        kmlLayer.setProperties({featureType: StateSenateDistrictType});
        layers.push(kmlLayer);
        districtLayers.push(kmlLayer);
      }
    }

    const stateHouseDistrictsKml = GeoData.STATE_HOUSE_DISTRICT_KML_URLS;

    if (stateHouseDistrictsKml && stateHouseDistrictsKml.length > 0) {
      for (const url of stateHouseDistrictsKml) {
        const kmlSource = new VectorSource({
          format: new KML({extractStyles: false}),
          url
        });
        const kmlLayer = new Vector({
          source: kmlSource,
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        kmlLayer.setProperties({featureType: StateHouseDistrictType});
        //kmlLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(kmlLayer);
        districtLayers.push(kmlLayer);
      }
    }

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
  }

  public componentDidUpdate(prevProps: {}, prevState: State) {
    if (this.state.selectedType !== prevState.selectedType && this.state.map) {
      this.state.map.getLayers().forEach(mapLayer => {
        const visible = !('featureType' in mapLayer.getProperties())
          || mapLayer.get('featureType') === this.state.selectedType;
        mapLayer.setVisible(visible);
      });
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
          try { // HACK Scroll down in landscape mode on clicking a feature with candidates so can see results
            if (window.matchMedia("(orientation: landscape)").matches && (window.innerWidth < 800 || window.innerHeight < 500) && window.pageYOffset < 150 && candidateCount > 0) {
              console.log("Scrolling down");
              window.scrollBy(0, 150);
            }
          } catch (e) {
            console.log("Error in trying to scroll down");
            console.log(e);
          }
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

  private static codeFromFeature(feature: Feature | FeatureRender): string {
    return 'Code' in feature.getProperties()
      ? feature.get('Code')
      : ('GEOID' in feature.getProperties() ? feature.get('GEOID').slice(-2).replace(/^0+/, '') : ('kind' in feature.getProperties() && feature.get('kind') === 'county' ? feature.get('name') : ''));
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

  private changeType = (n: number) => {
    this.setState({selectedType: featureTypes[n], showCandidatesForYourLocation: false, candidates: []});
    if (n === 4) {
      // State-wide type, set code to Florida and disable show all
      this.setState({ selectedCode: 'Florida', selectedFeatureType: StateWideType, showAllCandidates: false });
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
              <span className="sidebar-icon">🌊</span>
            </div>
            <div className="splitter"/>
            <SelectionInfo code={this.state.selectedCode} featureType={this.state.selectedFeatureType ? this.state.selectedFeatureType : this.state.selectedType} showAll={this.state.showAllCandidates} forCoordinates={this.state.showCandidatesForYourLocation} candidates= {this.state.candidates}/>
          </div>
          <footer>&copy; 2018 <a href="https://nileshk.com">Nilesh Kapadia</a></footer>
        </div>
      </div>
    );
  }
}

export default MapView;
