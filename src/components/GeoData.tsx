export interface LayerSource {
  url: string;
  name: string;
}

export const STATE_DISTRICT_KML_URLS: string[] = [
  'downloaded/census/state/fl/cb_2017_12_sldu_500k/cb_2017_12_sldu_500k_modified.kml' // Modified copy with ID's changed
];

export const STATE_HOUSE_DISTRICT_KML_URLS: string[] = [
  'downloaded/census/state/fl/cb_2017_12_sldl_500k/cb_2017_12_sldl_500k_modified.kml' // Modified copy with ID's changed
];

export const DISTRICT_URLS: string[] = [
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

export const COUNTY_URLS: string[] = [
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

export const STATE_URLS: string[] = [
  'downloaded/world.geo.json/countries/USA/FL.geo.json'
];

export const PRECINCT_URLS: LayerSource[] = [
  {url: 'downloaded/precincts/FL/hillsborough/fl_hillsborough_precincts.geojson', name: 'Hillsborough'},
  {url: 'downloaded/precincts/FL/brevard/fl_brevard_precincts.geojson', name: 'Brevard'},
  {url: 'downloaded/precincts/FL/polk/fl_polk_precincts.geojson', name: 'Polk'}
  //{url: 'downloaded/precincts/FL/pasco/fl_pasco_precincts.geojson', name: 'Pasco'}
  //{url: 'downloaded/precincts/FL/broward/fl_broward_precincts.geojson', name: 'Broward'}
];
