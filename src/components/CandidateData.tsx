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
  {name: "James 'Alex' Goins", county: "Brevard", position: "Cocoa City Council District 1", district: "1", url: "https://www.facebook.com/pages/biz/James-Alex-Goins-2018-City-Of-Cocoa-District-1-134520040716449/"},
  {name: "Victoria Mitchner", county: "Brevard", position: "County Commission District 2", district: "2", url: "https://www.crowdpac.com/campaigns/381538/victoria-mitchner"},
  {name: "Daniel Batcheldor", county: "Brevard", position: "Melbourne City Council At Large", district: "", url: "https://danielbatcheldor.com/council/"},
  {name: "Cheryl McDougall", county: "Brevard", position: "School Board District 2", district: "2", url: "http://cherylmcdougall.com/"},
  {name: "Ryan Ross", county: "Broward", position: "Commission District 2", district: "2", url: "https://rrbroward.com/"},
  {name: "Beam Furr", county: "Broward", position: "Commission District 6", district: "6", url: "http://www.beamfurr.com/"},
  {name: "Nora Rupert", county: "Broward", position: "School Board District 7", district: "7", url: "https://www.norarupert.com/"},
  {name: "Joshua Simmons", county: "Broward", position: "Coral Springs Commission 4", district: "4", url: "https://www.electjoshuasimmons2018.com/"},
  {name: "Renata Castro", county: "Broward", position: "Margate Commission 3", district: "3", url: "https://www.facebook.com/Renataseat2/"},
  {name: "Tennille Doe-Decoste", county: "Broward", position: "School Board District 4", district: "4", url: "http://tennilledoedecoste.org/"},
  {name: "Justin Flippen", county: "Broward", position: "Wilton Manors Mayor", district: "", url: "http://www.justinflippen.com/Welcome.html"},
  {name: "Otis Brown", county: "Citrus", position: "Charitable Foundation 2", district: "2", url: "https://www.facebook.com/pages/biz/Otis-Brown-for-Citrus-County-Community-Charitable-Foundation-Seat-2-189492818417893/"},
  {name: "Adam York", county: "Citrus", position: "School Board District 5", district: "5", url: "https://www.yorkforcitrusschools.com/"},
  {name: "Cheryl Owen", county: "Clay", position: "County Commission 4", district: "4", url: "https://www.facebook.com/owencheryl/"},
  {name: "Angela Birdsong", county: "Hillsborough", position: "Commission District 2", district: "2", url: "https://angelabirdsong.com/"},
  {name: "Mariella Smith", county: "Hillsborough", position: "Commission District 5", district: "5", url: "https://mariellasmith.com/"},
  {name: "Kimberly Overman", county: "Hillsborough", position: "Commission District 7", district: "7", url: "http://www.kimberlyoverman.com/"},
  {name: "Sky White", county: "Hillsborough", position: "Commission District 7", district: "7", url: "https://www.skyuwhite.com/"},
  {name: "Bill Person", county: "Hillsborough", position: "School Board District 1", district: "1", url: "https://www.billpersonschoolboard.org/"},
  {name: "Scott Hottenstein", county: "Hillsborough", position: "School Board District 6", district: "6", url: "http://www.mrhforschools.com/"},
  {name: "Robert Pechacek", county: "Hillsborough", position: "School Board District 6", district: "6", url: "https://votepechacek.org/"},
  {name: "Matt Gozdor", county: "Hillsborough", position: "Soil & Water District 5", district: "5", url: "https://www.facebook.com/MattGozdorSoilAndWater/"},
  {name: "Jeremy Matlow", county: "Leon", position: "Tallahassee Commission District 3", district: "3", url: "https://www.jeremymatlow.com/"},
  {name: "Marcus Nicolas", county: "Leon", position: "School Board District 5", district: "5", url: "https://www.vote4nicolas.com/"},
  {name: "Dustin Daniels", county: "Leon", position: "Mayor of Tallahassee", url: "https://www.dustindaniels.com/"},
  {name: "Nicolette Springer", county: "Orange", position: "Commission District 4", district: "4", url: "https://www.nicolettespringer.com/"},
  {name: "Johanna Lopez", county: "Orange", position: "Board District 2", district: "2", url: "https://www.votejohannalopez.com/"},
  {name: "Emmanuel Morel", county: "Palm", position: "County Commission District 2", district: "2", url: "https://www.votemorel.com/"},
  {name: "Debra Lynne Robinson", county: "Palm", position: "County School Board District 7", district: "7", url: "https://www.facebook.com/ReElectDrDebraLRobinson/"},
  {name: "Kelly Smith", county: "Pasco", position: "County Commission District 2", district: "2", url: "https://kellysmithforpascocounty.com/"},
  {name: "Brandi Geoit", county: "Pasco", position: "County Commission District 4", district: "4", url: "https://brandicampaign.com/"},
  {name: "Meghan Hamer", county: "Pasco", position: "School Board District 3", district: "3", url: "https://www.hamer4pascoschools3.com/"},
  {name: "Karen Cooper Welzel", county: "Polk", position: "County Commission District 4", district: "4", url: "https://karen4polkcounty.com/"},
  {name: "Sarah Fortney", county: "Polk", position: "School Board District 3", district: "3", url: "https://sites.google.com/view/thesarahfortneycampaign/"},
  {name: "Kala Tedder", county: "Polk", position: "School Board District 3", district: "3", url: "https://www.kalatedder.com/"},
  {name: "Mike Aday", county: "Pasco", position: "School Board District 5", district: "5", url: "https://www.facebook.com/mikeaday4pasco/"},
  {name: "Nick Guy", county: "Sarasota", position: "School Board District 1", district: "1", url: "https://votenickguy.com/"},
  {name: "Shirley Brown", county: "Sarasota", position: "School Board District 4", district: "4", url: "https://www.electshirleybrown.com/"},
  {name: "Ruta Jouniari", county: "Sarasota", position: "Commission District 2", district: "2", url: "https://vote4ruta.com/"},
  {name: "Barbara Girtman", county: "Volusia", position: "City Council District 1", district: "1", url: "https://www.barbgirtman.com/"},
  {name: "L. Ronald Durham", county: "Volusia", position: "City Council At Large", district: "", url: "http://www.durham2018.com/"},
  {name: "William Bliss", county: "Volusia", position: "Soil & Water District 1", district: "1", url: "https://bliss-for-volusia.org/"},
  {name: "Christine Wilt", county: "Volusia", position: "Soil & Water District 3", district: "3", url: ""}
];

