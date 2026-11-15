// Local content for the prototype.
// Later, swap these for Supabase queries (see src/lib/supabase.js).

// Night
// Performing Arts
// People, festivals, culture
// Food
// Walking About
// Crafts & Collecting
// Nature
// History
// Family

export const TYPES = [
  { key: 'night', name: 'The Nocturnal Traveller', tag: 'Even abroad, you wouldn\'t dream of getting up before 5pm.', traits: 'Live music / Clubs / Late nights', color: '#3DD6C0' },
  { key: 'performing', name: 'The Patron', tag: 'Theatre, dance, music; that\'s what travellings all about.', traits: 'Festivals / Craft / Heritage', color: '#FFB547' },
  { key: 'culture', name: 'The People-Person', tag: 'What\'s the point of going abroad if not to engage with local culture?', traits: 'Markets / Street food / Slow days', color: '#FF6B4A' },
  { key: 'food', name: 'The Food-Lover', tag: 'No matter where you go, the best part of any holiday is hitting up the local restaurants.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' },
  { key: 'walking', name: 'The Walker', tag: 'Sometimes, the best thing on holiday is just to stretch your legs and explore.', traits: 'Adventure / New experiences / New worlds', color: '#FFDBBB' },
  { key: 'crafts', name: 'The Crafter-Collector', tag: 'Souvenirs and local craft techniques are the main thing catching your eye when you travel.', traits: 'Souvenirs / Craftsmanship / Markets', color: '#ADD8E6' },
  { key: 'nature', name: 'The Nature-Lover', tag: 'For you, the best way to unwind is a local nature reserve or walk on a rock beach.', traits: 'Forests / Beaches / Fresh air ', color: '#8A9A5B' },
  { key: 'history', name: 'The Historian', tag: 'Even on holiday, you seek out new knowledge and information.', traits: 'Museums / Local history / Architecture', color: '#C8A2C8' }
];

/*export const LINEUP = [
  { place: 'Kyoto', festival: 'Gion Matsuri', when: 'July', color: '#FFB547' },
  { place: 'Oaxaca', festival: 'Day of the Dead', when: '31 Oct to 2 Nov', color: '#FFB547' },
  { place: 'Rio de Janeiro', festival: 'Carnival', when: 'Feb or Mar', color: '#FF8FA3' },
  { place: 'Chiang Mai', festival: 'Yi Peng and Loy Krathong', when: 'November', color: '#FFB547' },
  { place: 'Tbilisi', festival: 'Tbilisoba', when: 'October', color: '#3DD6C0' },
  { place: 'Lisbon', festival: 'Festas de Lisboa', when: 'June', color: '#FF6B4A' },
  { place: 'Marrakech', festival: 'Gnawa Festival, Essaouira', when: 'June', color: '#FF6B4A' },
  { place: 'Port of Spain', festival: 'Trinidad Carnival', when: 'Feb or Mar', color: '#FF8FA3' },
  { place: 'Medellín', festival: 'Feria de las Flores', when: 'August', color: '#3DD6C0' }
];*/

// Each option carries the traveller type it votes for.
export const QUESTIONS = [
  { q: "It's 9pm in a city you've never been to. Where are you heading?", options: [
    [['walking', 'nature'], 'To bed to rest. You want to be out bright and early tomorrow.'],
    [['night', 'culture', 'performing'], 'Out! I\'d rather head out during the night to explore.'],
    [['crafts', 'culture', 'food'], 'The night market! All the best stuff is there.'],
    [['walking', 'night'], 'Wherever my feet take me.']
  ]},
  { q: 'On a rainy day, what do you find yourself doing?', options: [
    [['crafts'], 'Collecting or scrapbooking all the things I\'ve found so far.'],
    [['history', 'culture'], 'Find a nice museum or indoor outing for the day.'],
    [['nature', 'night', 'performing'], 'Watching the rain out the window.'],
    [['walking'], 'Ignore it; I don\'t mind the rain all that much.']
  ]},
  { q: "What's the first thing you look forwards to in a new city?", options: [
    [['food'], 'Food.'],
    [['walking', 'history', 'culture', 'nature'], 'All the new sights to see!'],
    [['crafts'], 'Souvenirs for myself and my friends :).'],
    [['culture', 'performing'], 'The new music, arts, drama they have to show!']
  ]},
  { q: 'How do you plan a day?', options: [
    [['night', 'performing'], 'Sleep in, then work backwards from a main idea'],
    [['culture', 'history'], 'Around whatever the calendar says is happening'],
    [['walking', 'crafts'], 'I do not. I pick a direction and walk'],
    [['nature', 'walking'], 'Beach first, everything else second']
  ]},
  { q: 'Which souvenir wins?', options: [
    [['night', 'performing'], 'A wristband I refuse to cut off'],
    [['crafts', 'culture', 'history'], 'Something handmade by the person who sold it'],
    [['walking', 'food'], "A bag of spices I'll never use properly"],
    [['nature', 'walking'], 'A tan line and a playlist']
  ]},
  { q: 'How does the trip end?', options: [
    [['night', 'performing'], 'Still dancing, with a flight in four hours'],
    [['culture', 'history'], 'Quietly, after one last ceremony'],
    [['walking', 'food'], 'With a long lunch and no plans'],
    [['nature', 'crafts'], 'Watching the last sunset from the water']
  ]},
  { q: 'You leave the holiday with an extra suitcase full of what?', options: [
    [['night', 'performing'], 'Clothes, accessories, and lots of hats!'],
    [['history', 'crafts'], 'Duty free alcohol and photobooth pictures.'],
    [['culture', 'food'], 'Lots of local delicacies and artisanal crafts.'],
    [['nature', 'walking'], 'Books on local wildlife and local viewpoints and scenery']
  ]},
  { q: 'Your instagram holiday dump is full of what?', options: [
    [['nature', 'walking', 'history'], 'Panoramic shots of the scenery.'],
    ['food', 'Loads of food pics.'],
    [['culture', 'night', 'performing'], 'Selfies, photobooth shots, club photos!'],
    [['crafts', 'culture'], 'Stuff you\'ve done with locals']
  ]},
  { q: 'Your perfect excursion consists of?', options: [
    [['history', 'food'], 'Guided tour of ancient ruins, followed by lunch overlooking the scenery.'],
    [['crafts', 'nature'], 'Swimming with dolphins and floating in crystal blue waters.'],
    [['walking', 'performing', 'culture'], 'Go and explore the town and looking at all the street performances.'],
    ['night', 'Pub crawl around the town and meet people.']
  ]},
  { q: 'What do you find most relaxing?', options: [
    [['performing', 'crafts'], 'Pool day followed by a luxurious spa.'],
    [['food', 'nature'], 'Beach day with ice cream.'],
    [['night', 'culture'], 'Listening to good music, with fun people, and letting loose.'],
    [['walking', 'history'], 'Long walks, good scenery, and some cool archaeological sites along the way.']
  ]}
];

