# Progressive Tsunami #

This an interactive map used to view progressive candidates.  It currently shows candidates who were endorsed by the Democratic Progressive Caucus of Florida (including local chapters) for the Florida primary.


View the site here:

[https://progressivetsunami.com/](https://progressivetsunami.com/)

This is a single-page app created using [React.js](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), and [OpenLayers](https://openlayers.org/).  It uses [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)

## Usage ##

#### Download Boundary Files ####

The boundary files are not included in this repository.  They must be downloaded and placed in appropriate folders under /public/downloaded.  To do this, in the /public/downloaded folder:

* `git clone https://github.com/unitedstates/districts.git`

* `git clone https://github.com/johan/world.geo.json.git`

* Download both the upper and lower Boundary KML Files (2017 or later) for Florida from here: [https://www.census.gov/geo/maps-data/data/kml/kml_sld.html](https://www.census.gov/geo/maps-data/data/kml/kml_sld.html)

* Copy cb_2017_12_sldl_500k.kml to /public/downloaded/census/state/fl/cb_2017_12_sldl_500k_modified.kml
* Copy cb_2017_12_sldu_500k.kml to /public/downloaded/census/state/fl/cb_2017_12_sldu_500k_modified.kml

* For both census KML files, modify all `id` attributes for `Placemark` elements to something unique.  I used the number from the `name` tags, but maybe the district name would have been a better choice.

* Download Florida Congressional Districts by County for Florida from: [https://www2.census.gov/geo/relfiles/cdsld13/12/co_cd_12.txt](https://www2.census.gov/geo/relfiles/cdsld13/12/co_cd_12.txt)

~~https://www2.census.gov/geo/relfiles/cdsld16/12/co_cd_delim_12.txt~~

**TODO** Automate this process of downloading and modifying these files 

#### Development ####

This requires [Node.js](https://nodejs.org/) which includes npm

To run in development mode:

`npm start`

To create a release build in the /build folder:

`npm run build`

## Author ##

This was created by [Nilesh Kapadia](https://nileshk.com).

## License ##

Progressive Tsunami is licensed under MIT License see `LICENSE` file
