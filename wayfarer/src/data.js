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
  { key: 'walking', name: 'The Walker', tag: 'Sometimes, the best thing on holiday is just to stretch your legs and explore.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' },
  { key: 'crafts', name: 'The Crafter-Collector', tag: 'Souvenirs and local craft techniques are the main thing catching your eye when you travel.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' },
  { key: 'nature', name: 'The Nature-Lover', tag: 'For you, the best way to unwind is a local nature reserve or walk on a rock beach.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' },
  { key: 'history', name: 'The Historian', tag: 'Even on holiday, you seek out new knowledge and information.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' }
];

export const LINEUP = [
  { place: 'Kyoto', festival: 'Gion Matsuri', when: 'July', color: '#FFB547' },
  { place: 'Oaxaca', festival: 'Day of the Dead', when: '31 Oct to 2 Nov', color: '#FFB547' },
  { place: 'Rio de Janeiro', festival: 'Carnival', when: 'Feb or Mar', color: '#FF8FA3' },
  { place: 'Chiang Mai', festival: 'Yi Peng and Loy Krathong', when: 'November', color: '#FFB547' },
  { place: 'Tbilisi', festival: 'Tbilisoba', when: 'October', color: '#3DD6C0' },
  { place: 'Lisbon', festival: 'Festas de Lisboa', when: 'June', color: '#FF6B4A' },
  { place: 'Marrakech', festival: 'Gnawa Festival, Essaouira', when: 'June', color: '#FF6B4A' },
  { place: 'Port of Spain', festival: 'Trinidad Carnival', when: 'Feb or Mar', color: '#FF8FA3' },
  { place: 'Medellín', festival: 'Feria de las Flores', when: 'August', color: '#3DD6C0' }
];

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
    [['night', 'culture'], 'Listening to good music, with fun people, and letting loose.']
    [['walking', 'history'], 'Long walks, good scenery, and some cool archaeological sites along the way.']
  ]}
];

// Tie-break order when two types score the same.
export const TYPE_ORDER = ['night', 'ritual', 'wander', 'sun'];

