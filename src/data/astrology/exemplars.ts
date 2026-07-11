import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Zodiac exemplars. Sun-sign attribution is the loosest kind of typing on
// this site: for historical figures it rests on a verifiable fact of the
// calendar — a birthdate inside the sign's tropical range — which proves
// nothing clinical about character; for fictional figures it is a
// community reading, full stop. The notes below read each figure *through*
// the sign's character structure. That is an interpretive exercise, and it
// is offered as one.

const COMMUNITY = "widely typed in astrological community sources";
const BIRTH = "birthdate within the sign's tropical range";

export const ASTROLOGY_EXEMPLARS: Record<string, ExemplarSet> = {
  aries: {
    cultural: [
      { name: "Achilles", medium: "Literature (Homer, Iliad)", note: "Cardinal fire's founding text — the rage announced in the poem's first line, the charge that cannot idle, the short blazing life chosen over the long dim one.", source: COMMUNITY },
      { name: "Éowyn", medium: "Literature / Film (Tolkien)", note: "'I am no man' — the Aries claim spoken at the exact moment of the charge; valor as identity, the cage as the one unbearable thing.", source: COMMUNITY },
      { name: "Rocky Balboa", medium: "Film", note: "The Ram in a Philadelphia gym — proof of self sought head-first, round after round; not the win but the standing back up.", source: COMMUNITY },
      { name: "Mulan", medium: "Film / Legend", note: "Initiation by direct action — the first move made before permission could be refused.", source: COMMUNITY },
      { name: "Hotspur", medium: "Literature (Shakespeare, Henry IV)", note: "The Aries shadow — honor as combustion; magnificent, quick, and dead of impatience.", source: COMMUNITY },
    ],
    historical: [
      { name: "Vincent van Gogh", note: "Born March 30 — paint applied like a charge; urgency as method, whole canvases finished in a day, the fire that consumed its own instrument.", source: BIRTH },
      { name: "Thomas Jefferson", note: "Born April 13 — the declaration as genre; the Aries instinct to begin a world rather than inherit one.", source: BIRTH },
      { name: "Maya Angelou", note: "Born April 4 — first-person courage as a body of work; the self declared, against instruction, and made a public architecture.", source: BIRTH },
      { name: "Harry Houdini", note: "Born March 24 — escape as vocation; the Aries refusal of every box, staged nightly and head-first.", source: BIRTH },
    ],
  },

  taurus: {
    cultural: [
      { name: "Ferdinand the Bull", medium: "Literature (Leaf)", note: "The sign's whole argument in a picture book — the bull who will not be provoked, content beneath the cork tree; force at rest is still force.", source: COMMUNITY },
      { name: "Bilbo Baggins", medium: "Literature (Tolkien)", note: "Comfort as cosmology — pantry, garden, armchair; and the Taurean truth that when such a creature finally moves, it holds.", source: COMMUNITY },
      { name: "Ron Swanson", medium: "Television (Parks & Rec)", note: "Fixed earth as civic comedy — breakfast food, woodworking, and a stillness no institution can hurry.", source: COMMUNITY },
      { name: "Tom Bombadil", medium: "Literature (Tolkien)", note: "Master of his own ground and nothing more — possession so complete it no longer grips; the Ring itself finds no purchase.", source: COMMUNITY },
      { name: "Gollum", medium: "Literature (Tolkien)", note: "The Taurus shadow — keeping curdled into being kept; 'my precious' as the sign's cautionary grammar.", source: COMMUNITY },
    ],
    historical: [
      { name: "William Shakespeare", note: "Traditionally born April 23 — the most sensuous ear in English verse, and, characteristically, a shrewd buyer of Stratford property.", source: BIRTH },
      { name: "Audrey Hepburn", note: "Born May 4 — Venusian earth in person; beauty worn as ease, and a late career quietly given over to feeding children.", source: BIRTH },
      { name: "Karl Marx", note: "Born May 5 — a philosophy with Taurus at its root; value, labor, matter, and history read through who holds what.", source: BIRTH },
      { name: "Florence Nightingale", note: "Born May 12 — reform as maintenance; sanitation, routine, the saved life as a made thing. Earth's patience applied to war's chaos.", source: BIRTH },
    ],
  },

  gemini: {
    cultural: [
      { name: "Puck", medium: "Literature (Shakespeare)", note: "Mercury in stage form — messenger, mimic, and mixer of pairs; the plot itself is his wordplay.", source: COMMUNITY },
      { name: "Scheherazade", medium: "Literature (One Thousand and One Nights)", note: "Talk as survival — the Gemini wager that the next sentence can postpone death itself.", source: COMMUNITY },
      { name: "Tyrion Lannister", medium: "Literature / Television (Martin)", note: "'I drink and I know things' — the tongue as both sword and shield; the twin-self watching every room he charms.", source: COMMUNITY },
      { name: "Ferris Bueller", medium: "Film", note: "Mutable air playing hooky — improvisation as philosophy, the fourth wall just another door.", source: COMMUNITY },
      { name: "Loki", medium: "Myth / Film", note: "The Gemini shadow — doubleness as vocation; the shape-shifter whose cleverness always has one exit too many.", source: COMMUNITY },
    ],
    historical: [
      { name: "Walt Whitman", note: "Born May 31 — 'I contain multitudes,' the sign's thesis stated as American scripture; a poetry of catalogues, versions, and endless revision.", source: BIRTH },
      { name: "Bob Dylan", note: "Born May 24 — serial self-translation; folk prophet, electric traitor, crooner, laureate — the twin always one identity ahead of the audience.", source: BIRTH },
      { name: "Blaise Pascal", note: "Born June 19 — geometer and mystic in one binding; the Pensées read as a mind arguing with its twin.", source: BIRTH },
      { name: "Anne Frank", note: "Born June 12 — the diary addressed to an invented 'Kitty'; Gemini's need for an interlocutor so absolute it conjured one in hiding.", source: BIRTH },
    ],
  },

  cancer: {
    cultural: [
      { name: "Mrs. Ramsay", medium: "Literature (Woolf, To the Lighthouse)", note: "The mother as gravitational center — a dinner party held together by sheer attunement, and remembered for a hundred pages after her death.", source: COMMUNITY },
      { name: "Marmee March", medium: "Literature (Alcott)", note: "Nurture as moral instruction — the hearth that raises four different weathers under one roof.", source: COMMUNITY },
      { name: "Moominmamma", medium: "Literature (Jansson)", note: "The handbag that contains the household — unflappable, tidal, hospitable to every stray who washes ashore.", source: COMMUNITY },
      { name: "Marlin", medium: "Film (Finding Nemo)", note: "Cardinal water's protective claw — the parent who crosses an ocean because the shell failed once.", source: COMMUNITY },
      { name: "Miss Havisham", medium: "Literature (Dickens)", note: "The Cancer shadow — memory as mausoleum; the clock stopped at the wound, the wedding cake kept until it keeps her.", source: COMMUNITY },
    ],
    historical: [
      { name: "Marcel Proust", note: "Born July 10 — the tidal memory made method; a cork-lined room, a dissolved madeleine, and the past recovered entire.", source: BIRTH },
      { name: "Rembrandt van Rijn", note: "Born July 15 — interior light as life's work; faces painted from the inside out, tenderness surviving bankruptcy and grief.", source: BIRTH },
      { name: "Helen Keller", note: "Born June 27 — feeling as first and native language; the world reached through the hand, and held.", source: BIRTH },
      { name: "Ernest Hemingway", note: "Born July 21 — the crab in armor; hard shell, laconic surface, and the wounded feeling running under every declarative sentence.", source: BIRTH },
    ],
  },

  leo: {
    cultural: [
      { name: "Mufasa", medium: "Film (The Lion King)", note: "The sun-king whose radiance orders a whole ecology — and whose absence unlights it.", source: COMMUNITY },
      { name: "Tony Stark", medium: "Film (Marvel)", note: "'I am Iron Man' — the press conference as coronation; the self as spectacle, sincerely meant.", source: COMMUNITY },
      { name: "Elle Woods", medium: "Film (Legally Blonde)", note: "Warmth as jurisprudence — the shine that refuses to dim for other people's comfort, and lifts the room instead.", source: COMMUNITY },
      { name: "King Lear", medium: "Literature (Shakespeare)", note: "The Leo shadow — sovereignty demanding love as tribute; the kingdom divided by the size of the performance.", source: COMMUNITY },
    ],
    historical: [
      { name: "Napoleon Bonaparte", note: "Born August 15 — took the crown from the Pope's hands and set it on his own head; the Leo gesture performed at imperial scale.", source: BIRTH },
      { name: "James Baldwin", note: "Born August 2 — radiant witness; a prose that refuses shame, dignity projected outward until the room must reorganize around it.", source: BIRTH },
      { name: "Coco Chanel", note: "Born August 19 — the self as house style; a persona authored, monogrammed, and worn in public for six decades.", source: BIRTH },
      { name: "Louis Armstrong", note: "Born August 4 — warmth as spectacle; generosity of shine, the grin and the horn lifting every band that held him.", source: BIRTH },
    ],
  },

  virgo: {
    cultural: [
      { name: "Amélie Poulain", medium: "Film (Amélie)", note: "Small perfections deployed as secret service — the Virgo love-language of the fixed hinge and the returned tin box.", source: COMMUNITY },
      { name: "Monica Geller", medium: "Television (Friends)", note: "The audit as affection — eleven categories of towel; care expressed in exactness.", source: COMMUNITY },
      { name: "Lisa Simpson", medium: "Television (The Simpsons)", note: "Conscience and correction in an eight-year-old — Virgo's burden of seeing the flaw no one else will admit is there.", source: COMMUNITY },
      { name: "Mr. Stevens", medium: "Literature (Ishiguro, The Remains of the Day)", note: "The Virgo shadow — service perfected into self-erasure; a life polished until nothing of the man remains on it.", source: COMMUNITY },
    ],
    historical: [
      { name: "Elizabeth I", note: "Born September 7 — the Virgin Queen; a persona built knowingly on the sign's own emblem, with caution, craft, and discrimination as statecraft.", source: BIRTH },
      { name: "Maria Montessori", note: "Born August 31 — method as devotion; the child observed with scientific exactness and served with monastic patience.", source: BIRTH },
      { name: "Leo Tolstoy", note: "Born September 9 — the self-audit kept in diaries for sixty years; moral perfectionism as both engine and torment of the work.", source: BIRTH },
      { name: "Johann Wolfgang von Goethe", note: "Born August 28 — the exact eye; optics, botany, and morphology alongside the poetry, precision and beauty refusing to be separated.", source: BIRTH },
    ],
  },

  libra: {
    cultural: [
      { name: "Elizabeth Bennet", medium: "Literature (Austen)", note: "Judgment as a fine instrument recalibrated in public — the marriage plot as an essay on weighing correctly.", source: COMMUNITY },
      { name: "Jean-Luc Picard", medium: "Television (Star Trek)", note: "The diplomat's captaincy — force always the last argument; the bridge as a chamber of proportion.", source: COMMUNITY },
      { name: "Emma Woodhouse", medium: "Literature (Austen)", note: "Harmony pursued as matchmaking — the Libra art practiced just badly enough to expose its vanity, then redeemed.", source: COMMUNITY },
      { name: "Dorian Gray", medium: "Literature (Wilde)", note: "The Libra shadow — beauty severed from justice; the portrait holds the verdict the face defers.", source: COMMUNITY },
    ],
    historical: [
      { name: "Oscar Wilde", note: "Born October 16 — aesthetics argued as ethics; the epigram as a set of scales, weighing society and finding it wanting beautifully.", source: BIRTH },
      { name: "Eleanor Roosevelt", note: "Born October 11 — chaired the drafting of the Universal Declaration of Human Rights; Libra's instinct for fairness scaled to the species.", source: BIRTH },
      { name: "John Lennon", note: "Born October 9 — 'Imagine' as cardinal-air anthem; harmony proposed as politics, with all the sign's idealism and its evasions.", source: BIRTH },
      { name: "Mahatma Gandhi", note: "Born October 2 — satyagraha as the scales in motion; the opponent treated as the other pan, never as the enemy.", source: BIRTH },
    ],
  },

  scorpio: {
    cultural: [
      { name: "Severus Snape", medium: "Literature (Rowling)", note: "Fixed water's double agent — loyalty sealed unto death, grief converted to sting, the truth withheld until the last vial.", source: COMMUNITY },
      { name: "Lisbeth Salander", medium: "Literature (Larsson)", note: "Penetration of hidden systems as survival craft — the wound made into an investigative method.", source: COMMUNITY },
      { name: "Bruce Wayne / Batman", medium: "Film / Comics", note: "Death-and-rebirth as origin story — the nocturnal self built deliberately from the worst night.", source: COMMUNITY },
      { name: "Captain Ahab", medium: "Literature (Melville)", note: "The Scorpio shadow at sea — desire fixed on the depth that maimed him, pursued past reason, crew, and self.", source: COMMUNITY },
    ],
    historical: [
      { name: "Fyodor Dostoevsky", note: "Born November 11 — the underground as native habitat; every novel a descent that insists resurrection is only reached through the bottom.", source: BIRTH },
      { name: "Marie Curie", note: "Born November 7 — penetrated the invisible and paid in her own body; radioactivity as the Scorpio bargain made literal.", source: BIRTH },
      { name: "Sylvia Plath", note: "Born October 27 — 'Out of the ash / I rise'; death-and-rebirth as poetic method, intensity refusing every dilution.", source: BIRTH },
      { name: "Martin Luther", note: "Born November 10 — here-I-stand totality; the fixed will that split a continent rather than soften a conviction.", source: BIRTH },
    ],
  },

  sagittarius: {
    cultural: [
      { name: "Don Quixote", medium: "Literature (Cervantes)", note: "The meaning-quest overriding every fact in its path — Sagittarius' glory and its shadow carried by one knight.", source: COMMUNITY },
      { name: "Indiana Jones", medium: "Film", note: "The professor who cannot stay in the library — knowledge only real once it has been ridden, dug up, and barely survived.", source: COMMUNITY },
      { name: "Zorba", medium: "Literature (Kazantzakis)", note: "Appetite and philosophy in one body — the full catastrophe embraced dancing.", source: COMMUNITY },
      { name: "Ms. Frizzle", medium: "Television (The Magic School Bus)", note: "'Take chances, make mistakes, get messy' — mutable fire as pedagogy.", source: COMMUNITY },
    ],
    historical: [
      { name: "Mark Twain", note: "Born November 30 — the horizon as employer; river pilot, prospector, world lecturer, truth told grinning and at scale.", source: BIRTH },
      { name: "William Blake", note: "Born November 28 — vision refusing every fence; the fiery arrow aimed past church, empire, and eyesight itself.", source: BIRTH },
      { name: "Baruch Spinoza", note: "Born November 24 — excommunicated into freedom; the lens-grinder whose God was the whole horizon.", source: BIRTH },
      { name: "Winston Churchill", note: "Born November 30 — rhetoric as trajectory; the large view held loudly through the worst weather, the sign's excesses included.", source: BIRTH },
    ],
  },

  capricorn: {
    cultural: [
      { name: "Ned Stark", medium: "Literature / Television (Martin)", note: "Duty as bedrock — the North held by sheer structural integrity, and the cost of honor accounted in full.", source: COMMUNITY },
      { name: "Peggy Olson", medium: "Television (Mad Men)", note: "The climb from secretary to the corner office — the long apprenticeship served, floor by floor, in real time.", source: COMMUNITY },
      { name: "Okonkwo", medium: "Literature (Achebe, Things Fall Apart)", note: "Status built against the father's failure — Capricorn's engine, and its terror of weakness, in one man.", source: COMMUNITY },
      { name: "Ebenezer Scrooge", medium: "Literature (Dickens)", note: "The Capricorn shadow and its late redemption — the ledger as a life, until Saturn's own ghosts renegotiate the terms.", source: COMMUNITY },
    ],
    historical: [
      { name: "Simone de Beauvoir", note: "Born January 9 — the long project as life-form; discipline, structure, and a fifty-year argument built stone by stone.", source: BIRTH },
      { name: "Louis Pasteur", note: "Born December 27 — patience as method; 'chance favors the prepared mind' is a Capricorn sentence.", source: BIRTH },
      { name: "Muhammad Ali", note: "Born January 17 — the self-made summit; mastery constructed publicly, defended stubbornly, and paid for in the body.", source: BIRTH },
      { name: "Michelle Obama", note: "Born January 17 — the disciplined ascent carried with visible structure; 'when they go low' as a Saturnian rule of conduct.", source: BIRTH },
    ],
  },

  aquarius: {
    cultural: [
      { name: "Prometheus", medium: "Myth", note: "The archetype itself, per Tarnas — fire stolen for the whole species, and the price of loving humanity in the abstract paid in the particular liver.", source: COMMUNITY },
      { name: "Mr. Spock", medium: "Television (Star Trek)", note: "Feeling routed through principle — the needs of the many, computed, and then, at the crux, personally paid.", source: COMMUNITY },
      { name: "Katniss Everdeen", medium: "Literature / Film (Collins)", note: "The reluctant mockingjay — one refusal becoming a system's unraveling; the rebel who never wanted the symbol.", source: COMMUNITY },
      { name: "Ozymandias", medium: "Comics (Watchmen)", note: "The Aquarius shadow — utopia by spreadsheet; millions abstracted for the sake of mankind.", source: COMMUNITY },
    ],
    historical: [
      { name: "Charles Darwin", note: "Born February 12 — saw the system beneath the species; the given order revealed as one long revision.", source: BIRTH },
      { name: "Thomas Paine", note: "Born January 29 (O.S.) — Common Sense as electrical discharge; the pamphlet that treated an old order as a design flaw.", source: BIRTH },
      { name: "Rosa Parks", note: "Born February 4 — one principled refusal, held with fixed-air stillness, redesigning a system from a bus seat.", source: BIRTH },
      { name: "Frederick Douglass", note: "Born February 1818, the exact day stolen by slavery — he chose February 14 for himself; the Aquarian act of self-authorship performed on the calendar itself.", source: BIRTH },
    ],
  },

  pisces: {
    cultural: [
      { name: "The Little Prince", medium: "Literature (Saint-Exupéry)", note: "'What is essential is invisible to the eye' — the Pisces epistemology, delivered from another planet.", source: COMMUNITY },
      { name: "Alice", medium: "Literature (Carroll)", note: "A native of dream-logic — the boundary between worlds crossed as casually as a rabbit hole.", source: COMMUNITY },
      { name: "Ariel", medium: "Film (The Little Mermaid)", note: "Longing across the boundary of worlds — the fish half in love with the shore; Pisces' trade of voice for passage.", source: COMMUNITY },
      { name: "Blanche DuBois", medium: "Literature (Williams)", note: "The Pisces shadow — illusion as shelter; magic preferred to realism until the kindness of strangers runs out.", source: COMMUNITY },
    ],
    historical: [
      { name: "Michelangelo", note: "Born March 6 — the image seen whole inside the stone before the first blow; imagination as the primary residence.", source: BIRTH },
      { name: "Frédéric Chopin", note: "Born March 1 — music as dissolved boundary; the nocturne as the sign's native form.", source: BIRTH },
      { name: "Albert Einstein", note: "Born March 14 — 'imagination is more important than knowledge'; physics done first as dream, riding a beam of light.", source: BIRTH },
      { name: "Gabriel García Márquez", note: "Born March 6 — magical realism as Piscean method; the miracle reported in the same calm sentence as the weather.", source: BIRTH },
    ],
  },
};

export function getAstrologyExemplars(slug: string): ExemplarSet | undefined {
  return ASTROLOGY_EXEMPLARS[slug];
}