// The eight traveller types. The order breaks ties when two types score the same.
export const TYPE_ORDER = ['night', 'performing', 'culture', 'food', 'walking', 'crafts', 'nature', 'history'];

// Each type belongs to one column ("category") of the concept_categories table in
// Supabase. That column lists the unesco_activities concepts for the type, and the
// recommended countries are worked out from the activities that use those concepts.
// Category names must match the column names in the table exactly.
export const ARCHETYPES = {
  night: {
    name: 'The Nocturnal Traveller', color: '#3DD6C0', category: 'Night life',
    tag: 'Even abroad, you wouldn\'t dream of getting up before 5pm.',
    blurb: 'You plan trips around the evening, not the landmark. Great sound, a good crowd and a late finish matter more than a sunrise view.',
    traits: 'Live music / Clubs / Late nights'
  },
  performing: {
    name: 'The Patron', color: '#FFB547', category: 'Performing arts',
    tag: 'Theatre, dance, music; that\'s what travelling is all about.',
    blurb: 'You book the show before the hotel. Stages, street performers and old songs shape your route, and you come home humming something nobody back home has heard.',
    traits: 'Theatre / Dance / Music'
  },
  culture: {
    name: 'The People-Person', color: '#FF6B4A', category: 'Culture',
    tag: 'What\'s the point of going abroad if not to engage with local culture?',
    blurb: 'You travel for the people. Local customs, community events and a conversation with whoever is next to you matter more than any checklist.',
    traits: 'Customs / Community / Local life'
  },
  food: {
    name: 'The Food-Lover', color: '#FF8FA3', category: 'Food',
    tag: 'No matter where you go, the best part of a holiday is hitting up all the local restaurants!',
    blurb: 'Your itinerary is a list of meals. Markets, family kitchens and the dish a town is proud of are what you remember long after the photos.',
    traits: 'Local dishes / Markets / Long lunches'
  },
  walking: {
    name: 'The Walker', color: '#FFDBBB', category: 'Walking around/explore',
    tag: 'Sometimes, the best thing you can do on holiday is stretch your legs and explore.',
    blurb: 'You leave room in the day for whatever turns up. Side streets, bridges and wrong turns are how you find the places the guidebooks missed.',
    traits: 'Side streets / Wandering / Slow days'
  },
  crafts: {
    name: 'The Crafter-Collector', color: '#B48CFF', category: 'Crafts & collecting',
    tag: 'Souvenirs and local craft techniques are the main thing catching your eye when you travel.',
    blurb: 'You want to see how it is made and take a piece home. Workshops, workshops and more workshops, and a bag that gets heavier every day.',
    traits: 'Workshops / Handmade / Souvenirs'
  },
  nature: {
    name: 'The Nature-Lover', color: '#4DB6FF', category: 'Nature',
    tag: 'For you, the best way to unwind is a local nature reserve or a walk on a rocky beach.',
    blurb: 'Weather, water and wide skies set your plans. You look for places where people and landscape have lived together for a long time.',
    traits: 'Landscapes / Wildlife / Open air'
  },
  history: {
    name: 'The Historian', color: '#E0B07A', category: 'History',
    tag: 'Even on holiday, you seek out new knowledge and information.',
    blurb: 'You want the story behind the place. Archives, old routes and living traditions tell you who was here before and why it still matters.',
    traits: 'Heritage / Archives / Old stories'
  }
};
