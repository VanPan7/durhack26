// Local content for the prototype.
// Later, swap these for Supabase queries (see src/lib/supabase.js).

export const TYPES = [
  { key: 'night', name: 'The Night Owl', tag: 'Your best stories start after midnight.', traits: 'Live music / Clubs / Late nights', color: '#3DD6C0' },
  { key: 'ritual', name: 'The Ritualist', tag: 'You travel for the moments a whole town stops for.', traits: 'Festivals / Craft / Heritage', color: '#FFB547' },
  { key: 'wander', name: 'The Wanderer', tag: 'You would rather get lost with a snack than follow a map.', traits: 'Markets / Street food / Slow days', color: '#FF6B4A' },
  { key: 'sun', name: 'The Sun Chaser', tag: 'Rhythm, heat and a dance floor with no walls.', traits: 'Carnival / Beaches / Warm nights', color: '#FF8FA3' }
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
  { q: "It's 9pm in a city you've never been to. Where are we?", options: [
    ['night', 'Down a staircase to a club with no sign'],
    ['ritual', 'Following a procession that seems to know where it is going'],
    ['wander', 'Third stall deep at a night market'],
    ['sun', 'On a rooftop, watching the sky change colour']
  ]},
  { q: 'Pick the soundtrack for the whole trip.', options: [
    ['night', 'A DJ set that runs until sunrise'],
    ['ritual', 'Drums, chants and instruments older than the town'],
    ['wander', 'Street musicians and whatever the taxi radio plays'],
    ['sun', 'Samba, soca or reggaeton with the windows down']
  ]},
  { q: "What's the first thing in your bag?", options: [
    ['night', 'Earplugs and a jacket that survives a long queue'],
    ['ritual', 'A notebook for names, dates and recipes'],
    ['wander', 'An empty tote for whatever I find'],
    ['sun', 'Sunscreen, obviously']
  ]},
  { q: 'How do you plan a day?', options: [
    ['night', 'Sleep in, then work backwards from the headliner'],
    ['ritual', 'Around whatever the calendar says is happening'],
    ['wander', 'I do not. I pick a direction and walk'],
    ['sun', 'Beach first, everything else second']
  ]},
  { q: 'Which souvenir wins?', options: [
    ['night', 'A wristband I refuse to cut off'],
    ['ritual', 'Something handmade by the person who sold it'],
    ['wander', "A bag of spices I'll never use properly"],
    ['sun', 'A tan line and a playlist']
  ]},
  { q: 'How does the trip end?', options: [
    ['night', 'Still dancing, with a flight in four hours'],
    ['ritual', 'Quietly, after one last ceremony'],
    ['wander', 'With a long lunch and no plans'],
    ['sun', 'Watching the last sunset from the water']
  ]}
];

// Tie-break order when two types score the same.
export const TYPE_ORDER = ['night', 'ritual', 'wander', 'sun'];

export const ARCHETYPES = {
  night: {
    name: 'The Night Owl', color: '#3DD6C0',
    tag: 'Your best stories start after midnight.',
    blurb: 'You plan trips around a line-up, not a landmark. Great sound, a good crowd and a late finish matter more than a sunrise view.',
    traits: 'Live music / Clubs / Late nights', sound: 'Techno and folk',
    places: [
      { rank: 'Top match', name: 'Berlin', country: 'Germany', blurb: 'Warehouse floors, lakeside open-airs and a scene that takes its music seriously.', festival: 'Open-air club season', when: 'May to September', sound: 'Techno, house, experimental' },
      { rank: 'Also fits', name: 'Tbilisi', country: 'Georgia', blurb: 'Clubs built into a stadium basement and under a bridge, with polyphonic singing in the old town.', festival: 'Tbilisoba', when: 'October', sound: 'Techno, polyphonic folk' },
      { rank: 'Wildcard', name: 'Medellín', country: 'Colombia', blurb: 'Salsa bars and reggaeton clubs in a warm, hillside city that stays up late.', festival: 'Feria de las Flores', when: 'August', sound: 'Reggaeton, salsa' }
    ]
  },
  ritual: {
    name: 'The Ritualist', color: '#FFB547',
    tag: 'You travel for the moments a whole town stops for.',
    blurb: 'Processions, lanterns, altars and old songs. You time your trip to the calendar and come home with names, recipes and stories.',
    traits: 'Festivals / Craft / Heritage', sound: 'Drums and bells',
    places: [
      { rank: 'Top match', name: 'Kyoto', country: 'Japan', blurb: 'Lantern-lit evenings and towering festival floats move through the old city streets.', festival: 'Gion Matsuri', when: 'July', sound: 'Taiko drums, temple bells' },
      { rank: 'Also fits', name: 'Oaxaca', country: 'Mexico', blurb: 'Marigold altars, cemetery vigils and brass bands winding through the neighbourhoods.', festival: 'Day of the Dead', when: '31 October to 2 November', sound: 'Brass bands, marimba' },
      { rank: 'Wildcard', name: 'Chiang Mai', country: 'Thailand', blurb: 'Paper lanterns rise over the old city and floating baskets drift down the river.', festival: 'Yi Peng and Loy Krathong', when: 'November', sound: 'Monk chants, festival drums' }
    ]
  },
  wander: {
    name: 'The Wanderer', color: '#FF6B4A',
    tag: 'You would rather get lost with a snack than follow a map.',
    blurb: 'Markets, side streets and long lunches. You leave room in the bag, and in the day, for whatever turns up.',
    traits: 'Markets / Street food / Slow days', sound: 'Street music',
    places: [
      { rank: 'Top match', name: 'Lisbon', country: 'Portugal', blurb: 'Tiled hills, tiny tascas and fado drifting out of Alfama doorways at night.', festival: 'Festas de Lisboa', when: 'June', sound: 'Fado, tram bells' },
      { rank: 'Also fits', name: 'Marrakech', country: 'Morocco', blurb: 'A square that turns into a night market, with storytellers and drummers in the smoke.', festival: 'Gnawa Festival, Essaouira', when: 'June', sound: 'Gnawa drums, storytellers' },
      { rank: 'Wildcard', name: 'Hoi An', country: 'Vietnam', blurb: 'Lantern-lined streets, tailors on every corner and a riverside that glows each full moon.', festival: 'Full Moon Lantern Festival', when: 'Monthly', sound: 'Riverside music, bicycle bells' }
    ]
  },
  sun: {
    name: 'The Sun Chaser', color: '#FF8FA3',
    tag: 'Rhythm, heat and a dance floor with no walls.',
    blurb: 'Warm nights, big drums and a beach never far away. You travel toward the loudest, brightest week on the calendar.',
    traits: 'Carnival / Beaches / Warm nights', sound: 'Samba and soca',
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
