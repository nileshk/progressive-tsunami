export interface CandidateInfo {
  name: string;
  county: string;
  position: string;
  district?: string;
  url?: string;
}

export const StateWideCandidates: CandidateInfo[] = [
  {name: "Andrew Gillum", county: "", position: "Governer", district: "Florida", url: "https://andrewgillum.com/"},
  {name: "Sean Shaw", county: "", position: "Attorney General", district: "Florida", url: "https://seanshaw.com/"},
  {name: "Roy David Walker", county: "", position: "Commissioner of Agriculture and Consumer Services", district: "Florida", url: "https://walkerforflorida.com/"}
];

export const LocalCandidates: CandidateInfo[] = [
  {name: "James 'Alex' Goins", county: "Brevard", position: "Cocoa City Council District 1", district: "1"},
  {name: "Victoria Mitchner", county: "Brevard", position: "County Commission District 2", district: "2"},
  {name: "Daniel Batcheldor", county: "Brevard", position: "Melbourne City Council At Large", district: ""},
  {name: "Cheryl McDougall", county: "Brevard", position: "School Board District 2", district: "2"},
  {name: "Ryan Ross", county: "Broward", position: "Commission District 2", district: "2"},
  {name: "Beam Furr", county: "Broward", position: "Commission District 6", district: "6"},
  {name: "Nora Rupert", county: "Broward", position: "School Board District 7", district: "7"},
  {name: "Joshua Simmons", county: "Broward", position: "Coral Springs Commission 4", district: "4"},
  {name: "Renata Castro", county: "Broward", position: "Margate Commission 3", district: "3"},
  {name: "Tennille Doe-Decoste", county: "Broward", position: "School Board District 4", district: "4"},
  {name: "Justin Flippen", county: "Broward", position: "Wilton Manors Mayor", district: ""},
  {name: "Otis Brown", county: "Citrus", position: "Charitable Foundation 2", district: "2"},
  {name: "Adam York", county: "Citrus", position: "School Board District 5", district: "5"},
  {name: "Cheryl Owen", county: "Clay", position: "County Commission 4", district: "4"},
  {name: "Angela Birdsong", county: "Hillsborough", position: "Commission District 2", district: "2", url: "https://angelabirdsong.com/"},
  {name: "Mariella Smith", county: "Hillsborough", position: "Commission District 5", district: "5", url: "https://mariellasmith.com/"},
  {name: "Kimberly Overman", county: "Hillsborough", position: "Commission District 7", district: "7", url: "http://www.kimberlyoverman.com/"},
  {name: "Sky White", county: "Hillsborough", position: "Commission District 7", district: "7", url: "https://www.skyuwhite.com/"},
  {name: "Bill Person", county: "Hillsborough", position: "School Board District 1", district: "1", url: "https://www.billpersonschoolboard.org/"},
  {name: "Scott Hottenstein", county: "Hillsborough", position: "School Board District 6", district: "6", url: "http://www.mrhforschools.com/"},
  {name: "Robert Pechacek", county: "Hillsborough", position: "School Board District 6", district: "6", url: "https://votepechacek.org/"},
  {name: "Matt Gozdor", county: "Hillsborough", position: "Soil & Water District 5", district: "5", url: "https://www.facebook.com/MattGozdorSoilAndWater/"},
  {name: "Jeremy Matlow", county: "Leon", position: "Tallahassee Commission District 3", district: "3"},
  {name: "Marcus Nicolas", county: "Leon", position: "School Board District 5", district: "5"},
  {name: "Dustin Daniels", county: "Leon", position: "Mayor of Tallahassee"},
  {name: "Nicolette Springer", county: "Orange", position: "Commission District 4", district: "4"},
  {name: "Johanna Lopez", county: "Orange", position: "Board District 2", district: "2"},
  {name: "Emmanuel Morel", county: "Palm", position: "County Commission District 2", district: "2"},
  {name: "Debra Lynne Robinson", county: "Palm", position: "County School Board District 7", district: "7"},
  {name: "Kelly Smith", county: "Pasco", position: "County Commission District 2", district: "2"},
  {name: "Brandi Geoit", county: "Pasco", position: "County Commission District 4", district: "4"},
  {name: "Meghan Hamer", county: "Pasco", position: "School Board District 3", district: "3"},
  {name: "Karen Cooper Welzel", county: "Polk", position: "County Commission District 4", district: "4"},
  {name: "Sarah Fortney", county: "Polk", position: "School Board District 3", district: "3"},
  {name: "Kala Tedder", county: "Polk", position: "School Board District 3", district: "3"},
  {name: "Mike Aday", county: "Pasco", position: "School Board District 5", district: "5"},
  {name: "Nick Guy", county: "Sarasota", position: "School Board District 1", district: "1"},
  {name: "Shirley Brown", county: "Sarasota", position: "School Board District 4", district: "4"},
  {name: "Ruta Jouniari", county: "Sarasota", position: "Commission District 2", district: "2"},
  {name: "Barbara Girtman", county: "Volusia", position: "City Council District 1", district: "1"},
  {name: "L. Ronald Durham", county: "Volusia", position: "City Council At Large", district: ""},
  {name: "William Bliss", county: "Volusia", position: "Soil & Water District 1", district: "1"},
  {name: "Christine Wilt", county: "Volusia", position: "Soil & Water District 3", district: "3"}

];

