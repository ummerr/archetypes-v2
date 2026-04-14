import { JungianExemplars } from "@/types/jungian";

// Pearson-Marr exemplar set. Anchored to Mark & Pearson, The Hero and the Outlaw
// (2001) and Pearson, Awakening the Heroes Within (1991). Brands largely follow
// Mark & Pearson's own case studies; cultural and historical figures are drawn
// from those books where possible, otherwise from widely-echoed secondary
// literature in brand-archetype and depth-psychology writing. Attributions are
// interpretive, not diagnostic.

const MP = "Mark & Pearson 2001";
const P91 = "Pearson 1991";
const SECONDARY = "widely attributed in brand-archetype literature";

export const JUNGIAN_EXEMPLARS: Record<string, JungianExemplars> = {
  innocent: {
    brands: [
      { name: "Coca-Cola", note: "Happiness as shared world — the hilltop ad as civic liturgy of togetherness.", source: `${MP}, ch. Innocent` },
      { name: "Dove", note: "Real Beauty campaign framed self-acceptance as moral recovery, not aspiration.", source: MP },
      { name: "Ivory Soap", note: "'99 and 44/100% pure' — the Innocent's claim literalized as product spec.", source: MP },
      { name: "Disney (classic)", note: "A kingdom where wishes come true, protected from the adult world's compromise.", source: MP },
    ],
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "The pure-hearted witness who walks through late-twentieth-century American trauma unchanged by it — virtue as obliviousness.", source: SECONDARY },
      { name: "Snow White", medium: "Fairy Tale", note: "The archetypal innocent whose goodness survives poisoning, exile, and the forest's dark double.", source: P91 },
      { name: "Maria von Trapp", medium: "Film (The Sound of Music)", note: "Faith and song held against the Anschluss — stubborn goodness as political refusal.", source: SECONDARY },
      { name: "Billy Budd", medium: "Literature (Melville)", note: "The 'handsome sailor' whose moral purity invites the envy of a corrupted world. Melville's study of innocence as provocation.", source: P91 },
      { name: "Amélie Poulain", medium: "Film", note: "Paris reframed as a scheme of small kindnesses engineered by a wholly benign imagination.", source: SECONDARY },
    ],
    historical: [
      { name: "Fred Rogers", note: "A public ministry of simple kindness — held with unnerving seriousness — aimed at children whose world was hardening around them.", source: SECONDARY },
      { name: "Anne Frank", note: "Her diary's persistent belief in human goodness under Nazi occupation is the Innocent's position tested against the worst available evidence.", source: P91 },
      { name: "Mister Rogers' neighbor, Jimmy Carter", note: "Sunday-school teacher presidency and decades of Habitat for Humanity labor — the Innocent as quietly scandalous public figure.", source: SECONDARY },
    ],
  },

  everyman: {
    brands: [
      { name: "IKEA", note: "Design democratized — a home within reach, assembled by anyone with an Allen key.", source: MP },
      { name: "Target", note: "Ordinary life, slightly improved — the Everyman's upgrade without pretension.", source: MP },
      { name: "Levi's", note: "The working uniform that outlived the gold rush, the New Deal, and the culture wars.", source: SECONDARY },
      { name: "Budweiser", note: "The beer that belongs to the crowd — blue-collar populism bottled for a century.", source: MP },
    ],
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature (Tolkien)", note: "The loyal companion whose ordinary love carries the Ring-bearer the last mile. Tolkien named him the true hero of the book.", source: SECONDARY },
      { name: "Homer Simpson", medium: "Television", note: "The American everyman — flawed, tender, indestructible — filtered through four decades of satire that never quite cancels his dignity.", source: SECONDARY },
      { name: "Charlie Brown", medium: "Comics", note: "Persistence without glory; the dignity of trying even when Lucy pulls the football again.", source: SECONDARY },
      { name: "Leopold Bloom", medium: "Literature (Joyce)", note: "Ulysses walks a Dublin ad-canvasser through the Odyssey, arguing that the epic is always already inside ordinary life.", source: P91 },
      { name: "The Dude", medium: "Film (The Big Lebowski)", note: "Unemployed Los Angeles slacker reframed as a reluctantly competent everyman — 'he's the man for his time and place.'", source: SECONDARY },
    ],
    historical: [
      { name: "Walter Cronkite", note: "'The most trusted man in America' — television's voice of shared national experience.", source: SECONDARY },
      { name: "Studs Terkel", note: "Working (1974) and his decades of radio interviews treat the ordinary worker's testimony as primary historical source.", source: SECONDARY },
      { name: "Harry Truman", note: "Haberdasher-turned-president whose plain Missouri speech became a presidential register.", source: SECONDARY },
    ],
  },

  hero: {
    brands: [
      { name: "Nike", note: "'Just do it' — the athlete as mythic conqueror. Mark & Pearson's central Hero case study.", source: MP },
      { name: "BMW", note: "'The ultimate driving machine' — mastery as identity, performance as proof.", source: MP },
      { name: "U.S. Army ('Be all you can be')", note: "Recruitment rebranded as a self-actualization quest rather than national duty.", source: MP },
      { name: "FedEx", note: "Mission accomplished, overnight — heroic competence as logistics.", source: SECONDARY },
    ],
    cultural: [
      { name: "Luke Skywalker", medium: "Film", note: "Campbell's monomyth rendered in pure form — the called youth who confronts the father-shadow and returns.", source: P91 },
      { name: "Wonder Woman", medium: "Film / Comics", note: "Strength wedded to compassion; the protector who fights because the world requires it, not because she does.", source: SECONDARY },
      { name: "Rocky Balboa", medium: "Film", note: "Discipline as redemption; going the distance with Apollo Creed as the working-class Hero's self-proof.", source: SECONDARY },
      { name: "Beowulf", medium: "Literature", note: "The oldest English-language hero epic — the Geat who crosses water to kill the monster that no local can.", source: P91 },
      { name: "Éowyn", medium: "Literature (Tolkien)", note: "'I am no man' — the shield-maiden who refuses caretaker's role, rides to war, and kills the Witch-king.", source: SECONDARY },
    ],
    historical: [
      { name: "Theodore Roosevelt", note: "'The strenuous life' as public doctrine — self-made vigor explicitly offered as national virtue.", source: SECONDARY },
      { name: "Joan of Arc", note: "Called to arms by vision at seventeen; the warrior-saint whose trial transcript is history's first-person Hero's Journey.", source: P91 },
      { name: "Ernest Shackleton", note: "The Endurance expedition: ship crushed in Antarctic ice, every man brought home alive — the Hero measured by who survives.", source: SECONDARY },
    ],
  },

  caregiver: {
    brands: [
      { name: "Johnson & Johnson", note: "'A family company' — the Tylenol recall handled as caregiving crisis-response, now a case study in archetypal brand coherence.", source: MP },
      { name: "Volvo", note: "Protection as the highest luxury — safety engineering elevated to moral claim.", source: MP },
      { name: "Campbell's Soup", note: "'M'm! M'm! Good' — comfort in a can, weaponized against mid-century anxiety.", source: SECONDARY },
      { name: "UNICEF", note: "Caregiving scaled to civilizations — the archetype as global institution.", source: SECONDARY },
    ],
    cultural: [
      { name: "Molly Weasley", medium: "Literature (Rowling)", note: "The fierce maternal force — warmth and warrior both — who adopts Harry, feeds an army, and kills Bellatrix.", source: SECONDARY },
      { name: "Atticus Finch", medium: "Literature (Lee)", note: "Protective justice; care expressed as patient principle against a town's moral failure.", source: SECONDARY },
      { name: "Mary Poppins", medium: "Film / Literature", note: "Firm, magical, exactly sufficient nurture — care with an expiry date because the children must learn to hold themselves.", source: SECONDARY },
      { name: "Bruce Banner / The Hulk", medium: "Film / Comics", note: "Read as Caregiver's shadow: the scientist whose every impulse is to protect, whose anger emerges only when the vulnerable are threatened.", source: SECONDARY },
      { name: "Marmee March", medium: "Literature (Alcott, Little Women)", note: "The mother who holds four daughters and a Civil War household together by acts of deliberate moral instruction.", source: P91 },
    ],
    historical: [
      { name: "Mother Teresa", note: "Radical devotion to the dying and the discarded — the Caregiver pushed to its ascetic extreme.", source: SECONDARY },
      { name: "Florence Nightingale", note: "Care as statistical discipline; she refounded nursing as a profession and invented the pie chart to prove it.", source: SECONDARY },
      { name: "Fred Rogers", note: "Cross-listed with Innocent — television as an act of sustained care for the inner life of children.", source: SECONDARY },
    ],
  },

  explorer: {
    brands: [
      { name: "The North Face", note: "'Never stop exploring' — the Explorer archetype stated as brand imperative.", source: MP },
      { name: "Patagonia", note: "Gear for the wild; ethics for the journey — Explorer fused with conscience.", source: MP },
      { name: "Jeep", note: "'Go anywhere, do anything' — the vehicle as portable frontier.", source: MP },
      { name: "Airbnb", note: "'Belong anywhere' — the nomadic home promised as travel's new unit.", source: SECONDARY },
    ],
    cultural: [
      { name: "Indiana Jones", medium: "Film", note: "The scholar-adventurer addicted to the horizon — the Explorer who can't stay in the lecture hall.", source: SECONDARY },
      { name: "Bilbo Baggins", medium: "Literature (Tolkien)", note: "The reluctant wanderer who finds himself in the wilds — Tolkien's bourgeois subject confronted with the Explorer's summons.", source: P91 },
      { name: "Sal Paradise", medium: "Literature (Kerouac, On the Road)", note: "Motion as identity; post-war America mapped by a narrator who cannot stop moving.", source: SECONDARY },
      { name: "Huckleberry Finn", medium: "Literature (Twain)", note: "The raft on the Mississippi as America's foundational Explorer scene — flight from civilization as moral awakening.", source: P91 },
      { name: "Captain Kirk", medium: "Television (Star Trek)", note: "'To boldly go' — the Explorer promoted to Federation policy.", source: SECONDARY },
    ],
    historical: [
      { name: "Anthony Bourdain", note: "Appetite as curiosity; the traveler as witness to the kitchens and back-streets of unfamiliar cities.", source: SECONDARY },
      { name: "Amelia Earhart", note: "'The sky as her one true country' — the Explorer whose disappearance completed the archetype.", source: SECONDARY },
      { name: "Alexander von Humboldt", note: "The five-year expedition through the Americas that founded modern biogeography — Explorer as natural philosopher.", source: SECONDARY },
    ],
  },

  rebel: {
    brands: [
      { name: "Harley-Davidson", note: "Outlaw freedom; the open road as refusal. Mark & Pearson's canonical Outlaw case study.", source: MP },
      { name: "Virgin", note: "Cheerful insurgency against incumbents — Branson's airlines, records, and rockets as serial Rebel play.", source: MP },
      { name: "Apple ('1984')", note: "The Super Bowl ad that cast IBM as Big Brother and Macintosh as the hammer — Rebel positioning at brand-founding moment.", source: MP },
      { name: "Diesel ('Be Stupid')", note: "Provocation as brand — the Rebel's contempt for the sensible life turned into campaign copy.", source: SECONDARY },
    ],
    cultural: [
      { name: "Tyler Durden", medium: "Film (Fight Club)", note: "The seductive destroyer who promises freedom — the Rebel whose shadow is the whole movie's joke.", source: SECONDARY },
      { name: "V", medium: "Graphic Novel / Film (V for Vendetta)", note: "Revolution as theater — the Rebel who treats political violence as a scripted gesture against tyranny.", source: SECONDARY },
      { name: "Katniss Everdeen", medium: "Literature / Film", note: "The reluctant symbol of refusal; the Rebel drafted into revolution by the Capitol's own cameras.", source: SECONDARY },
      { name: "Randle McMurphy", medium: "Literature / Film (Cuckoo's Nest)", note: "The cheerful anti-authoritarian broken by institutional psychiatry — Rebel as American sacrifice.", source: SECONDARY },
      { name: "The Bride (Kill Bill)", medium: "Film", note: "Revenge as vocation — Tarantino's Rebel whose moral justification is treated as secondary to her art.", source: SECONDARY },
    ],
    historical: [
      { name: "Malcolm X", note: "Uncompromising truth-telling; the Rebel who named white American hypocrisy in a register liberal allies found intolerable.", source: SECONDARY },
      { name: "Emma Goldman", note: "Anarchist conscience of an age — deported twice, arrested constantly, a lifetime refusal of the administered state.", source: SECONDARY },
      { name: "Patti Smith", note: "Horses (1975) and her CBGB years: punk as literary stance, the Rebel as woman-poet.", source: SECONDARY },
    ],
  },

  lover: {
    brands: [
      { name: "Chanel", note: "Seduction as art form; beauty as birthright. Mark & Pearson's canonical Lover case.", source: MP },
      { name: "Godiva", note: "Luxury made edible; pleasure without apology.", source: MP },
      { name: "Victoria's Secret", note: "Eros mass-marketed — the Lover's promise industrialized and then, eventually, critiqued.", source: SECONDARY },
      { name: "Hallmark", note: "Intimacy scripted for the greeting card — the Lover reduced to legible ritual.", source: MP },
    ],
    cultural: [
      { name: "Elizabeth Bennet", medium: "Literature (Austen)", note: "Intelligence and passion fused — the Lover as mutual recognition across class and pride.", source: SECONDARY },
      { name: "Romeo", medium: "Literature (Shakespeare)", note: "The archetype of all-consuming first love — and its lethal velocity.", source: P91 },
      { name: "Marianne Dashwood", medium: "Literature (Austen, Sense and Sensibility)", note: "Sensibility's devotion — all feeling, all at once, tested nearly to death.", source: SECONDARY },
      { name: "Jay Gatsby", medium: "Literature (Fitzgerald)", note: "The Lover whose devotion is inseparable from his capacity for self-invention — romance as American tragedy.", source: P91 },
      { name: "Orpheus", medium: "Myth", note: "The singer whose love descends to the underworld and loses Eurydice by looking back — the Lover's founding tragedy.", source: P91 },
    ],
    historical: [
      { name: "Pablo Neruda", note: "Twenty Love Poems and a Song of Despair: language operating at the edge of the erotic and the elegiac.", source: SECONDARY },
      { name: "Rumi", note: "Love of the beloved as path to the divine — the Sufi Lover who dissolves the distinction between eros and devotion.", source: SECONDARY },
      { name: "Sappho", note: "The fragment-poet of Lesbos; the earliest surviving first-person voice of the Lover archetype in the Western canon.", source: P91 },
    ],
  },

  creator: {
    brands: [
      { name: "Apple", note: "'Think different' — tools for the creative class. Mark & Pearson's flagship Creator case study.", source: MP },
      { name: "LEGO", note: "Imagination in pieces; building as play made the Creator archetype into a children's medium.", source: MP },
      { name: "Adobe", note: "The substrate of nearly all modern making — the Creator's infrastructure.", source: SECONDARY },
      { name: "Crayola", note: "Color as childhood's first creative act — Creator archetype introduced to humans before literacy.", source: SECONDARY },
    ],
    cultural: [
      { name: "Willy Wonka", medium: "Literature / Film", note: "The eccentric maker guarding a factory of dreams — the Creator as seductive, erratic, and faintly terrifying.", source: SECONDARY },
      { name: "Victor Frankenstein", medium: "Literature (Shelley)", note: "Creation severed from care — the Creator's shadow, the canonical warning.", source: P91 },
      { name: "Geppetto", medium: "Literature (Collodi)", note: "The craftsman who loved his work into life — Creator as father to his own invention.", source: P91 },
      { name: "Dr. Dillamond / Elphaba", medium: "Literature / Theatre (Wicked)", note: "The Creator as dissenter — making meaning against the regime's official script.", source: SECONDARY },
      { name: "Howard Roark", medium: "Literature (Rand, The Fountainhead)", note: "Ayn Rand's Creator pushed to ideological extremity — the maker who would rather destroy his building than see it corrupted.", source: SECONDARY },
    ],
    historical: [
      { name: "Steve Jobs", note: "Obsessive taste as product philosophy — the Creator who insisted the insides of the hardware look beautiful too.", source: SECONDARY },
      { name: "Frida Kahlo", note: "Pain rendered as iconography — the Creator who made her own body and biography the primary material.", source: SECONDARY },
      { name: "Leonardo da Vinci", note: "Notebooks across anatomy, hydraulics, painting, engineering — the Renaissance Creator as unified category.", source: P91 },
    ],
  },

  jester: {
    brands: [
      { name: "M&M's", note: "Anthropomorphic candy, self-aware snack — the Jester archetype delivered in thirty-second units since 1954.", source: MP },
      { name: "Old Spice (Isaiah Mustafa campaign)", note: "Absurdist masculinity as marketing coup — Jester advertising treated by industry as a cultural reset.", source: SECONDARY },
      { name: "Ben & Jerry's", note: "Playful flavor names fronting earnest politics — the Jester as cover for an activist brand posture.", source: MP },
      { name: "Skittles", note: "'Taste the rainbow' — nonsense as joy, surrealism as positioning.", source: SECONDARY },
    ],
    cultural: [
      { name: "Deadpool", medium: "Film / Comics", note: "The fourth-wall-breaking trickster antihero — superhero genre metabolized by its own Jester.", source: SECONDARY },
      { name: "Bugs Bunny", medium: "Animation", note: "The eternal American wit — trickster descended from Brer Rabbit, sharpened by the Warner Bros. unit.", source: P91 },
      { name: "Falstaff", medium: "Literature (Shakespeare)", note: "Shakespeare's holy fool — wisdom in drunkenness, the Jester whose rejection by the new king is one of the language's cruel moments.", source: P91 },
      { name: "The Trickster (Hermes, Coyote, Anansi)", medium: "Myth", note: "The cross-cultural template — the Jester as divine disruption in Greek, Indigenous American, and West African traditions.", source: P91 },
      { name: "Groucho Marx", medium: "Film", note: "Duck Soup as the Jester's assault on the dignity of statecraft — vaudeville sharpened into political satire.", source: SECONDARY },
    ],
    historical: [
      { name: "Robin Williams", note: "Manic generosity as comic form; his late dramatic work exposed the grief the act was built to survive.", source: SECONDARY },
      { name: "Richard Pryor", note: "Truth-telling in the form of a punchline — the Jester as confessional, autobiographical, dangerous.", source: SECONDARY },
      { name: "Lucille Ball", note: "I Love Lucy as slapstick the whole country watched simultaneously — the Jester as mass-cultural institution.", source: SECONDARY },
    ],
  },

  sage: {
    brands: [
      { name: "Google ('Organize the world's information')", note: "Mission statement as Sage archetype declaration — knowledge as organizable universal.", source: MP },
      { name: "The New York Times", note: "'All the news that's fit to print' — the Sage brand as editorial authority.", source: MP },
      { name: "BBC", note: "Reithian public-service knowledge at global scale — 'inform, educate, entertain' in that order.", source: SECONDARY },
      { name: "Harvard", note: "Veritas — the institutional Sage, four centuries old and still brandable.", source: SECONDARY },
    ],
    cultural: [
      { name: "Gandalf", medium: "Literature (Tolkien)", note: "The wise one who walks among the small — the Sage who knows when to withhold what he knows.", source: SECONDARY },
      { name: "Yoda", medium: "Film", note: "Knowledge compressed to paradox and inverted syntax — the Sage stylized as cognitive exercise.", source: SECONDARY },
      { name: "Hermione Granger", medium: "Literature (Rowling)", note: "Scholarship as heroism — the Sage who reads ahead and is always right.", source: SECONDARY },
      { name: "Sherlock Holmes", medium: "Literature (Doyle)", note: "The Sage as deductive method personified — knowledge as performance for a baffled Watson and reader.", source: P91 },
      { name: "Tiresias", medium: "Myth", note: "The blind prophet of Thebes — the Sage whose knowledge is inseparable from the loss of sight.", source: P91 },
    ],
    historical: [
      { name: "Carl Sagan", note: "Cosmos treated astrophysics as public literacy — the Sage as television teacher of the species.", source: SECONDARY },
      { name: "Maya Angelou", note: "Memoir and poetry as wisdom literature — the Sage who speaks autobiographically to an entire culture.", source: SECONDARY },
      { name: "Socrates", note: "The Athenian Sage whose method is the founding gesture of Western philosophy — wisdom as knowing that you do not know.", source: P91 },
    ],
  },

  magician: {
    brands: [
      { name: "Disney (theme parks)", note: "'Where dreams come true' — transformation as product. Mark & Pearson's core Magician case study.", source: MP },
      { name: "Tesla", note: "The physics of the future, made driveable — Magician brand by reputation of its founder-figure more than its specs.", source: SECONDARY },
      { name: "MAC Cosmetics", note: "Transformation applied directly to the face — the Magician's promise at cosmetic-counter price.", source: SECONDARY },
      { name: "Dyson", note: "Engineering presented as if it were sorcery — the Magician as industrial design register.", source: SECONDARY },
    ],
    cultural: [
      { name: "Merlin", medium: "Myth (Arthurian)", note: "The archetypal wizard-advisor to power — Magician as the shadow-consort of the King.", source: P91 },
      { name: "Prospero", medium: "Literature (Shakespeare, The Tempest)", note: "Shakespeare's sovereign-magician on the island — the Magician's final act is drowning the book.", source: P91 },
      { name: "Morpheus", medium: "Film (The Matrix)", note: "The initiator who offers the red pill — Magician as threshold-guardian for the audience's metaphysical shock.", source: SECONDARY },
      { name: "Dr. Strange", medium: "Film / Comics", note: "The surgeon-turned-sorcerer — Magician as transformation via destruction of the expert self.", source: SECONDARY },
      { name: "Circe", medium: "Myth / Literature (Miller)", note: "The witch of Aiaia — Madeline Miller's retelling made the shadow-Magician into a central first-person consciousness.", source: SECONDARY },
    ],
    historical: [
      { name: "Carl Jung", note: "Psyche's cartographer — the Magician who drew the first credible map of the unconscious; patron figure of this whole system.", source: SECONDARY },
      { name: "Nikola Tesla", note: "Electricity wielded as if it were alive — the Magician whose public persona outran his engineering career.", source: SECONDARY },
      { name: "Milton Erickson", note: "Clinical hypnosis reframed as conversational therapy — the Magician as subtle practitioner of indirect suggestion.", source: SECONDARY },
    ],
  },

  ruler: {
    brands: [
      { name: "Mercedes-Benz", note: "'The best or nothing' — sovereign standard as the explicit brand claim.", source: MP },
      { name: "Rolex", note: "Authority worn on the wrist — the Ruler archetype as timepiece.", source: MP },
      { name: "American Express (Black / Centurion)", note: "'Membership has its privileges' — the Ruler as tiered belonging.", source: MP },
      { name: "Microsoft", note: "The platform that runs the enterprise world — Ruler not by taste but by installed base.", source: SECONDARY },
    ],
    cultural: [
      { name: "Aragorn", medium: "Literature / Film (Tolkien)", note: "The reluctant king matured into his crown — the Ruler who had to earn a hereditary claim.", source: SECONDARY },
      { name: "T'Challa", medium: "Film (Black Panther)", note: "Sovereignty in service of the people, not the throne — the Ruler archetype pressed against colonial history.", source: SECONDARY },
      { name: "Miranda Priestly", medium: "Film (The Devil Wears Prada)", note: "Fashion's tyrant — the Ruler's shadow made couture, charming and contemptuous in alternation.", source: SECONDARY },
      { name: "Cersei Lannister", medium: "Television (Game of Thrones)", note: "The Ruler whose fear of losing the throne becomes the engine of everything she loses.", source: SECONDARY },
      { name: "King Lear", medium: "Literature (Shakespeare)", note: "The Ruler who tests love like a trade deal and loses the kingdom, his daughters, and his mind.", source: P91 },
    ],
    historical: [
      { name: "Queen Elizabeth II", note: "Duty as identity; seventy years of treating the throne as a covenant rather than a prize.", source: SECONDARY },
      { name: "Nelson Mandela", note: "Sovereign forgiveness as political act — the Ruler whose authority was moral before it was constitutional.", source: SECONDARY },
      { name: "Augustus", note: "The Roman Ruler who wrote the template — republic converted to principate and then naturalized.", source: P91 },
    ],
  },
};

export function getJungianExemplars(slug: string): JungianExemplars | undefined {
  return JUNGIAN_EXEMPLARS[slug];
}
