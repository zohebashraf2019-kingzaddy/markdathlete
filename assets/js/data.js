/* =========================================================
   MarkdAthlete — site data
   Edit this file to add athletes, races, spots and sponsors.
   Everything below is SAMPLE content — replace before launch.
   ========================================================= */

window.MA_CONFIG = {
  siteName: "MarkdAthlete",
  tagline: "Get Seen. Get Sponsored. Get Markd.",
  // Where sponsor requests + athlete applications are sent.
  // Option A: a Formspree / Getform / Supabase edge-function URL (recommended)
  // Option B: leave empty to fall back to an email draft (mailto)
  formEndpoint: "",
  contactEmail: "hello@markdathlete.com",
  instagram: "markdathlete",
  launchNote: "MarkdAthlete is live — founding athletes and sponsors are joining now."
};

/* Spot types an athlete can sell.
   kind: "cost" = covers a race cost, "brand" = logo/text placement */
window.MA_SPOT_TYPES = {
  entry:   { label: "Race entry",     kind: "cost",  icon: "ticket" },
  hotel:   { label: "Hotel",          kind: "cost",  icon: "bed" },
  flights: { label: "Flights",        kind: "cost",  icon: "plane" },
  shoes:   { label: "Race shoes",     kind: "cost",  icon: "shoe" },
  fuel:    { label: "Race-day fuel",  kind: "cost",  icon: "bolt" },
  singlet: { label: "Logo on singlet",kind: "brand", icon: "shirt" },
  tattoo:  { label: "Temp tattoo",    kind: "brand", icon: "star" },
  shout:   { label: "IG shout-out",   kind: "brand", icon: "camera" }
};