export const USCongressionalCandidates: CandidateInfo[] = [
  {name: "Brandon Peters", county: "", position: "Congressional District 2", district: "FL-02", url: "http://peters4congress.com/"},
  {name: "Yvonne Hinson", county: "", position: "Congressional District 3", district: "FL-03", url: "https://www.yvonneforcongress.com/"},
  {name: "Stephen Sevigny, MD", county: "", position: "Congressional District 6", district: "FL-06", url: "https://sevignyforcongress.com/"},
  {name: "Chardo Richardson", county: "", position: "Congressional District 7", district: "FL-07", url: "https://chardo2018.com/"},
  {name: "Sanjay Patel", county: "", position: "Congressional District 8", district: "FL-08", url: "https://www.votesanjaypatel.com/"},
  {name: "Andrew Learned", county: "", position: "Congressional District 15", district: "FL-15", url: "https://andrewlearned.com/"},
  {name: "Pam Keith", county: "", position: "Congressional District 18", district: "FL-18", url: "https://electpamkeith.com/"},
  {name: "David Richardson", county: "", position: "Congressional District 27", district: "FL-27", url: "https://davidforflorida.com/"}
];

export const FloridaSenateCandidates: CandidateInfo[] = [

  {name: "Billee Bussard", county: "", position: "Florida Senate District 4", district: "4", url: "http://www.billee4flsenate4.com/"},
  {name: "Kayser Enneking", county: "", position: "Florida Senate District 8", district: "8", url: "https://www.ennekingforflorida.com/"},
  {name: "Olysha Magruder", county: "", position: "Florida Senate District 8", district: "8", url: "http://voteolysha.com/"},
  {name: "Gary McKechnie", county: "", position: "Florida Senate District 12", district: "12", url: "http://gary2018.com/"},
  {name: "Melissa Martin", county: "", position: "Florida Senate District 14", district: "14", url: "https://www.melforsenate14.com/"},
  {name: "Bob Doyel", county: "", position: "Florida Senate District 22", district: "22", url: "https://bobdoyel.com/"},
  {name: "Olivia Babis", county: "", position: "Florida Senate District 23", district: "23", url: "https://www.oliviababis.com/"},
  {name: "Julian Santos", county: "", position: "Florida Senate District 36", district: "36", url: "https://www.santosforflorida.com/"},
  {name: "Gary Farmer", county: "", position: "Florida Senate District 34 (incumbent)", district: "34", url: "https://www.electgaryfarmer.com/"},
  {name: "Annette Taddeo", county: "", position: "Florida Senate District 40 (incumbent)", district: "40", url: "https://annettetaddeo.com/"}
];

