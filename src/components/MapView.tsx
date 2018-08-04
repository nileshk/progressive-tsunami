import * as ol from 'openlayers';
import { format, layer } from 'openlayers';
import 'openlayers/css/ol.css'
import * as React from 'react';
import SelectionInfo from "./SelectionInfo";

interface State {
  map?: ol.Map;
  selectedCode: string;
  selectedFeature?: ol.Feature | ol.render.Feature;
  selectedLayer?: ol.layer.Layer;
  showNational: boolean;
}

const DEFAULT_OPACITY: number = 1;
const SELECTED_OPACITY: number = 0;
const DEFAULT_NATIONAL_LAYER: boolean = true;

class MapView extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = { selectedCode: '', showNational: DEFAULT_NATIONAL_LAYER };
  }

  public componentDidMount() {
    const districtUrls: string[] = [
      'downloaded/districts/cds/2016/FL-1/shape.geojson',
      'downloaded/districts/cds/2016/FL-2/shape.geojson',
      'downloaded/districts/cds/2016/FL-3/shape.geojson',
      'downloaded/districts/cds/2016/FL-4/shape.geojson',
      'downloaded/districts/cds/2016/FL-5/shape.geojson',
      'downloaded/districts/cds/2016/FL-6/shape.geojson',
      'downloaded/districts/cds/2016/FL-7/shape.geojson',
      'downloaded/districts/cds/2016/FL-8/shape.geojson',
      'downloaded/districts/cds/2016/FL-9/shape.geojson',
      'downloaded/districts/cds/2016/FL-10/shape.geojson',
      'downloaded/districts/cds/2016/FL-11/shape.geojson',
      'downloaded/districts/cds/2016/FL-12/shape.geojson',
      'downloaded/districts/cds/2016/FL-13/shape.geojson',
      'downloaded/districts/cds/2016/FL-14/shape.geojson',
      'downloaded/districts/cds/2016/FL-15/shape.geojson',
      'downloaded/districts/cds/2016/FL-16/shape.geojson',
      'downloaded/districts/cds/2016/FL-17/shape.geojson',
      'downloaded/districts/cds/2016/FL-18/shape.geojson',
      'downloaded/districts/cds/2016/FL-19/shape.geojson',
      'downloaded/districts/cds/2016/FL-20/shape.geojson',
      'downloaded/districts/cds/2016/FL-21/shape.geojson',
      'downloaded/districts/cds/2016/FL-22/shape.geojson',
      'downloaded/districts/cds/2016/FL-23/shape.geojson',
      'downloaded/districts/cds/2016/FL-24/shape.geojson',
      'downloaded/districts/cds/2016/FL-25/shape.geojson',
      'downloaded/districts/cds/2016/FL-26/shape.geojson',
      'downloaded/districts/cds/2016/FL-27/shape.geojson'
    ];

    const countyUrls: string[] = [
      'downloaded/world.geo.json/countries/USA/FL/Alachua.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Baker.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Bay.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Bradford.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Brevard.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Broward.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Calhoun.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Charlotte.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Citrus.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Clay.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Collier.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Columbia.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/DeSoto.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Dixie.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Duval.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Escambia.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Flagler.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Franklin.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Gadsden.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Gilchrist.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Glades.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Gulf.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Hamilton.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Hardee.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Hendry.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Hernando.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Highlands.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Hillsborough.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Holmes.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Indian River.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Jackson.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Jefferson.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Lafayette.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Lake.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Lee.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Leon.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Levy.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Liberty.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Madison.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Manatee.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Marion.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Martin.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Miami-Dade.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Monroe.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Nassau.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Okaloosa.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Okeechobee.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Orange.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Osceola.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Palm Beach.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Pasco.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Pinellas.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Polk.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Putnam.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Santa Rosa.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Sarasota.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Seminole.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/St. Johns.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/St. Lucie.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Sumter.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Suwannee.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Taylor.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Union.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Volusia.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Wakulla.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Walton.geo.json',
      'downloaded/world.geo.json/countries/USA/FL/Washington.geo.json'
    ];


    const layers: Array<layer.Tile | layer.Vector> = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ];

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
        geoJSONLayer.setProperties({ featureType: 'national' });
        geoJSONLayer.setVisible(DEFAULT_NATIONAL_LAYER);
        layers.push(geoJSONLayer);
      }
    }

    if (countyUrls && countyUrls.length > 0) {
      for (const url of countyUrls) {
        console.log(url);
        const geoJSONLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            format: new format.GeoJSON(),
            url
          }),
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        geoJSONLayer.setProperties({ featureType: 'county' });
        geoJSONLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(geoJSONLayer);
      }
    }

    const stateDistrictsKml: string[] = [
      'downloaded/census/state/fl/cb_2017_12_sldu_500k/cb_2017_12_sldu_500k_modified.kml' // Modified copy with ID's changed
    ];

    if (stateDistrictsKml && stateDistrictsKml.length > 0) {
      for (const url of stateDistrictsKml) {
        const kmlSource = new ol.source.Vector({
          format: new format.KML({ extractStyles: false }),
          url,
          strategy: ol.loadingstrategy.all
        });
        const kmlLayer = new ol.layer.Vector({
          source: kmlSource,
          opacity: DEFAULT_OPACITY,
          style: this.styleFunction
        });
        kmlLayer.setProperties({ featureType: 'state' });
        kmlLayer.setVisible(!DEFAULT_NATIONAL_LAYER);
        layers.push(kmlLayer
        );
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

    // TODO Load districts/cds/2016/FL-15/shape.geojson

    this.setState({ map });
  }

  private buttonPressed = () => {
    if (this.state.map) {
      this.state.map.getLayers().forEach(mapLayer => {
        if ('featureType' in mapLayer.getProperties()) {
          mapLayer.setVisible(!mapLayer.getVisible());
        }
      });
    }
    this.setState({ showNational: true });
  };

  private mapClick = (evt: any) => { // ol.events.Event) {
    if (this.state.map) {
      this.state.map.forEachFeatureAtPixel(evt.pixel,
        (feature: ol.Feature | ol.render.Feature, featureLayer: ol.layer.Layer) => {
          // do stuff here with feature
          // console.log(feature);
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

  private static codeFromFeature(feature: ol.Feature | ol.render.Feature) {
    return 'Code' in feature.getProperties() ? feature.get('Code') : ('GEOID' in feature.getProperties() ? feature.get('GEOID').slice(-2).replace(/^0+/, '') : ('kind' in feature.getProperties() && feature.get('kind') === 'county' ? feature.get('name') : ''));
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
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({ color: '#000' }),
          stroke: new ol.style.Stroke({
            color: '#fff', width: 2
          }),
          text: MapView.codeFromFeature(feature)
        })
      })
    ];
  };

  public render() {
    return (
      <div>
        <SelectionInfo code={this.state.selectedCode} />
        <div id="map" className="map" />
        <div>
          <button onClick={(e) => this.buttonPressed()}>{this.state.showNational ? 'Show state legislature districts' : 'Show national disticts'}</button><br />
          <small>Showing: {this.state.showNational ? 'Showing national congressional districts' : 'Showing state legislature districts'}</small>
        </div>
      </div>
    );
  }

}

export default MapView;