window.MA_ATHLETES = [
  {
    id: "jenny-escalera",
    name: "Jenny Escalera",
    headline: "Marathoner | Reno to NYC | 2026 TCS New York City Marathon",
    location: "Reno, NV",
    founding: true,
    memberSince: "October 2026",
    photo: "assets/img/athletes/jenny-escalera.jpg",
    cover: "assets/img/athletes/jenny-escalera-cover.jpg",
    disciplines: [
      { sport: "Running", events: "Marathon" }
    ],
    instagram: "jjennyy.e",
    bio: `🏃‍♀️ From Reno to NYC! 🗽🏅
Meet an incredible athlete from Reno, Nevada, who is getting ready to take on the 2026 TCS New York City Marathon!🏃‍♀️🔥
For the past several months, she has been putting in the hard work, early morning runs, countless miles, and endless dedication to prepare for one of the world's most iconic marathons.
What started as a goal is now becoming a reality. Every mile, every challenge, and every training session has brought her one step closer to the NYC finish line!
Now she's ready to represent Reno, Nevada, on the streets of New York City! 🗽💪
Let's show her some love and support as she takes on this incredible journey!
Reno Strong. NYC Bound. 26.2 Miles. One Goal. 🏅❤️
#NYCMarathon2026 #RenoToNYC #RoadToNYC #MarathonTraining #RenoNevada #RunYourRace #262Miles`,
    stats: [],
    accent: "#FF5A0A",
    races: [
      {
        id: "nyc-marathon-2026",
        name: "TCS New York City Marathon",
        date: "2026-11-01",
        city: "New York, NY",
        division: "Women's Open",
        goal: "Finish all 26.2 miles for Reno",
        campaign: true,
        // TODO: confirm these amounts with Jenny
        spots: [
          { type: "flights", price: 450, sponsoredBy: null },
          { type: "hotel",   price: 600, sponsoredBy: null },
          { type: "fuel",    price: 60,  sponsoredBy: null },
          { type: "singlet", price: 150, sponsoredBy: null },
          { type: "shout",   price: 50,  sponsoredBy: null }
        ]
      }
    ]
  },
  {
    id: "jordan-reyes",
    name: "Jordan Reyes",
    headline: "Marathoner | Chasing a Boston Qualifier | Run Coach",
    location: "Reno, NV",
    founding: true,
    memberSince: "October 2026",
    disciplines: [
      { sport: "Running", events: "Half marathon, Marathon" },
      { sport: "Trail", events: "25K, 50K" }
    ],
    instagram: "jordanruns.reno",
    strava: "",
    bio: "I run before sunrise, coach after work and race every chance I get. Two years ago I couldn't run a 5K without stopping. Now I'm 4 minutes off a Boston Qualifier. Sponsorship helps me cover travel and entry fees so I can race the courses that get me there — and I'll put your name in front of everyone who follows the chase.",
    stats: [ { v: "3:04", l: "Marathon PR" }, { v: "1:26", l: "Half PR" }, { v: "12", l: "Races in 2026" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "cim-2026",
        name: "Sacramento Marathon",
        date: "2026-12-06",
        city: "Sacramento, CA",
        division: "Open",
        goal: "Sub 3:00 — Boston Qualifier",
        campaign: true,
        spots: [
          { type: "entry",   price: 220, sponsoredBy: null },
          { type: "hotel",   price: 380, sponsoredBy: null },
          { type: "singlet", price: 150, sponsoredBy: "sierra-physio" },
          { type: "fuel",    price: 60,  sponsoredBy: null }
        ]
      },
      { id: "spring-half", name: "Spring Half Marathon", date: "2027-03-14", city: "Reno, NV", division: "Open", goal: "Sub 1:24", campaign: false, spots: [] }
    ]
  },
  {
    id: "maya-thompson",
    name: "Maya Thompson",
    headline: "HYROX Pro | Former D1 Soccer | Strength & Conditioning Coach",
    location: "Las Vegas, NV",
    founding: true,
    memberSince: "October 2026",
    disciplines: [
      { sport: "HYROX", events: "Pro, Doubles" },
      { sport: "Running", events: "10K, Half marathon" }
    ],
    instagram: "maya.moves.heavy",
    bio: "Former D1 athlete who never stopped competing. I race HYROX Pro and I'm chasing a Worlds qualifier in 2027. I train 12 sessions a week while running my own coaching business. Your sponsorship goes straight into race travel — and your brand goes on my kit, my content and my podium photos.",
    stats: [ { v: "1:02", l: "HYROX Pro PR" }, { v: "38:40", l: "10K PR" }, { v: "Top 10", l: "Last 3 races" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "hyrox-phx",
        name: "HYROX Phoenix",
        date: "2026-11-14",
        city: "Phoenix, AZ",
        division: "Women's Pro",
        goal: "Sub 60 minutes",
        campaign: true,
        spots: [
          { type: "entry",   price: 245, sponsoredBy: null },
          { type: "hotel",   price: 420, sponsoredBy: null },
          { type: "flights", price: 280, sponsoredBy: "biggest-little-coffee" },
          { type: "tattoo",  price: 75,  sponsoredBy: null },
          { type: "singlet", price: 200, sponsoredBy: null }
        ]
      }
    ]
  },
  {
    id: "devon-carter",
    name: "Devon Carter",
    headline: "Ultra Runner | Tahoe Local | Firefighter",
    location: "South Lake Tahoe, CA",
    founding: true,
    memberSince: "October 2026",
    disciplines: [
      { sport: "Trail", events: "50K, 50 mile, 100K" }
    ],
    instagram: "devon.goes.long",
    bio: "Firefighter by day, mountain runner by every other hour. I'm building toward my first 100-miler in 2027. Long races mean long weekends of travel and gear — a sponsor helps me show up ready. I post every training block, every race and every finish line.",
    stats: [ { v: "9:41", l: "50 mile PR" }, { v: "4", l: "Ultras finished" }, { v: "2,400 mi", l: "Run in 2026" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "desert-100k",
        name: "Desert Ridge 100K",
        date: "2027-01-24",
        city: "Moab, UT",
        division: "Men's Open",
        goal: "Top 15 finish",
        campaign: true,
        spots: [
          { type: "entry", price: 310, sponsoredBy: null },
          { type: "shoes", price: 180, sponsoredBy: null },
          { type: "hotel", price: 260, sponsoredBy: "truckee-torque" },
          { type: "shout", price: 50,  sponsoredBy: null }
        ]
      }
    ]
  },
  {
    id: "ari-nakamura",
    name: "Ari Nakamura",
    headline: "Track & Road | 5K–Half | College Runner",
    location: "Sacramento, CA",
    founding: false,
    memberSince: "October 2026",
    disciplines: [
      { sport: "Running", events: "5K, 10K, Half marathon" }
    ],
    instagram: "ari.splits",
    bio: "Junior at state, racing road events between track seasons. I want to break 15 minutes for 5K before I graduate. Sponsorship covers entry fees and travel to the fast courses — I'll rep your brand at every start line.",
    stats: [ { v: "15:22", l: "5K PR" }, { v: "31:40", l: "10K PR" }, { v: "3", l: "Wins in 2026" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "turkey-trot",
        name: "Thanksgiving Day 10K",
        date: "2026-11-26",
        city: "San Francisco, CA",
        division: "Open",
        goal: "Sub 31:00",
        campaign: true,
        spots: [
          { type: "entry",   price: 75,  sponsoredBy: null },
          { type: "singlet", price: 100, sponsoredBy: null },
          { type: "shout",   price: 40,  sponsoredBy: null }
        ]
      }
    ]
  },
  {
    id: "sam-okafor",
    name: "Sam Okafor",
    headline: "HYROX Doubles | Gym Owner | Masters Athlete",
    location: "Boise, ID",
    founding: false,
    memberSince: "October 2026",
    disciplines: [
      { sport: "HYROX", events: "Open, Doubles" },
      { sport: "Running", events: "Half marathon" }
    ],
    instagram: "coach.sam.o",
    bio: "42 years old and racing faster than I did at 30. I own a small gym and race HYROX Doubles with my members. I'm proof that it's never too late. Back me and you'll be on our gym wall, our race kit and our feed.",
    stats: [ { v: "1:08", l: "Doubles PR" }, { v: "1:34", l: "Half PR" }, { v: "40+", l: "Age group" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "hyrox-denver",
        name: "HYROX Denver",
        date: "2027-02-20",
        city: "Denver, CO",
        division: "Men's Doubles",
        goal: "Podium in age group",
        campaign: true,
        spots: [
          { type: "entry",   price: 290, sponsoredBy: null },
          { type: "hotel",   price: 340, sponsoredBy: null },
          { type: "singlet", price: 175, sponsoredBy: null }
        ]
      }
    ]
  },
  {
    id: "lena-brooks",
    name: "Lena Brooks",
    headline: "Triathlete | Ironman 70.3 | Nurse",
    location: "Reno, NV",
    founding: false,
    memberSince: "October 2026",
    disciplines: [
      { sport: "Triathlon", events: "Sprint, Olympic, 70.3" },
      { sport: "Running", events: "Half marathon" }
    ],
    instagram: "lena.tri.life",
    bio: "ER nurse and long-course triathlete. Twelve-hour shifts, early swims, late rides. I'm racing my second 70.3 this spring and aiming to qualify for the championship. Every sponsor gets real content from real training.",
    stats: [ { v: "5:21", l: "70.3 PR" }, { v: "2:31", l: "Olympic PR" }, { v: "6", l: "Tris in 2026" } ],
    accent: "#FF5A0A",
    races: [
      {
        id: "desert-703",
        name: "Desert Valley 70.3",
        date: "2027-03-28",
        city: "Palm Springs, CA",
        division: "Women 30–34",
        goal: "Championship slot",
        campaign: true,
        spots: [
          { type: "entry",   price: 375, sponsoredBy: null },
          { type: "hotel",   price: 300, sponsoredBy: null },
          { type: "tattoo",  price: 60,  sponsoredBy: null },
          { type: "fuel",    price: 80,  sponsoredBy: null }
        ]
      }
    ]
  }
];