export const ARCHETYPES = {
  night: {
    name: 'The Nocturnal Traveller', color: '#3DD6C0',
    tag: 'Even abroad, you wouldn\'t dream of getting up before 5pm.',
    blurb: 'You plan trips around a line-up, not a landmark. Great sound, a good crowd and a late finish matter more than a sunrise view.',
    traits: 'Live music / Clubs / Late nights', sound: 'Techno and folk',
    places: [
      { rank: 'Top match', name: 'Berlin', country: 'Germany', blurb: 'Warehouse floors, lakeside open-airs and a scene that takes its music seriously.', festival: 'Open-air club season', when: 'May to September', sound: 'Techno, house, experimental' },
      { rank: 'Also fits', name: 'Tbilisi', country: 'Georgia', blurb: 'Clubs built into a stadium basement and under a bridge, with polyphonic singing in the old town.', festival: 'Tbilisoba', when: 'October', sound: 'Techno, polyphonic folk' },
      { rank: 'Wildcard', name: 'Medellín', country: 'Colombia', blurb: 'Salsa bars and reggaeton clubs in a warm, hillside city that stays up late.', festival: 'Feria de las Flores', when: 'August', sound: 'Reggaeton, salsa' }
    ]
  },
  performing: {
    name: 'The Patron', color: '#FFB547',
    tag: 'Theater, dance, music; that\'s what travelling is all about.',
    blurb: 'Processions, lanterns, altars and old songs. You time your trip to the calendar and come home with names, recipes and stories.',
    traits: 'Festivals / Craft / Heritage', sound: 'Drums and bells',
    places: [
      { rank: 'Top match', name: 'Kyoto', country: 'Japan', blurb: 'Lantern-lit evenings and towering festival floats move through the old city streets.', festival: 'Gion Matsuri', when: 'July', sound: 'Taiko drums, temple bells' },
      { rank: 'Also fits', name: 'Oaxaca', country: 'Mexico', blurb: 'Marigold altars, cemetery vigils and brass bands winding through the neighbourhoods.', festival: 'Day of the Dead', when: '31 October to 2 November', sound: 'Brass bands, marimba' },
      { rank: 'Wildcard', name: 'Chiang Mai', country: 'Thailand', blurb: 'Paper lanterns rise over the old city and floating baskets drift down the river.', festival: 'Yi Peng and Loy Krathong', when: 'November', sound: 'Monk chants, festival drums' }
    ]
  },
  walking: {
    name: 'The Walker', color: '#FF6B4A',
    tag: 'Sometimes, the best thing you can do on holiday is to strecth your legs and explore.',
    blurb: 'Markets, side streets and long lunches. You leave room in the bag, and in the day, for whatever turns up.',
    traits: 'Rural areas / Navigation / Slow days', sound: 'Street music',
    places: [
      { rank: 'Top match', name: 'Lisbon', country: 'Portugal', blurb: 'Tiled hills, tiny tascas and fado drifting out of Alfama doorways at night.', festival: 'Festas de Lisboa', when: 'June', sound: 'Fado, tram bells' },
      { rank: 'Also fits', name: 'Marrakech', country: 'Morocco', blurb: 'A square that turns into a night market, with storytellers and drummers in the smoke.', festival: 'Gnawa Festival, Essaouira', when: 'June', sound: 'Gnawa drums, storytellers' },
      { rank: 'Wildcard', name: 'Hoi An', country: 'Vietnam', blurb: 'Lantern-lined streets, tailors on every corner and a riverside that glows each full moon.', festival: 'Full Moon Lantern Festival', when: 'Monthly', sound: 'Riverside music, bicycle bells' }
    ]
  },
  culture: {
    name: 'The People-Person', color: '#FF8FA3',
    tag: 'What\'s the point of going abroad if not to engage with local culture?',
    blurb: 'Warm nights, big drums and a beach never far away. You travel toward the loudest, brightest week on the calendar.',
    traits: 'Carnival / Socio-cultural practices / Warm nights', sound: 'Samba and soca',
    places: [
      { rank: 'Top match', name: 'Rio de Janeiro', country: 'Brazil', blurb: 'Samba schools, neighbourhood blocos and beach days between parades.', festival: 'Carnival', when: 'February or March', sound: 'Samba, bloco drums' },
      { rank: 'Also fits', name: 'Port of Spain', country: 'Trinidad and Tobago', blurb: 'Costumes, steel pan and soca trucks fill the streets for the biggest days of the year.', festival: 'Trinidad Carnival', when: 'February or March', sound: 'Soca, steel pan' },
      { rank: 'Wildcard', name: 'Cartagena', country: 'Colombia', blurb: 'Walled-city evenings with cumbia in the plazas and a Caribbean coast on the doorstep.', festival: 'Festival Internacional de Música', when: 'January', sound: 'Cumbia, champeta' }
    ]
  },
  food: {
    name: 'The Food-Lover', color: '#FF8FA3',
    tag: 'No matter where you go, the best part of a holiday is hitting up all the local restaurants!',
    blurb: 'Warm nights, big drums and a beach never far away. You travel toward the loudest, brightest week on the calendar.',
    traits: 'Food customs / Food preparation / Oven', sound: 'Soul and jazz',
    places: [
      { rank: 'Top match', name: 'Rio de Janeiro', country: 'Brazil', blurb: 'Samba schools, neighbourhood blocos and beach days between parades.', festival: 'Carnival', when: 'February or March', sound: 'Samba, bloco drums' },
      { rank: 'Also fits', name: 'Port of Spain', country: 'Trinidad and Tobago', blurb: 'Costumes, steel pan and soca trucks fill the streets for the biggest days of the year.', festival: 'Trinidad Carnival', when: 'February or March', sound: 'Soca, steel pan' },
      { rank: 'Wildcard', name: 'Cartagena', country: 'Colombia', blurb: 'Walled-city evenings with cumbia in the plazas and a Caribbean coast on the doorstep.', festival: 'Festival Internacional de Música', when: 'January', sound: 'Cumbia, champeta' }
    ]
  }
};

// Concepts in the unesco_activities table (primary_concepts) that suit each type.
// Values must match the table exactly, including capitals.
export const ARCHETYPE_CONCEPTS = {
  night: [
    'Popular music', 'Musical performances', 'Instrumental music', 'Vocal music',
    'Percussion instruments', 'Improvisation', 'Dance', 'Choreography',
    'Street art', 'Social gathering', 'Opera', 'Theatrical performances',
    'Orchestras', 'Musicians', 'Performing arts', 'Throat singing', 'Trance'
  ],
  ritual: [
    'Festivals', 'Festivity', 'Rituals', 'Procession', 'Pilgrimages',
    'Seasonal ritual', 'Ritual dance', 'Ritual items', 'Masks', 'Costumes',
    'Handicrafts', 'Craft workers', 'Weaving', 'Embroidery', 'Pottery',
    'Wood carving', 'Calligraphy', 'Religious practice', 'Sacred sites',
    'Veneration of the dead', 'New year', 'Lantern', 'Oral tradition'
  ],
  wander: [
    'Food customs', 'Food preparation', 'Food production', 'Bread',
    'Fermented beverages', 'Beverages', 'Winemaking', 'Brewing',
    'Hospitality', 'Fair', 'Story telling', 'Folk art', 'Rural areas',
    'Nomadism', 'Games', 'Toys', 'Traditional medicine', 'Social interaction'
  ],
  sun: [
    'Carnival', 'Float', 'Beauty pageant', 'Dance', 'Choreography',
    'Festivity', 'Popular music', 'Percussion instruments', 'Body painting',
    'Sailing', 'Swimming', 'Maritime transport', 'Sport', 'Contests',
    'Equestrian games', 'Firewalking', 'Acrobatics'
  ]
};
