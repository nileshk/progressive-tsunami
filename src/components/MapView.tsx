import * as ol from 'openlayers';
import { format, layer } from 'openlayers';
import 'openlayers/css/ol.css'
import * as React from 'react';
import SelectionInfo from "./SelectionInfo";
import * as GeoData from './GeoData';
import * as CandidateData from './CandidateData';
import {LocalCandidates} from "./CandidateData";

const NationalCongressionalDistrictType = 'national';
const StateSenateDistrictType = 'statesenate';
const StateHouseDistrictType = 'state';
const CountyType = 'county';
const StateWideType = 'statewide';

// TODO Use enum instead of this
const featureTypes = [
  CountyType,
  NationalCongressionalDistrictType,
  StateSenateDistrictType,
  StateHouseDistrictType,
  StateWideType
];

interface State {
  map?: ol.Map;
  selectedCode: string;
  selectedFeature?: ol.Feature | ol.render.Feature;
  selectedLayer?: ol.layer.Layer;
  selectedType: string;
}

const DEFAULT_OPACITY: number = 1;
const SELECTED_OPACITY: number = 0;
const DEFAULT_NATIONAL_LAYER: boolean = true;

class MapView extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = { selectedCode: '', selectedType: CountyType };
  }

  public componentDidMount() {

    const layers: Array<layer.Tile | layer.Vector> = [
      new ol.layer.Tile({
        source: new ol.source.OSM(
          /*{ url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'} */
          /* { url: 'http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' } */)
      })
    ];

    const districtUrls = GeoData.DISTRICT_URLS;

    if (districtUrls && districtUrls.length > 0) {
      for (const url of districtUrls) {
        const geoJSONLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            format: new format.GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        geoJSONLayer.setProperties({featureType: NationalCongressionalDistrictType});
        geoJSONLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(geoJSONLayer);
      }
    }

    const countyUrls = GeoData.COUNTY_URLS;

    if (countyUrls && countyUrls.length > 0) {
      for (const url of countyUrls) {
        // console.log(url);
        const geoJSONLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            format: new format.GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        geoJSONLayer.setProperties({featureType: CountyType});
        geoJSONLayer.setVisible(DEFAULT_NATIONAL_LAYER);
        layers.push(geoJSONLayer);
      }
    }

    const stateDistrictsKml = GeoData.STATE_DISTRICT_KML_URLS;

    if (stateDistrictsKml && stateDistrictsKml.length > 0) {
      for (const url of stateDistrictsKml) {
        const kmlSource = new ol.source.Vector({
          format: new format.KML({extractStyles: false}),
          url,
          strategy: ol.loadingstrategy.all
        });
        const kmlLayer = new ol.layer.Vector({
          source: kmlSource,
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        kmlLayer.setProperties({featureType: StateSenateDistrictType});
        kmlLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(kmlLayer);
      }
    }

    const stateHouseDistrictsKml = GeoData.STATE_HOUSE_DISTRICT_KML_URLS;

    if (stateHouseDistrictsKml && stateHouseDistrictsKml.length > 0) {
      for (const url of stateHouseDistrictsKml) {
        const kmlSource = new ol.source.Vector({
          format: new format.KML({extractStyles: false}),
          url,
          strategy: ol.loadingstrategy.all
        });
        const kmlLayer = new ol.layer.Vector({
          source: kmlSource,
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        kmlLayer.setProperties({featureType: StateHouseDistrictType});
        kmlLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(kmlLayer);
      }
    }

    const map: ol.Map = new ol.Map({
      target: 'map',
      layers,
      view: new ol.View({
        center: ol.proj.fromLonLat([-82.452606, 27.964157]),
        zoom: 8
      })
    });
    map.on('singleclick', this.mapClick);

    this.setState({map});
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
    if (this.state.map) {
      this.state.map.forEachFeatureAtPixel(evt.pixel,
        (feature: ol.Feature | ol.render.Feature, featureLayer: ol.layer.Layer) => {
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
          // console.log('Code: ' + code);
          this.setState({ selectedCode: code, selectedFeature: feature, selectedLayer: featureLayer });
          // console.log(code);
          return [feature, featureLayer];
        });
    }
  };

  private static featureLabel(feature: ol.Feature | ol.render.Feature): string {
    const code = this.codeFromFeature(feature);
    let countLabel: string = "";
    if (feature != null && (('featureType' in feature.getProperties()) && code) || ('kind' in feature.getProperties())) {
      const featureType = 'featureType' in feature.getProperties() ? feature.get('featureType') : feature.get('kind');
      switch (featureType) {
        case CountyType: {
          const candidatesCount = LocalCandidates.filter(c => c.county === code).length;
          if (candidatesCount > 0) {
            countLabel = "\n(" + candidatesCount.toString() + ")";
          }
          break;
        }
      }
    }
    return code + countLabel;
  }

  private static codeFromFeature(feature: ol.Feature | ol.render.Feature): string {
    return 'Code' in feature.getProperties()
      ? feature.get('Code')
      : ('GEOID' in feature.getProperties() ? feature.get('GEOID').slice(-2).replace(/^0+/, '') : ('kind' in feature.getProperties() && feature.get('kind') === 'county' ? feature.get('name') : ''));
  }

  private styleFunction = (feature: ol.Feature | ol.render.Feature) => {
    return [
      new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new ol.style.Stroke({
          color: '#3399CC',
          width: 1.25
        }),
        text: new ol.style.Text({
          font: '10px Calibri,sans-serif',
          fill: new ol.style.Fill({ color: '#000' }),
          stroke: new ol.style.Stroke({
            color: '#fff', width: 2
          }),
          text: MapView.featureLabel(feature)
        })
      })
    ];
  };

  private changeType = (n: number) => {
    this.setState({ selectedType: featureTypes[n] });
  };

  public render() {
    return (
      <div className="container">
        <div className="flex-item sidepanel">
          <input type="radio" name="featureType" value={CountyType} checked={this.state.selectedType === CountyType} onClick={(e) => this.changeType(0)} />County<br />
          <input type="radio" name="featureType" value={NationalCongressionalDistrictType} checked={this.state.selectedType === NationalCongressionalDistrictType} onClick={(e) => this.changeType(1)} />U.S. House of Representatives<br />
          <input type="radio" name="featureType" value={StateSenateDistrictType} checked={this.state.selectedType === StateSenateDistrictType} onClick={(e) => this.changeType(2)} />State Senate<br />
          <input type="radio" name="featureType" value={StateHouseDistrictType} checked={this.state.selectedType === StateHouseDistrictType} onClick={(e) => this.changeType(3)} />State House<br />
          <input type="radio" name="featureType" value={StateWideType} checked={this.state.selectedType === StateWideType} onClick={(e) => this.changeType(4)} />State-Wide<br />
        </div>
        <div className="map flex-item">
          <div id="map" />
        </div>
        <SelectionInfo code={this.state.selectedCode} featureType={this.state.selectedType} />
      </div>
    );
  }

}

export default MapView;