/* Sponsor wall — every business or person who has backed an athlete.
   logo: path to an image in assets/img/sponsors/ (optional — initials are used if empty) */
window.MA_SPONSORS = [
  {
    id: "sierra-physio",
    name: "Sierra Peak Physio",
    city: "Reno, NV",
    since: "Oct 2026",
    logo: "",
    color: "#1F6FEB",
    website: "",
    instagram: "",
    sponsored: [ { athlete: "jordan-reyes", race: "Sacramento Marathon" } ]
  },
  {
    id: "biggest-little-coffee",
    name: "Biggest Little Coffee",
    city: "Reno, NV",
    since: "Oct 2026",
    logo: "",
    color: "#8B5A2B",
    website: "",
    instagram: "",
    sponsored: [ { athlete: "maya-thompson", race: "HYROX Phoenix" } ]
  },
  {
    id: "truckee-torque",
    name: "Truckee Torque Fitness",
    city: "Truckee, CA",
    since: "Oct 2026",
    logo: "",
    color: "#16A34A",
    website: "",
    instagram: "",
    sponsored: [ { athlete: "devon-carter", race: "Desert Ridge 100K" } ]
  },
  {
    id: "high-desert-dental",
    name: "High Desert Dental",
    city: "Sparks, NV",
    since: "Oct 2026",
    logo: "",
    color: "#7C3AED",
    website: "",
    instagram: "",
    sponsored: [ { athlete: "lena-brooks", race: "Spring training block" } ]
  },
  {
    id: "washoe-auto",
    name: "Washoe Auto Detail",
    city: "Reno, NV",
    since: "Oct 2026",
    logo: "",
    color: "#DC2626",
    website: "",
    instagram: "",
    sponsored: [ { athlete: "ari-nakamura", race: "Cross-country season" } ]
  }
];