export const USCongressionalCandidates: CandidateInfo[] = [
  {name: "Brandon Peters", county: "", position: "Congressional District 2", district: "FL-02"},
  {name: "Yvonne Hinson", county: "", position: "Congressional District 3", district: "FL-03"},
  {name: "Stephen Sevigny, MD", county: "", position: "Congressional District 6", district: "FL-06"},
  {name: "Chardo Richardson", county: "", position: "Congressional District 7", district: "FL-07"},
  {name: "Sanjay Patel", county: "", position: "Congressional District 8", district: "FL-08"},
  {name: "Andrew Learned", county: "", position: "Congressional District 15", district: "FL-15", url: "https://andrewlearned.com/"},
  {name: "Pam Keith", county: "", position: "Congressional District 18", district: "FL-18"},
  {name: "David Richardson", county: "", position: "Congressional District 27", district: "FL-27"}
];

export const FloridaSenateCandidates: CandidateInfo[] = [

  {name: "Billee Bussard", county: "", position: "Florida Senate District 4", district: "4"},
  {name: "Kayser Enneking", county: "", position: "Florida Senate District 8", district: "8"},
  {name: "Olysha Magruder", county: "", position: "Florida Senate District 8", district: "8"},
  {name: "Gary McKechnie", county: "", position: "Florida Senate District 12", district: "12"},
  {name: "Melissa Martin", county: "", position: "Florida Senate District 14", district: "14"},
  {name: "Bob Doyel", county: "", position: "Florida Senate District 22", district: "22"},
  {name: "Olivia Babis", county: "", position: "Florida Senate District 23", district: "23"},
  {name: "Julian Santos", county: "", position: "Florida Senate District 36", district: "36"},
  {name: "Gary Farmer", county: "", position: "Florida Senate District 34 (incumbent)", district: "34"},
  {name: "Annette Taddeo", county: "", position: "Florida Senate District 40 (incumbent)", district: "40"}
];

export const FloridaHouseCandidates: CandidateInfo[] = [
  {name: "Vikki Garrett", county: "", position: "Florida House District 1", district: "1"},
  {name: "Nathcelly Leroy Rohrbaugh", county: "", position: "Florida House District 11", district: "11"},
  {name: "Amol Jethwani", county: "", position: "Florida House District 21", district: "21"},
  {name: "Bernard Parker", county: "", position: "Florida House District 22", district: "22"},
  {name: "Neil Henrichsen", county: "", position: "Florida House District 27", district: "27"},
  {name: "Lee Mangold", county: "", position: "Florida House District 28", district: "28"},
  {name: "Darryl Block", county: "", position: "Florida House District 29", district: "29"},
  {name: "Oren Miller", county: "", position: "Florida House District 33", district: "33"},
  {name: "Tammy Garcia", county: "", position: "Florida House District 37", district: "37"},
  {name: "Barbara Cady", county: "", position: "Florida House District 42", district: "42"},
  {name: "Geraldine F. Thompson", county: "", position: "Florida House District 44", district: "44"},
  {name: "Anna Eskamani", county: "", position: "Florida House District 47", district: "47"},
  {name: "Carlos Guillermo Smith", county: "", position: "Florida House District 49 (incumbent)", district: "49"},
  {name: "Pamela Dirschka", county: "", position: "Florida House District 50", district: "50"},
  {name: "Phil Moore", county: "", position: "Florida House District 53", district: "53"},
  {name: "Phil Hornback", county: "", position: "Florida House District 58", district: "58", url: "https://www.philfor58.com/"},
  {name: "Adam Hattersley", county: "", position: "Florida House District 59", district: "59", url: "https://www.adamhattersley.com/"},
  {name: "Debra Bellanti", county: "", position: "Florida House District 60", district: "60", url: "http://votebellanti.com/"},
  {name: "Karen Skyers", county: "", position: "Florida House District 61", district: "61", url: "https://www.karenskyers.com/"},
  {name: "Fentrice Driskell", county: "", position: "Florida House District 63", district: "63", url: "https://fentriceforflorida.com/"},
  {name: "Jennifer Webb", county: "", position: "Florida House District 69", district: "69", url: "https://electjenniferwebb.com/"},
  {name: "Vito Sheeley", county: "", position: "Florida House District 70", district: "70", url: "https://www.vitosheeley.com/"},
  {name: "Tracy B. Pratt", county: "", position: "Florida House District 71", district: "71"},
  {name: "Liv Coleman", county: "", position: "Florida House District 73", district: "73"},
  {name: "Edgardo Hernandez", county: "", position: "Florida House District 87", district: "87"},
  {name: "James Bonfiglio ", county: "", position: "Florida House District 89", district: "89"},
  {name: "Ryan Rossi", county: "", position: "Florida House District 89", district: "89"},
  {name: "Saima Farooqui", county: "", position: "Florida House District 96", district: "96"},
  {name: "Michael Gottlieb", county: "", position: "Florida House District 98", district: "98"},
  {name: "Sara McFadden", county: "", position: "Florida House District 106", district: "106"},
  {name: "Dotie Joseph", county: "", position: "Florida House District 108", district: "108"},
  {name: "Cedric McMinn", county: "", position: "Florida House District 109", district: "109"},
  {name: "Kubs Lalchandani", county: "", position: "Florida House District 113", district: "113"},
  {name: "Steve Friedman", county: "", position: "Florida House District 120", district: "120"}
];