export const FloridaHouseCandidates: CandidateInfo[] = [
  {name: "Vikki Garrett", county: "", position: "Florida House District 1", district: "1", url: "http://www.electvikkigarrett.com/"},
  {name: "Nathcelly Leroy Rohrbaugh", county: "", position: "Florida House District 11", district: "11", url: "https://nathcellyforflorida.com/"},
  {name: "Amol Jethwani", county: "", position: "Florida House District 21", district: "21", url: "https://amolforflorida.com/"},
  {name: "Bernard Parker", county: "", position: "Florida House District 22", district: "22", url: ""},
  {name: "Neil Henrichsen", county: "", position: "Florida House District 27", district: "27", url: "https://neilfor27.com/"},
  {name: "Lee Mangold", county: "", position: "Florida House District 28", district: "28", url: "http://www.leemangold.com/"},
  {name: "Darryl Block", county: "", position: "Florida House District 29", district: "29", url: "https://www.darrylblockfor29.com/"},
  {name: "Oren Miller", county: "", position: "Florida House District 33", district: "33", url: "https://www.orenlmiller.com/"},
  {name: "Tammy Garcia", county: "", position: "Florida House District 37", district: "37", url: "https://www.votetammygarcia.com/"},
  {name: "Barbara Cady", county: "", position: "Florida House District 42", district: "42", url: "https://www.cady4house42.com/"},
  {name: "Geraldine F. Thompson", county: "", position: "Florida House District 44", district: "44", url: "http://electgeraldine.com/"},
  {name: "Anna Eskamani", county: "", position: "Florida House District 47", district: "47", url: "https://www.annaforflorida.com/"},
  {name: "Carlos Guillermo Smith", county: "", position: "Florida House District 49 (incumbent)", district: "49", url: "https://www.carlosguillermosmith.com/"},
  {name: "Pamela Dirschka", county: "", position: "Florida House District 50", district: "50", url: "https://www.crowdpac.com/campaigns/379889/pamela-dirschka"},
  {name: "Phil Moore", county: "", position: "Florida House District 53", district: "53", url: "http://www.votephilmoore.com/"},
  {name: "Phil Hornback", county: "", position: "Florida House District 58", district: "58", url: "https://www.philfor58.com/"},
  {name: "Adam Hattersley", county: "", position: "Florida House District 59", district: "59", url: "https://www.adamhattersley.com/"},
  {name: "Debra Bellanti", county: "", position: "Florida House District 60", district: "60", url: "http://votebellanti.com/"},
  {name: "Karen Skyers", county: "", position: "Florida House District 61", district: "61", url: "https://www.karenskyers.com/"},
  {name: "Fentrice Driskell", county: "", position: "Florida House District 63", district: "63", url: "https://fentriceforflorida.com/"},
  {name: "Jennifer Webb", county: "", position: "Florida House District 69", district: "69", url: "https://electjenniferwebb.com/"},
  {name: "Vito Sheeley", county: "", position: "Florida House District 70", district: "70", url: "https://www.vitosheeley.com/"},
  {name: "Tracy B. Pratt", county: "", position: "Florida House District 71", district: "71", url: "http://www.votetracypratt.com/"},
  {name: "Liv Coleman", county: "", position: "Florida House District 73", district: "73", url: "https://livcoleman.com/"},
  {name: "Edgardo Hernandez", county: "", position: "Florida House District 87", district: "87", url: "https://www.florida4ward.com/"},
  {name: "James Bonfiglio", county: "", position: "Florida House District 89", district: "89", url: "http://jimbonfigliofordistrict89.com/"},
  {name: "Ryan Rossi", county: "", position: "Florida House District 89", district: "89", url: "https://electrossi.nationbuilder.com/"},
  {name: "Saima Farooqui", county: "", position: "Florida House District 96", district: "96", url: "https://www.saimafarooqui.com/"},
  {name: "Michael Gottlieb", county: "", position: "Florida House District 98", district: "98", url: "https://www.browardcriminallawyer.com/"},
  {name: "Sara McFadden", county: "", position: "Florida House District 106", district: "106", url: "https://votemcfadden.com/"},
  {name: "Dotie Joseph", county: "", position: "Florida House District 108", district: "108", url: "http://dotiejoseph.com/"},
  {name: "Cedric McMinn", county: "", position: "Florida House District 109", district: "109", url: "http://electcedricmcminn.com/"},
  {name: "Kubs Lalchandani", county: "", position: "Florida House District 113", district: "113", url: "https://kubsforflorida.com/"},
  {name: "Steve Friedman", county: "", position: "Florida House District 120", district: "120", url: "https://www.captainsteve4florida.com/"}
];
