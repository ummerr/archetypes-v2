import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Tarot Major Arcana exemplars. Anchored where possible to Rachel Pollack,
// Seventy-Eight Degrees of Wisdom (1980) and Sallie Nichols, Jung and Tarot
// (1980), with occasional reference to A. E. Waite's Pictorial Key (1910).
// Cultural figures who embody the arcanum's central gesture are chosen to
// illustrate, not to exhaust, the card's meaning. Attributions are
// interpretive.

const POLLACK = "Pollack 1980";
const NICHOLS = "Nichols 1980";
const WAITE = "Waite 1910";
const INTERP = "interpretive attribution";

export const TAROT_EXEMPLARS: Record<string, ExemplarSet> = {
  "the-fool": {
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "Stepping off every cliff without calculation — the Fool's faith as locomotion through American history.", source: INTERP },
      { name: "Amélie Poulain", medium: "Film", note: "The open-hearted beginner, unguarded against the Paris the rest of the city has stopped seeing.", source: INTERP },
      { name: "Don Quixote", medium: "Literature (Cervantes)", note: "The holy idiot whose delusion is braver than our sanity — Nichols reads the Fool as sacred divergence from consensus reality.", source: NICHOLS },
      { name: "Parzival", medium: "Myth / Literature", note: "The unworldly knight — innocence as the precondition of the Grail. Pollack's canonical Fool reading.", source: POLLACK },
      { name: "Chance the Gardener", medium: "Film (Being There)", note: "The Fool in Jerzy Kosinski register — pure simplicity mistaken by power for sage counsel.", source: INTERP },
    ],
    historical: [
      { name: "St. Francis of Assisi", note: "Walked off the inheritance, barefoot, into a life without plan — the Fool as founding Christian mystic.", source: POLLACK },
      { name: "Buster Keaton", note: "'The great stone face' moving obliviously through catastrophe — the Fool as silent-film physical comedy.", source: INTERP },
      { name: "Emily Dickinson", note: "Stepped off the social cliff into a private interior whose riches the town could not measure.", source: INTERP },
      { name: "Diogenes of Sinope", note: "The Cynic philosopher who lived in a jar and carried a lamp looking for an honest man — the Fool as philosophical stance.", source: NICHOLS },
    ],
  },

  "the-magician": {
    cultural: [
      { name: "Prospero", medium: "Literature (Shakespeare)", note: "The sovereign-magician on the island — will directed at the four elements, then finally renounced.", source: POLLACK },
      { name: "Doctor Strange", medium: "Film / Comics", note: "The scholar who learns the mechanics of the invisible and bends them — the Magician's modern superhero register.", source: INTERP },
      { name: "Jay Gatsby", medium: "Literature (Fitzgerald)", note: "Conjured a self out of will and attention — the Magician's shadow side, the American edition.", source: INTERP },
      { name: "Mary Poppins", medium: "Film", note: "A carpet bag of tools — every situation answered with the right implement, the Magician as domestic competence.", source: INTERP },
      { name: "Willy Wonka", medium: "Literature / Film", note: "Transformation as factory output — the Magician operating at scale and with moral risk.", source: INTERP },
    ],
    historical: [
      { name: "Nikola Tesla", note: "Pulled invisible forces into visible form; electricity as ritual as much as engineering.", source: INTERP },
      { name: "Orson Welles", note: "Stage magician by training, filmmaker by extension — Welles himself understood the two as the same art.", source: INTERP },
      { name: "Steve Jobs", note: "'Reality-distortion field' as magical technique — the Magician's concentrated will in Silicon Valley register.", source: INTERP },
      { name: "John Dee", note: "Elizabeth I's court magus — mathematician, astrologer, angel-summoner. The Magician in early-modern form.", source: NICHOLS },
    ],
  },

  "the-high-priestess": {
    cultural: [
      { name: "Galadriel", medium: "Literature / Film (Tolkien)", note: "The mirror-keeper; knowing that precedes and exceeds words.", source: INTERP },
      { name: "Clarice Starling", medium: "Film (Silence of the Lambs)", note: "Listening past language to the thing the evidence cannot quite say — Priestess as investigator.", source: INTERP },
      { name: "Sibyl of Cumae", medium: "Myth (Virgil)", note: "Oracular knowing delivered in fragments no one wants to hear.", source: POLLACK },
      { name: "Sethe", medium: "Literature (Morrison, Beloved)", note: "The woman whose interior carries a haunting the community can barely speak to — the Priestess's veiled knowledge made history.", source: INTERP },
      { name: "Storm (X-Men)", medium: "Film / Comics", note: "Oracular weather-knowing carried with priestly composure — the High Priestess as superhero register.", source: INTERP },
    ],
    historical: [
      { name: "Hildegard of Bingen", note: "Visions transcribed intact — the veil parting on schedule for forty years, across theology, music, and medicine.", source: POLLACK },
      { name: "Marie-Louise von Franz", note: "Jungian scholar who read symbols the way others read sentences — the Priestess as analytical method.", source: INTERP },
      { name: "Anna Akhmatova", note: "Silent witness to the Stalinist century — Priestess knowing held under pressure and released only in the poems.", source: INTERP },
      { name: "Pythia at Delphi", note: "The priestess on the tripod whose oracular utterance set the direction of the Greek world for centuries.", source: NICHOLS },
    ],
  },

  "the-empress": {
    cultural: [
      { name: "Demeter", medium: "Myth", note: "Grain, grief, return — the generative mother who makes the seasons move.", source: POLLACK },
      { name: "Molly Weasley", medium: "Literature (Rowling)", note: "The bottomless kitchen — abundance as moral stance.", source: INTERP },
      { name: "Mrs. Ramsay", medium: "Literature (Woolf, To the Lighthouse)", note: "The still center around which the household organizes itself — Empress as fictional consciousness.", source: INTERP },
      { name: "Gusteau", medium: "Film (Ratatouille)", note: "'Anyone can cook' — nourishment offered as creative democracy.", source: INTERP },
      { name: "Aphrodite", medium: "Myth", note: "Generative beauty as cosmological force — Pollack reads the Empress as the Venus-function of the deck.", source: POLLACK },
    ],
    historical: [
      { name: "Alice Waters", note: "Turned the table itself into a cultural institution — the Empress as restaurateur-as-philosopher.", source: INTERP },
      { name: "Frida Kahlo", note: "Pain, fertility, flora — the body rendered as a garden and as self-portrait at once.", source: INTERP },
      { name: "Julia Child", note: "Abundance with a laugh; the domestic elevated into television heroism.", source: INTERP },
      { name: "Beatrix Potter", note: "Nature-study, landscape conservation, and the domestic picture-book — the Empress in tweed.", source: INTERP },
    ],
  },

  "the-emperor": {
    cultural: [
      { name: "Aragorn", medium: "Literature / Film (Tolkien)", note: "The king who finally sits, upholding law against chaos.", source: INTERP },
      { name: "Marcus Aurelius (Gladiator)", medium: "Film", note: "Authority as burden; the philosopher on the throne.", source: INTERP },
      { name: "Stannis Baratheon", medium: "Literature / TV", note: "Law without warmth — the Emperor's austerity taken to its edge.", source: INTERP },
      { name: "Don Vito Corleone", medium: "Film (The Godfather)", note: "Patriarchal order, code, and consequence — benign and terrible in alternation.", source: INTERP },
      { name: "T'Chaka / T'Challa", medium: "Film (Black Panther)", note: "The throne-lineage and its burdens made explicit — Emperor as ancestral office.", source: INTERP },
    ],
    historical: [
      { name: "Marcus Aurelius", note: "Meditations: the sovereign disciplining himself into fitness to rule. Pollack's classical Emperor reference.", source: POLLACK },
      { name: "George Washington", note: "Refused the crown; founded by stepping away from power — the Emperor as inaugural American paradox.", source: INTERP },
      { name: "Lee Kuan Yew", note: "Order imposed with relentless clarity — the modern technocratic Emperor at work in Singapore.", source: INTERP },
      { name: "Charlemagne", note: "The medieval European Emperor as historical template — coronation as founding gesture of a whole political imagination.", source: NICHOLS },
    ],
  },

  "the-hierophant": {
    cultural: [
      { name: "Albus Dumbledore", medium: "Literature (Rowling)", note: "The transmitter of the tradition; keeper of the school's rites.", source: INTERP },
      { name: "Father Zosima", medium: "Literature (Dostoevsky, The Brothers Karamazov)", note: "The Orthodox elder — spiritual inheritance personified.", source: POLLACK },
      { name: "Obi-Wan Kenobi", medium: "Film", note: "The keeper of an order; passes the lineage to the next hand.", source: INTERP },
      { name: "Mr. Miyagi", medium: "Film (The Karate Kid)", note: "Tradition taught slowly, through ritual, to the student who will carry it.", source: INTERP },
      { name: "Dumbledore's Pensieve", medium: "Literature (Rowling)", note: "The Hierophant's function literalized — memory as transmitted lineage.", source: INTERP },
    ],
    historical: [
      { name: "Thich Nhat Hanh", note: "Transmitted a living Zen lineage across cultures with patience — the Hierophant as refugee monk.", source: INTERP },
      { name: "Rabbi Abraham Joshua Heschel", note: "Theologian who walked with Dr. King — the tradition in action at Selma.", source: INTERP },
      { name: "Pope John XXIII", note: "Opened the windows of the Church (Vatican II) without breaking the vessel.", source: INTERP },
      { name: "Confucius", note: "The Master whose transmission of ritual decorum became the founding Hierophant of East Asian civilization.", source: POLLACK },
    ],
  },

  "the-lovers": {
    cultural: [
      { name: "Elizabeth Bennet & Darcy", medium: "Literature (Austen)", note: "Recognition across difference — love as a choice clarified by argument.", source: INTERP },
      { name: "Jim & Pam", medium: "Television (The Office)", note: "Office-romance patience — the slow, chosen yes.", source: INTERP },
      { name: "Céline & Jesse", medium: "Film (Before trilogy)", note: "The conscious conversation at the heart of choosing — Linklater's Lovers rendered as dialogue.", source: INTERP },
      { name: "Orpheus & Eurydice", medium: "Myth", note: "The chosen bond tested against the underworld — Pollack reads this as the Lovers' shadow form.", source: POLLACK },
      { name: "Adam & Eve", medium: "Myth", note: "The Waite-Smith card's surface iconography — the Lovers as the moment of choice that founds history.", source: WAITE },
    ],
    historical: [
      { name: "Abigail & John Adams", note: "Correspondence as marriage; intellect and affection braided across years of separation.", source: INTERP },
      { name: "Georgia O'Keeffe & Alfred Stieglitz", note: "Artist-lovers who made each other's work possible — and harder.", source: INTERP },
      { name: "Pierre & Marie Curie", note: "Partnership under the radium lamp — work and union indistinguishable.", source: INTERP },
      { name: "Frida Kahlo & Diego Rivera", note: "The Lovers pushed to their most turbulent public instantiation — two bodies of work inseparable from the marriage.", source: INTERP },
    ],
  },

  "the-chariot": {
    cultural: [
      { name: "Maximus", medium: "Film (Gladiator)", note: "Will harnessed to purpose; two opposing forces reined to one line.", source: INTERP },
      { name: "Imperator Furiosa", medium: "Film (Mad Max: Fury Road)", note: "The driver who carries the whole cargo toward a distant green.", source: INTERP },
      { name: "Captain Ahab", medium: "Literature (Melville)", note: "Monomania as drive — the Chariot steered by obsession past all counsel.", source: POLLACK },
      { name: "Miyamoto Musashi", medium: "Literature / Myth", note: "The duelist whose whole being moves along a single vector — the Chariot as Japanese martial discipline.", source: INTERP },
      { name: "Katniss Everdeen (chariot scene)", medium: "Film (The Hunger Games)", note: "The Chariot card literalized in costume — girl on fire driven into the arena.", source: INTERP },
    ],
    historical: [
      { name: "Alexander the Great", note: "A column of will that crossed continents before it stopped — the Chariot at world-historical scale.", source: INTERP },
      { name: "Ernest Shackleton", note: "Kept the boat pointed; brought every man home — the Chariot as polar leadership.", source: INTERP },
      { name: "Serena Williams", note: "Twenty years of direction at maximum intensity — the Chariot as career arc.", source: INTERP },
      { name: "Joan of Arc", note: "Literal and symbolic charioteer of the Valois army — the Chariot as vision translated into military motion.", source: NICHOLS },
    ],
  },

  "strength": {
    cultural: [
      { name: "Beatrix Kiddo", medium: "Film (Kill Bill)", note: "Grief-forged composure; rage held under a steady hand.", source: INTERP },
      { name: "Atticus Finch", medium: "Literature (Lee)", note: "Moral courage without bluster — strength that does not shout.", source: INTERP },
      { name: "Éowyn", medium: "Literature / Film (Tolkien)", note: "'I am no man' — quiet Strength that answers the Witch-king.", source: INTERP },
      { name: "Beauty", medium: "Myth / Film (Beauty and the Beast)", note: "The Waite-Smith card's iconography — taming the inner beast with patience instead of force.", source: WAITE },
      { name: "Daenerys (early)", medium: "Television (Game of Thrones)", note: "The woman who walks into the fire and emerges — before the arc turns; Strength read at its fullness.", source: INTERP },
    ],
    historical: [
      { name: "Nelson Mandela", note: "Twenty-seven years in a cell, and emerged without the taste for revenge — Strength as public moral discipline.", source: INTERP },
      { name: "Harriet Tubman", note: "Quiet, repeated courage; the Strength of the returning trip, again and again, under lethal risk.", source: INTERP },
      { name: "Jacinda Ardern", note: "Held New Zealand steady in the week after Christchurch with grace and spine.", source: INTERP },
      { name: "Fred Rogers before Congress", note: "The 1969 PBS hearing — the Strength card literalized as a soft voice that moved a hostile senator.", source: INTERP },
    ],
  },

  "the-hermit": {
    cultural: [
      { name: "Gandalf the Grey", medium: "Literature / Film (Tolkien)", note: "The lamp-bearer wandering out from his own solitude.", source: INTERP },
      { name: "Yoda (in exile)", medium: "Film", note: "The retreated master found in the swamp, not the capital.", source: INTERP },
      { name: "Thoreau at Walden", medium: "Literature", note: "Going to the woods 'to see what can be learned by going' — the Hermit as American essay.", source: POLLACK },
      { name: "Sean Maguire", medium: "Film (Good Will Hunting)", note: "The wise one who has withdrawn and now offers the lamp — therapist as Hermit.", source: INTERP },
      { name: "Yaddo-era Carson McCullers (or any recluse-writer archetype)", medium: "Literature", note: "The Hermit as literary vocation — solitude that produces the sentences the crowd cannot.", source: INTERP },
    ],
    historical: [
      { name: "Henry David Thoreau", note: "Two years at Walden — the American patron of lit solitude.", source: POLLACK },
      { name: "Thomas Merton", note: "Trappist monk whose interior life became a public lamp across The Seven Storey Mountain and the late Asian journals.", source: INTERP },
      { name: "Laozi", note: "Rode off on the ox, leaving the Tao Te Ching at the gate — the Hermit as founder of a tradition by departure.", source: POLLACK },
      { name: "Julian of Norwich", note: "The anchoress in her cell whose Revelations of Divine Love is the first book in English attributed to a woman.", source: NICHOLS },
    ],
  },

  "wheel-of-fortune": {
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "Life as a box of chocolates — carried along the turning wheel without resentment.", source: INTERP },
      { name: "Benjamin Button", medium: "Film", note: "Fortune read backwards — the same wheel, different vantage.", source: INTERP },
      { name: "Job", medium: "Literature (Hebrew Bible)", note: "The wheel turns both ways; the question is what remains in the turning.", source: POLLACK },
      { name: "Boethius", medium: "Literature (Consolation of Philosophy)", note: "Lady Fortune explains the wheel to the man she just threw off it.", source: POLLACK },
      { name: "Pip", medium: "Literature (Dickens, Great Expectations)", note: "The Wheel's full revolution in three volumes — poor, rich, revealed, humbled.", source: INTERP },
    ],
    historical: [
      { name: "Boethius", note: "Wrote the philosophical textbook on the Wheel while waiting for execution — source-text for medieval Fortuna imagery.", source: POLLACK },
      { name: "Viktor Frankl", note: "Survivor who located meaning above the revolutions of fortune — Man's Search for Meaning as Wheel-commentary.", source: INTERP },
      { name: "Abraham Lincoln", note: "Rose, fell, rose again — a life laid over the turning of the Wheel at national scale.", source: INTERP },
      { name: "Richard Nixon", note: "The Wheel's full cycle within a single career — vice-president, loser, president, exile.", source: INTERP },
    ],
  },

  "justice": {
    cultural: [
      { name: "Atticus Finch", medium: "Literature (Lee)", note: "Justice as a private discipline held in a public room.", source: INTERP },
      { name: "Daredevil", medium: "Comics / TV", note: "Blindfolded Lady Justice — weighing without seeing faces.", source: INTERP },
      { name: "Antigone", medium: "Literature (Sophocles)", note: "Higher justice against the law of the city — Pollack reads this as Justice against itself.", source: POLLACK },
      { name: "Inspector Javert", medium: "Literature (Hugo, Les Misérables)", note: "Justice without mercy — the scales with the cord cut.", source: INTERP },
      { name: "Captain Vere", medium: "Literature (Melville, Billy Budd)", note: "The Justice card's tragic form — lawful sentence passed on a manifest innocent.", source: NICHOLS },
    ],
    historical: [
      { name: "Ruth Bader Ginsburg", note: "Dissent as a long, patient form of equity.", source: INTERP },
      { name: "Thurgood Marshall", note: "Argued the law into catching up with its own premises — Brown v. Board as Justice-card in action.", source: INTERP },
      { name: "Bryan Stevenson", note: "Mercy as the truest expression of justice — Equal Justice Initiative as living commentary on the arcanum.", source: INTERP },
      { name: "Hammurabi", note: "The oldest surviving legal code — Justice card's prehistory as Babylonian stele.", source: NICHOLS },
    ],
  },

  "the-hanged-man": {
    cultural: [
      { name: "Odin on the World Tree", medium: "Myth", note: "Hung nine days on Yggdrasil to receive the runes — the Hanged Man's founding Northern myth.", source: POLLACK },
      { name: "Neo (pod scene)", medium: "Film (The Matrix)", note: "Suspended in the fluid, the old frame broken, seeing for the first time.", source: INTERP },
      { name: "Christ on the cross", medium: "Myth", note: "The archetypal willing surrender — Nichols reads the Hanged Man as Pauline kenosis.", source: NICHOLS },
      { name: "Phil Connors", medium: "Film (Groundhog Day)", note: "Trapped in the same day until surrender dissolves the trap.", source: INTERP },
      { name: "Sethe", medium: "Literature (Morrison, Beloved)", note: "Suspension in grief as the precondition of release — the Hanged Man in historical-novel register.", source: INTERP },
    ],
    historical: [
      { name: "Simone Weil", note: "Asceticism and attention as the willing suspension of ordinary appetite.", source: INTERP },
      { name: "Dietrich Bonhoeffer", note: "Accepted the cell and the rope as the only remaining form of faith under National Socialism.", source: INTERP },
      { name: "Nelson Mandela (Robben Island)", note: "Twenty-seven years of suspension that produced the man who could govern South Africa.", source: INTERP },
      { name: "Julian of Norwich's anchorage", note: "Voluntary enclosure as spiritual inversion — the Hanged Man as medieval English practice.", source: NICHOLS },
    ],
  },

  "death": {
    cultural: [
      { name: "Walter White", medium: "Television (Breaking Bad)", note: "The long death and remaking of a self — five seasons of the Death card drawn slowly.", source: INTERP },
      { name: "Don Draper", medium: "Television (Mad Men)", note: "The old name buried in Korea so the new man could be born.", source: INTERP },
      { name: "Jean Valjean", medium: "Literature (Hugo)", note: "The convict dies in the bishop's house; the merchant rises in his clothes.", source: POLLACK },
      { name: "Frodo at the Grey Havens", medium: "Literature / Film (Tolkien)", note: "The return that cannot be a return — something has already ended.", source: INTERP },
      { name: "Ebenezer Scrooge (post-ghosts)", medium: "Literature (Dickens)", note: "The Death card followed by the resurrection morning — the two-panel arc.", source: INTERP },
    ],
    historical: [
      { name: "Malcolm X", note: "Died and rose repeatedly — the Hajj was the last and deepest of his deaths before the literal one.", source: INTERP },
      { name: "Bill Wilson (AA)", note: "Rebuilt a life by accepting the death of the drinking self — Step One as the Death arcanum.", source: INTERP },
      { name: "Oliver Sacks", note: "Wrote publicly into his own dying — a clean-eyed farewell in a series of New York Times essays.", source: INTERP },
      { name: "Saul / Paul on the Damascus road", note: "The Death arcanum as conversion-event — one name ends, another begins.", source: POLLACK },
    ],
  },

  "temperance": {
    cultural: [
      { name: "Iroh", medium: "Animation (Avatar: The Last Airbender)", note: "Tea, patience, balance — fire tempered by long water.", source: INTERP },
      { name: "Mister Rogers", medium: "Television", note: "A life-long practice of measured, balanced care.", source: INTERP },
      { name: "Marge Simpson", medium: "Animation", note: "The unshowy alchemy that keeps a household from boiling over.", source: INTERP },
      { name: "Carolyn Martens", medium: "Television (Killing Eve)", note: "Mixes provocation and restraint with surgeon's dosage — Temperance as intelligence-agency craft.", source: INTERP },
      { name: "The angel pouring between cups", medium: "Iconography (Waite-Smith)", note: "The card's own central image — the ongoing alchemical operation that never finishes.", source: WAITE },
    ],
    historical: [
      { name: "Dag Hammarskjöld", note: "UN Secretary-General whose Markings reveal a deep, sustained inner mixing.", source: INTERP },
      { name: "Angela Merkel", note: "Decades of calibrated decisions — the vessel that never boiled over.", source: INTERP },
      { name: "Fred Rogers", note: "A career-long blending of warmth and boundary — the public face of Temperance.", source: INTERP },
      { name: "Carl Jung (mature)", note: "The alchemical project explicit — Jung read the Temperance angel as the conjunction of opposites in psychic work.", source: NICHOLS },
    ],
  },

  "the-devil": {
    cultural: [
      { name: "Gollum", medium: "Literature / Film (Tolkien)", note: "The Ring owns him now — bondage made visible in a body.", source: INTERP },
      { name: "Jordan Belfort", medium: "Film (The Wolf of Wall Street)", note: "The chains are gold and he does not feel them.", source: INTERP },
      { name: "Patrick Bateman", medium: "Literature / Film (American Psycho)", note: "Appetite unhooked from a self — the Devil as vacancy.", source: INTERP },
      { name: "Faust", medium: "Literature (Goethe / Marlowe)", note: "The archetypal contract — the chains accepted for the shining thing.", source: POLLACK },
      { name: "Dorian Gray", medium: "Literature (Wilde)", note: "The portrait in the attic — the Devil card's bondage as aesthetic pact.", source: NICHOLS },
    ],
    historical: [
      { name: "Howard Hughes", note: "Immense capacity harnessed to an invisible captivity.", source: INTERP },
      { name: "Elvis Presley (late)", note: "Appetite as prison — the crown and the chain fused.", source: INTERP },
      { name: "Jim Jones", note: "Charisma as mechanism of bondage — the cult leader's Devil at its lethal extreme.", source: INTERP },
      { name: "Bernie Madoff", note: "Decades inside a fraud that became its own private universe — the Devil as Ponzi scheme.", source: INTERP },
    ],
  },

  "the-tower": {
    cultural: [
      { name: "Fight Club's Project Mayhem", medium: "Film", note: "The explicit detonation of the edifice of modern selfhood.", source: INTERP },
      { name: "Don Corleone in the hospital", medium: "Film (The Godfather)", note: "The sudden collapse that reorders the family forever.", source: INTERP },
      { name: "Anna Karenina", medium: "Literature (Tolstoy)", note: "The structure of her life shaken to its foundation by a single choice.", source: INTERP },
      { name: "Job, day one", medium: "Literature (Hebrew Bible)", note: "Messenger after messenger — the house, the children, the skin, all falling. The Tower's founding text.", source: POLLACK },
      { name: "Cersei's walk of atonement", medium: "Television (Game of Thrones)", note: "The Tower as public humiliation — every structure of dignity collapsing in real time.", source: INTERP },
    ],
    historical: [
      { name: "Admiral James Stockdale (POW years)", note: "The structure he had trusted collapsed — meaning had to be built inside the cell.", source: INTERP },
      { name: "Joan Didion (post-Dunne)", note: "The Year of Magical Thinking — the Tower's collapse narrated from inside.", source: INTERP },
      { name: "Terry Waite", note: "Five years as a hostage in Beirut — the whole outer life blown away.", source: INTERP },
      { name: "Job himself (read historically as wisdom-literature)", note: "The Tower's archetypal biography — the foundational Near Eastern text of catastrophe and its aftermath.", source: POLLACK },
    ],
  },

  "the-star": {
    cultural: [
      { name: "Samwise on the mountain", medium: "Literature / Film (Tolkien)", note: "'There is light above the shadow, and it is not reached yet.'", source: INTERP },
      { name: "Andy Dufresne", medium: "Film (Shawshank Redemption)", note: "'Hope is a good thing' — the Star held across twenty years of wall-chipping.", source: INTERP },
      { name: "Anne Frank's diary", medium: "Literature", note: "Faith in human decency poured, serenely, into the dark.", source: POLLACK },
      { name: "Rey", medium: "Film (Star Wars sequels)", note: "The guileless hope that something good is still coming.", source: INTERP },
      { name: "Ofelia", medium: "Film (Pan's Labyrinth)", note: "The Star card against fascism — the child's belief in another world beneath this one.", source: INTERP },
    ],
    historical: [
      { name: "Václav Havel", note: "'Hope is an orientation of the spirit' — not a prediction. Havel's formulation is itself Star-card commentary.", source: INTERP },
      { name: "Mary Oliver", note: "Wonder and attention as a spiritual discipline, poured out in fifty years of poems.", source: INTERP },
      { name: "Greta Thunberg", note: "A young, undeceived Star holding up a flag for the generations behind her.", source: INTERP },
      { name: "Rebecca Solnit", note: "Hope in the Dark — essayist who made Star-card thinking into post-2003 political theology.", source: INTERP },
    ],
  },

  "the-moon": {
    cultural: [
      { name: "Donnie Darko", medium: "Film", note: "The world at night, shapes not yet resolved — something is moving under the water.", source: INTERP },
      { name: "Laura Palmer", medium: "Television (Twin Peaks)", note: "The moonlit surface over the town's dreaming, fraying reality.", source: INTERP },
      { name: "Alice in Wonderland", medium: "Literature (Carroll)", note: "The logic of dream applied without apology — nothing stable underfoot.", source: POLLACK },
      { name: "Chihiro", medium: "Animation (Spirited Away)", note: "The dream-bath where forms shift and the name itself can be stolen.", source: INTERP },
      { name: "Virginia Woolf's Mrs. Dalloway", medium: "Literature", note: "The Moon card as modernist technique — a single day rendered in its penumbra of memory and half-seen thought.", source: NICHOLS },
    ],
    historical: [
      { name: "Carl Jung (Red Book period)", note: "The great Western record of willingly entering the moonlit interior.", source: NICHOLS },
      { name: "David Lynch", note: "A fifty-year career mapped precisely onto the Moon card's territory.", source: INTERP },
      { name: "Hildegard of Bingen", note: "Visions at the edge of sleep — the Moon's symbolic traffic received and drawn.", source: INTERP },
      { name: "Sigmund Freud", note: "The Interpretation of Dreams (1899) as the Moon card's modern scientific double.", source: POLLACK },
    ],
  },

  "the-sun": {
    cultural: [
      { name: "Paddington Bear", medium: "Film / Literature", note: "Radiant, uncomplicated goodness that warms every room he enters.", source: INTERP },
      { name: "Ted Lasso", medium: "Television", note: "Belief and cheer as moral force — the Sun doing its slow work on English cynicism.", source: INTERP },
      { name: "Leslie Knope", medium: "Television (Parks & Rec)", note: "Cheerful, relentless daylight inflicted on cynicism until it yields.", source: INTERP },
      { name: "Mary", medium: "Literature (The Secret Garden)", note: "The closed garden reopened — the sick child walking, the Sun returned.", source: INTERP },
      { name: "The Sun card child on the white horse", medium: "Iconography (Waite-Smith)", note: "The card's own image — naked daylight childhood as its central claim.", source: WAITE },
    ],
    historical: [
      { name: "Mister Rogers", note: "A public life lit by simple, repeated warmth.", source: INTERP },
      { name: "Desmond Tutu", note: "Joy as an almost dangerous weapon under apartheid — the laugh that would not be crushed.", source: INTERP },
      { name: "Dolly Parton", note: "An unembarrassed radiance used in the service of others for six decades.", source: INTERP },
      { name: "Walt Whitman", note: "'I celebrate myself, and sing myself' — Song of Myself as the American Sun card made into a poem.", source: POLLACK },
    ],
  },

  "judgement": {
    cultural: [
      { name: "Ebenezer Scrooge (Christmas morning)", medium: "Literature (Dickens)", note: "The trumpet sounds and the old man answers — a life awake to itself.", source: INTERP },
      { name: "Raskolnikov in Siberia", medium: "Literature (Dostoevsky)", note: "The slow rising to his own life after Sonya's witness.", source: POLLACK },
      { name: "Rick Blaine", medium: "Film (Casablanca)", note: "The trumpet is the plane leaving — he chooses the call over himself.", source: INTERP },
      { name: "George Bailey", medium: "Film (It's a Wonderful Life)", note: "Summoned to see his own life, and then allowed to live it.", source: INTERP },
      { name: "Lily Bart's final morning", medium: "Literature (Wharton, House of Mirth)", note: "The Judgement card's tragic register — the summons comes too late to be answered.", source: NICHOLS },
    ],
    historical: [
      { name: "St. Augustine in the garden", note: "'Take up and read' — the call answered in a moment that became the Confessions.", source: POLLACK },
      { name: "John Newton", note: "Slave trader who became the author of Amazing Grace — a late, full answering.", source: INTERP },
      { name: "Oskar Schindler", note: "Hears the call mid-life and spends his fortune answering it.", source: INTERP },
      { name: "Thomas Merton in Louisville", note: "The Fourth and Walnut epiphany — the Judgement card as a single moment on a street corner.", source: INTERP },
    ],
  },

  "the-world": {
    cultural: [
      { name: "Frodo at the Grey Havens", medium: "Literature / Film (Tolkien)", note: "Task complete — the dance of the four closed into a stillness.", source: INTERP },
      { name: "Luke at the second funeral pyre", medium: "Film (Return of the Jedi)", note: "The Jedi restored — the generations whole, a still point reached.", source: INTERP },
      { name: "Leopold Bloom returning to Molly", medium: "Literature (Joyce, Ulysses)", note: "The novel's last 'yes' — the wanderer home, the wholeness tasted.", source: POLLACK },
      { name: "Dorothy back in Kansas", medium: "Film (The Wizard of Oz)", note: "The four companions integrated within her — the journey closed.", source: NICHOLS },
      { name: "Prospero breaking the staff", medium: "Literature (Shakespeare, The Tempest)", note: "The World card as Shakespearean finale — renunciation as completion.", source: POLLACK },
    ],
    historical: [
      { name: "Carl Jung (late life)", note: "Memories, Dreams, Reflections — a man who lived long enough to see his own circle close.", source: INTERP },
      { name: "Nelson Mandela (inauguration)", note: "Prison, release, presidency — the whole arc resolving into a single standing figure.", source: INTERP },
      { name: "Queen Elizabeth II (Platinum Jubilee)", note: "Seventy years of a single role fulfilled to its end.", source: INTERP },
      { name: "Hildegard of Bingen's Ordo Virtutum", note: "The sung morality-play as integrated life-work — the World card as medieval composition.", source: NICHOLS },
    ],
  },
};

export function getTarotExemplars(slug: string): ExemplarSet | undefined {
  return TAROT_EXEMPLARS[slug];
}
