import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Tarot Major Arcana exemplars. Cultural + historical figures who embody the
// arcanum's central gesture — keyed by slug.

export const TAROT_EXEMPLARS: Record<string, ExemplarSet> = {
  "the-fool": {
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "Stepping off every cliff without calculation; faith as locomotion." },
      { name: "Amélie Poulain", medium: "Film", note: "The open-hearted beginner, unguarded against the world." },
      { name: "Don Quixote", medium: "Literature", note: "The holy idiot whose delusion is braver than our sanity." },
      { name: "Parzival", medium: "Myth", note: "The unworldly knight — innocence as the precondition of the Grail." },
    ],
    historical: [
      { name: "St. Francis of Assisi", note: "Walked off the inheritance, barefoot, into a life without plan." },
      { name: "Buster Keaton", note: "The great stone face moving obliviously through catastrophe." },
      { name: "Emily Dickinson", note: "Stepped off the social cliff into the private interior and its riches." },
    ],
  },

  "the-magician": {
    cultural: [
      { name: "Prospero", medium: "Literature", note: "The sovereign-magician on the island — will directed at the four elements." },
      { name: "Doctor Strange", medium: "Film / Comics", note: "The scholar who learns the mechanics of the invisible and bends them." },
      { name: "Gatsby", medium: "Literature", note: "Conjured a self out of will and attention; the Magician's shadow side." },
      { name: "Mary Poppins", medium: "Film", note: "A carpet bag of tools — every situation answered with the right implement." },
    ],
    historical: [
      { name: "Nikola Tesla", note: "Pulled invisible forces into visible form; electricity as ritual." },
      { name: "Orson Welles", note: "Magician by training, filmmaker by extension — the same art." },
      { name: "Steve Jobs", note: "Reality-distortion field as magical technique." },
    ],
  },

  "the-high-priestess": {
    cultural: [
      { name: "Galadriel", medium: "Literature / Film", note: "The mirror-keeper; knowing that precedes and exceeds words." },
      { name: "Clarice Starling", medium: "Film", note: "Listening past language to the thing the evidence cannot say." },
      { name: "Sibyl of Cumae", medium: "Myth", note: "Oracular knowing delivered in fragments no one wants to hear." },
      { name: "Marion Crane (post-death psyche)", medium: "Film", note: "The veiled interior that cinema circles but cannot enter." },
    ],
    historical: [
      { name: "Hildegard of Bingen", note: "Visions transcribed intact — the veil parting on schedule." },
      { name: "Marie-Louise von Franz", note: "Jungian scholar who read symbols the way others read sentences." },
      { name: "Anna Akhmatova", note: "Silent witness to the century; knowing held under pressure." },
    ],
  },

  "the-empress": {
    cultural: [
      { name: "Demeter", medium: "Myth", note: "Grain, grief, return — the generative mother who makes the seasons move." },
      { name: "Molly Weasley", medium: "Literature", note: "The bottomless kitchen; abundance as moral stance." },
      { name: "Mrs. Ramsay", medium: "Literature", note: "The still center around which the household organizes itself." },
      { name: "Chef (Ratatouille, Gusteau)", medium: "Film", note: "Anyone can cook — nourishment as creative act." },
    ],
    historical: [
      { name: "Alice Waters", note: "Turned the table itself into a cultural institution." },
      { name: "Frida Kahlo", note: "Pain, fertility, flora — the body rendered as a garden." },
      { name: "Julia Child", note: "Abundance with a laugh; the domestic made heroic." },
    ],
  },

  "the-emperor": {
    cultural: [
      { name: "Aragorn", medium: "Literature / Film", note: "The king who finally sits, upholding law against chaos." },
      { name: "Marcus Aurelius (Gladiator)", medium: "Film", note: "Authority as burden; the philosopher on the throne." },
      { name: "Stannis Baratheon", medium: "Literature / TV", note: "Law without warmth — the Emperor's austerity taken to its edge." },
      { name: "Don Corleone", medium: "Film", note: "Patriarchal order, code, and consequence — benign and terrible." },
    ],
    historical: [
      { name: "Marcus Aurelius", note: "Meditations: the sovereign disciplining himself into fitness to rule." },
      { name: "George Washington", note: "Refused the crown; founded by stepping away from power." },
      { name: "Lee Kuan Yew", note: "Order imposed with relentless clarity — the modern Emperor at work." },
    ],
  },

  "the-hierophant": {
    cultural: [
      { name: "Dumbledore", medium: "Literature", note: "The transmitter of the tradition; keeper of the school's rites." },
      { name: "Father Zosima", medium: "Literature", note: "The Orthodox elder in The Brothers Karamazov — spiritual inheritance personified." },
      { name: "Obi-Wan Kenobi", medium: "Film", note: "The keeper of an order; passes the lineage to the next hand." },
      { name: "Mr. Miyagi", medium: "Film", note: "Tradition taught slowly, through ritual, to the student who will carry it." },
    ],
    historical: [
      { name: "Thich Nhat Hanh", note: "Transmitted a living lineage across cultures with patience." },
      { name: "Rabbi Abraham Joshua Heschel", note: "Theologian who walked with Dr. King — the tradition in action." },
      { name: "Pope John XXIII", note: "Opened the windows of the Church without breaking the vessel." },
    ],
  },

  "the-lovers": {
    cultural: [
      { name: "Elizabeth & Darcy", medium: "Literature", note: "Recognition across difference; love as a choice clarified by argument." },
      { name: "Jim & Pam", medium: "Television", note: "Office-romance patience — the slow, chosen yes." },
      { name: "Céline & Jesse (Before Sunrise)", medium: "Film", note: "The conscious conversation at the heart of choosing." },
      { name: "Orpheus & Eurydice", medium: "Myth", note: "The chosen bond tested against the underworld — the Lovers' shadow." },
    ],
    historical: [
      { name: "Abigail & John Adams", note: "Correspondence as marriage; intellect and affection braided." },
      { name: "Georgia O'Keeffe & Alfred Stieglitz", note: "Artist-lovers who made each other's work possible." },
      { name: "Pierre & Marie Curie", note: "Partnership under the radium lamp — work and union indistinguishable." },
    ],
  },

  "the-chariot": {
    cultural: [
      { name: "Maximus (Gladiator)", medium: "Film", note: "Will harnessed to purpose; two opposing forces reined to one line." },
      { name: "Furiosa", medium: "Film", note: "The driver who carries the whole cargo toward a distant green." },
      { name: "Captain Ahab", medium: "Literature", note: "Monomania as drive — the Chariot steered by obsession." },
      { name: "Miyamoto Musashi", medium: "Literature / Myth", note: "The duelist whose whole being moves along a single vector." },
    ],
    historical: [
      { name: "Alexander the Great", note: "A column of will that crossed continents before it stopped." },
      { name: "Ernest Shackleton", note: "Kept the boat pointed; brought every man home." },
      { name: "Serena Williams", note: "Twenty years of direction at maximum intensity." },
    ],
  },

  "strength": {
    cultural: [
      { name: "Beatrix Kiddo (Kill Bill)", medium: "Film", note: "Grief-forged composure; rage held under a steady hand." },
      { name: "Atticus Finch", medium: "Literature", note: "Moral courage without bluster — strength that does not shout." },
      { name: "Éowyn", medium: "Literature / Film", note: "No man can kill me — quiet strength that answers the Witch-King." },
      { name: "Beauty (Beauty & the Beast)", medium: "Myth / Film", note: "Taming the inner beast with patience instead of force." },
    ],
    historical: [
      { name: "Nelson Mandela", note: "Twenty-seven years in a cell, and came out without the taste for revenge." },
      { name: "Harriet Tubman", note: "Quiet, repeated courage; the strength of the returning trip." },
      { name: "Jacinda Ardern", note: "Held a country steady in the week after Christchurch with grace and spine." },
    ],
  },

  "the-hermit": {
    cultural: [
      { name: "Gandalf the Grey", medium: "Literature / Film", note: "The lamp-bearer wandering out from his own solitude." },
      { name: "Yoda (in exile)", medium: "Film", note: "The retreated master found in the swamp, not the capital." },
      { name: "Thoreau of Walden", medium: "Literature", note: "Going to the woods to see what can be learned by going." },
      { name: "Will Hunting's therapist (Sean)", medium: "Film", note: "The wise one who has withdrawn and now offers the lamp." },
    ],
    historical: [
      { name: "Henry David Thoreau", note: "Two years at Walden; the American patron of lit solitude." },
      { name: "Thomas Merton", note: "Trappist monk whose interior life became a public lamp." },
      { name: "Laozi", note: "Rode off on the ox, leaving the Tao Te Ching at the gate." },
    ],
  },

  "wheel-of-fortune": {
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "Life as a box of chocolates; carried along the turning wheel without resentment." },
      { name: "Benjamin Button", medium: "Film", note: "Fortune read backwards — the same wheel, different vantage." },
      { name: "Job", medium: "Literature", note: "The wheel turns both ways; the question is what remains in the turning." },
      { name: "Boethius (Consolation of Philosophy)", medium: "Literature", note: "Lady Fortune explains the wheel to the man she just threw off it." },
    ],
    historical: [
      { name: "Boethius", note: "Wrote the philosophical textbook on the wheel while waiting for execution." },
      { name: "Viktor Frankl", note: "Survivor who located meaning above the revolutions of fortune." },
      { name: "Abraham Lincoln", note: "Rose, fell, rose again — a life laid over the turning of the wheel." },
    ],
  },

  "justice": {
    cultural: [
      { name: "Atticus Finch", medium: "Literature", note: "Justice as a private discipline held in a public room." },
      { name: "Daredevil", medium: "Comics / TV", note: "Blindfolded Lady Justice — weighing without seeing faces." },
      { name: "Antigone", medium: "Literature", note: "Higher justice against the law of the city — Justice against itself." },
      { name: "Javert (Les Misérables)", medium: "Literature", note: "Justice without mercy — the scales with the cord cut." },
    ],
    historical: [
      { name: "Ruth Bader Ginsburg", note: "Dissent as a long, patient form of equity." },
      { name: "Thurgood Marshall", note: "Argued the law into catching up with its own premises." },
      { name: "Bryan Stevenson", note: "Mercy as the truest expression of justice (Equal Justice Initiative)." },
    ],
  },

  "the-hanged-man": {
    cultural: [
      { name: "Odin on the World Tree", medium: "Myth", note: "Hung nine days on Yggdrasil to receive the runes — voluntary reversal." },
      { name: "Neo (The Matrix, pod scene)", medium: "Film", note: "Suspended in the fluid, the old frame broken, seeing for the first time." },
      { name: "Christ on the cross", medium: "Myth", note: "The archetypal willing surrender; transformation through inverted position." },
      { name: "Phil Connors (Groundhog Day)", medium: "Film", note: "Trapped in the same day until surrender dissolves the trap." },
    ],
    historical: [
      { name: "Simone Weil", note: "Asceticism and attention as the willing suspension of the ordinary appetite." },
      { name: "Dietrich Bonhoeffer", note: "Accepted the cell and the rope as the only remaining form of faith." },
      { name: "Iyanla Vanzant", note: "Public rebuilder of lives around the discipline of surrender." },
    ],
  },

  "death": {
    cultural: [
      { name: "Walter White", medium: "Television", note: "Breaking Bad as the long death and remaking of a self." },
      { name: "Don Draper", medium: "Television", note: "The old name buried in Korea so the new man could be born." },
      { name: "Jean Valjean", medium: "Literature", note: "The convict dies in the bishop's house; the merchant rises in his clothes." },
      { name: "Frodo at the Grey Havens", medium: "Literature / Film", note: "The return that cannot be a return — something has already ended." },
    ],
    historical: [
      { name: "Malcolm X", note: "Died and rose repeatedly; the Hajj was the last and deepest of his deaths." },
      { name: "Bill Wilson (AA)", note: "Rebuilt a life by accepting the death of the drinking self." },
      { name: "Oliver Sacks", note: "Wrote publicly into his own dying; a clean-eyed farewell." },
    ],
  },

  "temperance": {
    cultural: [
      { name: "Iroh (Avatar)", medium: "Animation", note: "Tea, patience, balance — fire tempered by long water." },
      { name: "Mr. Rogers", medium: "Television", note: "A life-long practice of measured, balanced care." },
      { name: "Marge Simpson", medium: "Animation", note: "The unshowy alchemy that keeps a household from boiling over." },
      { name: "Eve Polastri's handler (Carolyn, Killing Eve)", medium: "Television", note: "Mixes provocation and restraint with surgeon's dosage." },
    ],
    historical: [
      { name: "Dag Hammarskjöld", note: "UN Secretary-General whose Markings reveal a deep, sustained inner mixing." },
      { name: "Angela Merkel", note: "Decades of calibrated decisions — the vessel that never boiled over." },
      { name: "Fred Rogers", note: "A career-long blending of warmth and boundary; the public face of temperance." },
    ],
  },

  "the-devil": {
    cultural: [
      { name: "Gollum", medium: "Literature / Film", note: "The ring owns him now; bondage made visible in a body." },
      { name: "Jordan Belfort (Wolf of Wall Street)", medium: "Film", note: "The chains are gold and he does not feel them." },
      { name: "Patrick Bateman", medium: "Literature / Film", note: "Appetite unhooked from a self; the Devil as vacancy." },
      { name: "Faust", medium: "Literature", note: "The archetypal contract — the chains accepted for the shining thing." },
    ],
    historical: [
      { name: "Howard Hughes", note: "Immense capacity harnessed to an invisible captivity." },
      { name: "Elvis Presley (late)", note: "Appetite as prison; the crown and the chain fused." },
      { name: "Jim Jones", note: "Charisma as mechanism of bondage — the cult leader's Devil." },
    ],
  },

  "the-tower": {
    cultural: [
      { name: "Tyler Durden's project", medium: "Film", note: "The explicit detonation of the edifice of modern selfhood." },
      { name: "Don Corleone in the hospital", medium: "Film", note: "The sudden collapse that reorders the family forever." },
      { name: "Anna Karenina", medium: "Literature", note: "The structure of her life shaken to its foundation by a single choice." },
      { name: "Job, day one", medium: "Literature", note: "Messenger after messenger; the house, the children, the skin — all falling." },
    ],
    historical: [
      { name: "Admiral Stockdale (POW years)", note: "The structure he had trusted collapsed; meaning had to be built inside the cell." },
      { name: "Joan Didion (post-Dunne)", note: "The Year of Magical Thinking — the tower's collapse narrated from inside." },
      { name: "Terry Waite", note: "Five years as a hostage; the whole outer life blown away." },
    ],
  },

  "the-star": {
    cultural: [
      { name: "Samwise Gamgee on the mountain", medium: "Literature / Film", note: "There is light above the shadow, and it is not reached yet." },
      { name: "Andy Dufresne (Shawshank)", medium: "Film", note: "Hope is a good thing — the star held across twenty years." },
      { name: "Anne Frank's diary", medium: "Literature", note: "Faith in human decency pouring, serenely, into the dark." },
      { name: "Rey (Star Wars sequels)", medium: "Film", note: "The guileless hope that something good is still coming." },
    ],
    historical: [
      { name: "Vaclav Havel", note: "Hope as an orientation of the spirit, not a prediction." },
      { name: "Mary Oliver", note: "Wonder and attention as a spiritual discipline, poured out." },
      { name: "Greta Thunberg", note: "A young, undeceived star holding up a flag for the generations behind her." },
    ],
  },

  "the-moon": {
    cultural: [
      { name: "Donnie Darko", medium: "Film", note: "The world at night, shapes not yet resolved; something is moving under the water." },
      { name: "Laura Palmer (Twin Peaks)", medium: "Television", note: "The moon-lit surface over the town's dreaming, fraying reality." },
      { name: "Alice in Wonderland", medium: "Literature", note: "The logic of dream applied without apology; nothing stable underfoot." },
      { name: "Chihiro (Spirited Away)", medium: "Animation", note: "The dream-bath where forms shift and the name itself can be stolen." },
    ],
    historical: [
      { name: "Carl Jung's Red Book", note: "The great Western record of willingly entering the moonlit interior." },
      { name: "David Lynch", note: "A career mapped onto the Moon card's territory." },
      { name: "Hildegard of Bingen", note: "Visions at the edge of sleep — the Moon's symbolic traffic received and drawn." },
    ],
  },

  "the-sun": {
    cultural: [
      { name: "Paddington Bear", medium: "Film / Literature", note: "Radiant, uncomplicated goodness that warms every room he enters." },
      { name: "Ted Lasso", medium: "Television", note: "Belief and cheer as moral force — the sun doing its slow work." },
      { name: "Leslie Knope", medium: "Television", note: "Cheerful, relentless daylight inflicted on cynicism until it yields." },
      { name: "Mary (The Secret Garden)", medium: "Literature", note: "The closed garden reopened; the sick child walking, the sun returned." },
    ],
    historical: [
      { name: "Mister Rogers", note: "A public life lit by simple, repeated warmth." },
      { name: "Desmond Tutu", note: "Joy as an almost dangerous weapon under apartheid — the laugh that would not be crushed." },
      { name: "Dolly Parton", note: "An unembarrassed radiance used in the service of others for six decades." },
    ],
  },

  "judgement": {
    cultural: [
      { name: "Ebenezer Scrooge (Christmas morning)", medium: "Literature", note: "The trumpet sounds and the old man answers — a life awake to itself." },
      { name: "Raskolnikov in Siberia", medium: "Literature", note: "The slow rising to his own life after Sonya's witness." },
      { name: "Rick Blaine (Casablanca)", medium: "Film", note: "The trumpet is the plane leaving; he chooses the call over himself." },
      { name: "George Bailey (It's a Wonderful Life)", medium: "Film", note: "Summoned to see his own life, and then allowed to live it." },
    ],
    historical: [
      { name: "St. Augustine in the garden", note: "Take up and read — the call answered in a moment." },
      { name: "John Newton", note: "Slave trader who became the hymn Amazing Grace — a late, full answering." },
      { name: "Oskar Schindler", note: "Hears the call mid-life; spends his fortune answering it." },
    ],
  },

  "the-world": {
    cultural: [
      { name: "Frodo at Cirith Ungol / the Grey Havens", medium: "Literature / Film", note: "Task complete; the dance of the four closed into a stillness." },
      { name: "Luke at the second funeral pyre", medium: "Film", note: "The Jedi restored; the generations whole; a still point reached." },
      { name: "Leopold Bloom returning to Molly", medium: "Literature", note: "Ulysses' last yes — the wanderer home, the wholeness tasted." },
      { name: "Dorothy back in Kansas", medium: "Film", note: "The four companions integrated within her; the journey closed." },
    ],
    historical: [
      { name: "Carl Jung (late life)", note: "Memories, Dreams, Reflections — a man who lived long enough to see his own circle close." },
      { name: "Nelson Mandela (inauguration)", note: "The entire arc — prison, release, presidency — resolving into a single standing figure." },
      { name: "Queen Elizabeth II (Platinum Jubilee)", note: "Seventy years of a single role fulfilled to its end." },
    ],
  },
};

export function getTarotExemplars(slug: string): ExemplarSet | undefined {
  return TAROT_EXEMPLARS[slug];
}
