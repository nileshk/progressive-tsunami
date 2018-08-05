export interface CandidateInfo {
  name: string;
  county: string;
  position: string;
  district?: string;
}

export const LocalCandidates: CandidateInfo[] = [
  { name: "Ryan Ross", county: "Broward", position: "Commission District 2", district: "2" },
  { name: "Beam Furr", county: "Broward", position: "Commission District 6", district: "6" },
  { name: "Nora Rupert", county: "Broward", position: "School Board District 7", district: "7" },
  { name: "Joshua Simmons", county: "Broward", position: "Coral Springs Commission 4", district: "4" },
  { name: "Renata Castro", county: "Broward", position: "Margate Commission 3", district: "3" },
  { name: "Tennille Doe-Decoste", county: "Broward", position: "School Board District 4", district: "4" },
  { name: "Justin Flippen", county: "Broward", position: "Wilton Manors Mayor", district: "" },
  { name: "Otis Brown", county: "Citrus", position: "Charitable Foundation 2", district: "2" },
  { name: "Adam York", county: "Citrus", position: "School Board District 5", district: "5" },
  { name: "Cheryl Owen", county: "Clay", position: "County Commission 4", district: "4" },
  { name: "Angela Birdsong", county: "Hillsborough", position: "Commission District 2", district: "2" },
  { name: "Mariella Smith", county: "Hillsborough", position: "Commission District 5", district: "5" },
  { name: "Kimberly Overman", county: "Hillsborough", position: "Commission District 7", district: "7" },
  { name: "Sky White", county: "Hillsborough", position: "Commission District 7", district: "7" },
  { name: "Bill Person", county: "Hillsborough", position: "School Board District 1", district: "1" },
  { name: "Scott Hottenstein", county: "Hillsborough", position: "School Board District 6", district: "6" },
  { name: "Robert Pechacek", county: "Hillsborough", position: "School Board District 6", district: "6" },
  { name: "Matt Gozdor", county: "Hillsborough", position: "Soil & Water District 5", district: "5" },
  { name: "Jeremy Matlow", county: "Leon", position: "Tallahassee Commission District 3", district: "3" },
  { name: "Marcus Nicolas", county: "Leon", position: "School Board District 5", district: "5" },
  { name: "Dustin Daniels", county: "Leon", position: "Mayor of Tallahassee" },
  { name: "Nicolette Springer", county: "Orange", position: "Commission District 4", district: "4" },
  { name: "Johanna Lopez", county: "Orange", position: "Board District 2", district: "2" },
  { name: "Emmanuel Morel", county: "Palm", position: "County Commission District 2", district: "2" },
  { name: "Debra Lynne Robinson", county: "Palm", position: "County School Board District 7", district: "7" },
  { name: "Nick Guy", county: "Sarasota", position: "School Board District 1", district: "1" },
  { name: "Shirley Brown", county: "Sarasota", position: "School Board District 4", district: "4" },
  { name: "Ruta Jouniari", county: "Sarasota", position: "Commission District 2", district: "2" },
  { name: "William Bliss", county: "Volusia", position: "Soil & Water District 1", district: "1" },
  { name: "Meghan Hamer", county: "Pasco", position: "School Board District 3", district: "3" }
];

export const USCongressionalCandidates: CandidateInfo[] = [
  { name: "Brandon Peters", county: "", position: "Congressional District 2", district: "FL-02" },
  { name: "Yvonne Hinson", county: "", position: "Congressional District 3", district: "FL-03" },
  { name: "Stephen Sevigny, MD", county: "", position: "Congressional District 6", district: "FL-06" },
  { name: "Chardo Richardson", county: "", position: "Congressional District 7", district: "FL-07" },
  { name: "Sanjay Patel", county: "", position: "Congressional District 8", district: "FL-08" },
  { name: "Andrew Learned", county: "", position: "Congressional District 15", district: "FL-15" },
  { name: "Pam Keith", county: "", position: "Congressional District 18", district: "FL-18" },
  { name: "David Richardson", county: "", position: "Congressional District 27", district: "FL-27" }
];
