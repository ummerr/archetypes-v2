import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// MBTI exemplars. Unlike the other systems on this site, reliable first-party
// MBTI attributions for specific celebrities are rare — the Myers & Briggs
// Foundation itself discourages public typing. David Keirsey's Please
// Understand Me II (1998) does assign historical figures to the four
// temperaments (SJ Guardian, SP Artisan, NF Idealist, NT Rational), and Dario
// Nardi's Neuroscience of Personality (2011) discusses cognitive-function
// dynamics. Beyond those, the attributions below are drawn from widely-echoed
// MBTI-community typings — useful as illustrations of the cognitive stack in
// action, not as diagnoses. We flag the weakest attributions as "disputed."
// Fictional figures are generally a firmer register, since writers tend to
// build coherent cognitive profiles into their characters.

const KEIRSEY = "Keirsey 1998 (temperament level)";
const NARDI = "Nardi 2011";
const COMMUNITY = "common MBTI community typing";
const DISPUTED = "disputed; see MBTI community sources";
const FICTIONAL = "fictional illustration of the cognitive stack";

export const MBTI_EXEMPLARS: Record<string, ExemplarSet> = {
  intj: {
    cultural: [
      { name: "Hannibal Lecter", medium: "Literature / Film", note: "Ni foresight in service of an unsparing plan; Te execution without flinch.", source: FICTIONAL },
      { name: "Thomas Shelby", medium: "Television (Peaky Blinders)", note: "Sees three moves out; organizes the visible world to meet it.", source: FICTIONAL },
      { name: "Stewie Griffin", medium: "Animation (Family Guy)", note: "Comic-exaggerated INTJ — the toddler with the master plan.", source: FICTIONAL },
      { name: "Lisbeth Salander", medium: "Literature / Film", note: "Ferocious singular vision — the system solved from outside.", source: FICTIONAL },
      { name: "Gandalf (administrative mode)", medium: "Literature (Tolkien)", note: "The long-range strategist of the Free Peoples — Ni in wizard register.", source: FICTIONAL },
    ],
    historical: [
      { name: "Friedrich Nietzsche", note: "Singular philosophical vision executed with monastic isolation.", source: COMMUNITY },
      { name: "Elon Musk", note: "Compresses a complicated future into an unbroken line of cause and effect.", source: DISPUTED },
      { name: "Isaac Newton", note: "The Ni/Te profile rendered as seventeenth-century natural philosophy — years alone with the Principia's math.", source: COMMUNITY },
      { name: "Ayn Rand", note: "Singular ideological construction carried out with INTJ's characteristic indifference to consensus.", source: COMMUNITY },
    ],
  },

  intp: {
    cultural: [
      { name: "L", medium: "Anime (Death Note)", note: "Ti-dom detective — pure structural reasoning tested against a shifting puzzle.", source: FICTIONAL },
      { name: "Gil Grissom", medium: "Television (CSI)", note: "The patient theorizer who lets the evidence organize itself.", source: FICTIONAL },
      { name: "Rust Cohle", medium: "Television (True Detective S1)", note: "Speculative cartographer of ideas, chain-smoking in the philosophy.", source: FICTIONAL },
      { name: "Walter Bishop", medium: "Television (Fringe)", note: "Scattered, obsessive, theoretical — the INTP laboratory in a body.", source: FICTIONAL },
      { name: "Abed Nadir", medium: "Television (Community)", note: "Ti meta-analysis of genre itself — INTP as film-school consciousness.", source: FICTIONAL },
    ],
    historical: [
      { name: "Albert Einstein", note: "Keirsey's Rational exemplar — thought experiments as method, the architecture of the universe felt by structural instinct.", source: KEIRSEY },
      { name: "Charles Darwin", note: "Twenty years of quiet structural pattern-finding before publishing Origin — Keirsey Rational.", source: KEIRSEY },
      { name: "René Descartes", note: "Cogito — rebuilt the world from a single consistent axiom.", source: COMMUNITY },
      { name: "Blaise Pascal", note: "Mathematician-theologian whose Pensées work by Ti under Fe pressure — the INTP-mystic hybrid.", source: COMMUNITY },
    ],
  },

  entj: {
    cultural: [
      { name: "Miranda Priestly", medium: "Film (The Devil Wears Prada)", note: "Te-dom command of a complex system — tolerates no slack in the line.", source: FICTIONAL },
      { name: "Tywin Lannister", medium: "Literature / TV (Game of Thrones)", note: "Strategy at the scale of a dynasty; every tool deployed in service of the plan.", source: FICTIONAL },
      { name: "Claire Underwood", medium: "Television (House of Cards)", note: "Cool long-range planning executed at glacial pace and fatal precision.", source: FICTIONAL },
      { name: "Harvey Specter", medium: "Television (Suits)", note: "Commander in the boardroom — Ni strategy through Te delivery.", source: FICTIONAL },
      { name: "Cersei Lannister (competent phase)", medium: "Literature / TV", note: "The ENTJ shadow — strategic dominance untethered by Fi, which becomes the arc's tragedy.", source: FICTIONAL },
    ],
    historical: [
      { name: "Margaret Thatcher", note: "'The Iron Lady' — systems-level authority carried with no apology.", source: COMMUNITY },
      { name: "Steve Jobs", note: "Commanded taste and logistics as if they were the same discipline.", source: DISPUTED },
      { name: "Julius Caesar", note: "Keirsey's Rational-Fieldmarshal prototype — the template of the strategic commander.", source: KEIRSEY },
      { name: "Napoleon Bonaparte", note: "Keirsey Rational — logistics and strategy fused at continental scale.", source: KEIRSEY },
    ],
  },

  entp: {
    cultural: [
      { name: "Tyrion Lannister", medium: "Literature / TV", note: "Ne/Ti provocateur who wins rooms with wit and shakes dogmas for fun.", source: FICTIONAL },
      { name: "The Joker (Heath Ledger)", medium: "Film (The Dark Knight)", note: "Ne in its dark mode — an agent of chaos testing every structure to its collapse.", source: FICTIONAL },
      { name: "Tony Stark", medium: "Film (Marvel)", note: "Devil's-advocate inventor — thinks best when provoked.", source: FICTIONAL },
      { name: "Miles Morales", medium: "Film / Comics", note: "Improviser who talks his way into the right answer en route.", source: FICTIONAL },
      { name: "Jack Sparrow", medium: "Film", note: "Ne improvisation as survival strategy — every confrontation turned sideways.", source: FICTIONAL },
    ],
    historical: [
      { name: "Benjamin Franklin", note: "Experimenter, diplomat, aphorist — the polymath ENTP in founding-father form.", source: COMMUNITY },
      { name: "Richard Feynman", note: "Playful structural thinker who refused to stay in a single frame.", source: COMMUNITY },
      { name: "Socrates", note: "The original gadfly — an entire philosophy built out of provocative questions.", source: COMMUNITY },
      { name: "Voltaire", note: "Enlightenment satirist — Ne wit deployed across fifty years against every institutional target in Europe.", source: COMMUNITY },
    ],
  },

  infj: {
    cultural: [
      { name: "Jean Grey / Phoenix", medium: "Film / Comics", note: "Ni/Fe — the compassionate seer carrying more than she can hold.", source: FICTIONAL },
      { name: "Aragorn", medium: "Literature / Film (Tolkien)", note: "Reticent, long-sighted, attuned to the suffering of the realm he is called to serve.", source: FICTIONAL },
      { name: "Will Graham", medium: "Television (Hannibal)", note: "Empathic Ni — reads others down to the marrow, pays for it.", source: FICTIONAL },
      { name: "Atticus Finch", medium: "Literature (Lee)", note: "Quiet moral vision — Fe discipline in a hostile room.", source: FICTIONAL },
      { name: "Galadriel", medium: "Literature / Film (Tolkien)", note: "The Ni seer at elvish scale — sees the turning of ages and carries the weight of it.", source: FICTIONAL },
    ],
    historical: [
      { name: "Carl Jung", note: "The archetypal INFJ in MBTI lore — symbolic inner life rendered as public cartography. Myers herself drew on Jung.", source: COMMUNITY },
      { name: "Martin Luther King Jr.", note: "Keirsey Idealist — Ni vision of a just future delivered through Fe oratory.", source: KEIRSEY },
      { name: "Fyodor Dostoevsky", note: "Interior visions of compassion and catastrophe rendered into fiction.", source: COMMUNITY },
      { name: "Mahatma Gandhi", note: "Keirsey Idealist — moral vision executed with ascetic Fe discipline at political scale.", source: KEIRSEY },
    ],
  },

  infp: {
    cultural: [
      { name: "Frodo Baggins", medium: "Literature / Film (Tolkien)", note: "Fi-dom carrier of the heavy thing — values held against the world's weight.", source: FICTIONAL },
      { name: "Amélie Poulain", medium: "Film", note: "Rich interior turned outward as small kindnesses — the poet of felt life.", source: FICTIONAL },
      { name: "Anne Shirley", medium: "Literature (Montgomery)", note: "A romantic imagination large enough to reshape the house she lives in.", source: FICTIONAL },
      { name: "Fleabag", medium: "Television", note: "Fi laid bare — values in painful, witty collision with reality.", source: FICTIONAL },
      { name: "Luna Lovegood", medium: "Literature (Rowling)", note: "The INFP's unembarrassed interior worn as eccentric visibility.", source: FICTIONAL },
    ],
    historical: [
      { name: "J.R.R. Tolkien", note: "Interior myth-world built across a life — Fi made topographical.", source: COMMUNITY },
      { name: "Virginia Woolf", note: "The interior river itself made into method and prose.", source: COMMUNITY },
      { name: "Søren Kierkegaard", note: "Fi as philosophy — 'the subjective truth, absolutely, of the single individual.'", source: COMMUNITY },
      { name: "Vincent van Gogh", note: "Keirsey Idealist — the interior palette made external in letters and oil paint.", source: KEIRSEY },
    ],
  },

  enfj: {
    cultural: [
      { name: "Ted Lasso", medium: "Television", note: "Fe-dom leader who tends each soul in the locker room.", source: FICTIONAL },
      { name: "Leslie Knope", medium: "Television (Parks & Rec)", note: "The visionary mentor who summons a town to its better self.", source: FICTIONAL },
      { name: "Professor X", medium: "Film / Comics", note: "Pedagogue-mentor — gathers others around a Ni-held future.", source: FICTIONAL },
      { name: "Coach Ken Carter", medium: "Film", note: "Holds the team to a standard they discover they already believe in.", source: FICTIONAL },
      { name: "Dumbledore", medium: "Literature (Rowling)", note: "Fe mentor at headmaster scale — every conversation aimed at drawing out the student's own better self.", source: FICTIONAL },
    ],
    historical: [
      { name: "Barack Obama", note: "Fe/Ni — the orator who summoned a generation toward a future he could see.", source: COMMUNITY },
      { name: "Oprah Winfrey", note: "A career built on harmonizing rooms and surfacing each person's voice.", source: COMMUNITY },
      { name: "Maya Angelou", note: "Teacher-priestess — wisdom addressed to the listener by name.", source: COMMUNITY },
      { name: "Nelson Mandela", note: "Keirsey Idealist — decades of Fe discipline turned into post-apartheid reconciliation statecraft.", source: KEIRSEY },
    ],
  },

  enfp: {
    cultural: [
      { name: "Michael Scott", medium: "Television (The Office)", note: "Ne/Fi in comic form — every possibility chased, every feeling aired.", source: FICTIONAL },
      { name: "Jack Sparrow", medium: "Film", note: "Improvisational charm — the horizon is always more interesting than the plan.", source: FICTIONAL },
      { name: "Anne Shirley (at full gust)", medium: "Literature", note: "Possibility and feeling braided into ceaseless discovery.", source: FICTIONAL },
      { name: "Moana", medium: "Film", note: "The called adventurer who follows the pull past the reef.", source: FICTIONAL },
      { name: "Peter Quill / Star-Lord", medium: "Film (Marvel)", note: "Ne enthusiasm, Fi loyalty, and a Se appetite for the adventure — the ENFP hero archetype.", source: FICTIONAL },
    ],
    historical: [
      { name: "Robin Williams", note: "Ne firing in every direction; Fi beneath it asking the serious questions.", source: COMMUNITY },
      { name: "Walt Disney", note: "Possibility-seeker who turned it into a kingdom.", source: COMMUNITY },
      { name: "Robert Downey Jr.", note: "Live-wire improviser whose charisma is Ne in performance.", source: DISPUTED },
      { name: "Mark Twain", note: "Ne restlessness plus Fi moral engine — Huckleberry Finn and the lecture circuit as two halves of an ENFP career.", source: COMMUNITY },
    ],
  },

  istj: {
    cultural: [
      { name: "Eddard Stark", medium: "Literature / TV (Game of Thrones)", note: "Si/Te — the keeper of the old code, loyal past his own ruin.", source: FICTIONAL },
      { name: "Hermione Granger (early)", medium: "Literature (Rowling)", note: "Rules memorized, procedure trusted, homework done before dinner.", source: FICTIONAL },
      { name: "Captain America", medium: "Film", note: "Duty, tradition, and a steady hand — the reliable citizen in uniform.", source: FICTIONAL },
      { name: "Dana Scully", medium: "Television (X-Files)", note: "Evidence-first procedural thinker — the grounded partner to a flying one.", source: FICTIONAL },
      { name: "Sergeant Joe Friday (Dragnet)", medium: "Television", note: "'Just the facts' — the ISTJ as genre-founding procedural voice.", source: FICTIONAL },
    ],
    historical: [
      { name: "George Washington", note: "Keirsey Guardian — duty as method, the fitness of one man to hold a fragile institution.", source: KEIRSEY },
      { name: "Queen Elizabeth II", note: "Keirsey Guardian — seventy years of Si/Te, standard, schedule, service.", source: KEIRSEY },
      { name: "Warren Buffett", note: "Patience, tradition, known-quantity decisions compounded across decades.", source: COMMUNITY },
      { name: "Harry Truman", note: "Keirsey Guardian — haberdasher-president whose plain duty-discipline carried the early Cold War.", source: KEIRSEY },
    ],
  },

  isfj: {
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature / Film (Tolkien)", note: "Si/Fe — the quiet backbone; loyalty as a form of strength.", source: FICTIONAL },
      { name: "Molly Weasley (on watch)", medium: "Literature (Rowling)", note: "Home kept warm against the dark — care expressed in a thousand small acts.", source: FICTIONAL },
      { name: "Dr. Watson", medium: "Literature (Doyle)", note: "The steady companion whose memory keeps Holmes' genius available.", source: FICTIONAL },
      { name: "Neville Longbottom", medium: "Literature (Rowling)", note: "Loyal protector who grows into quiet, undeniable courage.", source: FICTIONAL },
      { name: "Steve Rogers (off-duty)", medium: "Film", note: "The ISFJ register of Cap — remembering names, sketching in the notebook, holding the team.", source: FICTIONAL },
    ],
    historical: [
      { name: "Mother Teresa", note: "Devoted service to particular people, one at a time, for decades.", source: COMMUNITY },
      { name: "Rosa Parks", note: "Long-practiced dignity concentrated into a single, patient refusal.", source: COMMUNITY },
      { name: "Fred Rogers", note: "Care as craft — the same small ritual enacted, precisely, for years.", source: COMMUNITY },
      { name: "Queen Mary I (or Mary of Teck)", note: "Keirsey Guardian-Protector register — duty-centered sovereignty in quieter Victorian-Edwardian form.", source: KEIRSEY },
    ],
  },

  estj: {
    cultural: [
      { name: "Hermione Granger (as leader)", medium: "Literature (Rowling)", note: "Te/Si — organizes the group, enforces the plan, gets the homework turned in.", source: FICTIONAL },
      { name: "Miranda Bailey", medium: "Television (Grey's Anatomy)", note: "Hospital-floor commander — the order she imposes is the order the floor runs on.", source: FICTIONAL },
      { name: "Claire Dunphy", medium: "Television (Modern Family)", note: "The household run like a well-audited firm.", source: FICTIONAL },
      { name: "Boromir", medium: "Literature / Film (Tolkien)", note: "Institutional Te — the captain of Gondor who trusts the known structure.", source: FICTIONAL },
      { name: "Leslie Knope (administrative mode)", medium: "Television", note: "The ESTJ shadow of her usual ENFJ — binders, flowcharts, subcommittees.", source: FICTIONAL },
    ],
    historical: [
      { name: "Lyndon B. Johnson", note: "Master of legislative machinery — executive will made granular.", source: COMMUNITY },
      { name: "Colin Powell", note: "Chain of command as ethical instrument.", source: COMMUNITY },
      { name: "Martha Stewart", note: "Domestic life audited, standardized, and scaled.", source: COMMUNITY },
      { name: "Margaret Thatcher", note: "Keirsey Guardian register — the ESTJ's organizational discipline applied at state scale.", source: KEIRSEY },
    ],
  },

  esfj: {
    cultural: [
      { name: "Monica Geller", medium: "Television (Friends)", note: "Fe/Si host who tracks everyone's preferences and runs the group's social engine.", source: FICTIONAL },
      { name: "Molly Weasley", medium: "Literature (Rowling)", note: "The archetypal caretaking matriarch — tradition kept, the table full.", source: FICTIONAL },
      { name: "Captain Georgiou (early Discovery)", medium: "Television (Star Trek)", note: "The ESFJ as bridge-captain — crew welfare treated as command priority.", source: FICTIONAL },
      { name: "Dolores Umbridge", medium: "Literature (Rowling)", note: "Fe in its authoritarian mode — propriety weaponized. The ESFJ shadow.", source: FICTIONAL },
      { name: "Leslie Knope (group-harmony register)", medium: "Television", note: "Waffles, parties, Galentine's Day — ESFJ ritual-keeping as love language.", source: FICTIONAL },
    ],
    historical: [
      { name: "Taylor Swift", note: "Fe at scale — parasocial warmth and Si tradition-keeping across a career.", source: DISPUTED },
      { name: "Bill Clinton", note: "Remembers every name; works the room as a moral instrument.", source: COMMUNITY },
      { name: "Barbara Walters", note: "Host as archetype — warmth, preparation, social memory.", source: COMMUNITY },
      { name: "Jennifer Garner", note: "The ESFJ in public-figure register — warmth, family-orientation, parasocial familiarity.", source: DISPUTED },
    ],
  },

  istp: {
    cultural: [
      { name: "James Bond", medium: "Film / Literature", note: "Se/Ti — a calm, mechanical operator in a world of moving parts.", source: FICTIONAL },
      { name: "Arya Stark", medium: "Literature / TV", note: "Physical precision with ruthless inner logic — a sword with a calendar.", source: FICTIONAL },
      { name: "Wolverine", medium: "Film / Comics", note: "Laconic master of violence — thinks with the body.", source: FICTIONAL },
      { name: "Mac", medium: "Television (It's Always Sunny)", note: "Comic ISTP — the hands-on problem-solver of the pack.", source: FICTIONAL },
      { name: "Ellen Ripley", medium: "Film (Alien)", note: "The ISTP under survival pressure — Se/Ti competence against a non-human threat.", source: FICTIONAL },
    ],
    historical: [
      { name: "Bear Grylls", note: "The body-first problem-solver in every new terrain.", source: COMMUNITY },
      { name: "Clint Eastwood", note: "The laconic craftsman — minimal words, maximal fit.", source: COMMUNITY },
      { name: "Frank Gehry", note: "Architect who thinks with his hands, then diagrams afterward.", source: COMMUNITY },
      { name: "Buster Keaton", note: "Keirsey Artisan — the body as thinking instrument, comedy as physics problem.", source: KEIRSEY },
    ],
  },

  isfp: {
    cultural: [
      { name: "Frodo on the stairs of Cirith Ungol", medium: "Literature / Film (Tolkien)", note: "Fi/Se — sensory endurance carrying an unnameable inner standard.", source: FICTIONAL },
      { name: "Arwen", medium: "Literature / Film (Tolkien)", note: "Quiet, devoted, choosing a mortal love against the grain of her people.", source: FICTIONAL },
      { name: "Eleven", medium: "Television (Stranger Things)", note: "Guileless feeling embodied — the Fi moral compass under pressure.", source: FICTIONAL },
      { name: "Amélie (sensory scenes)", medium: "Film", note: "The texture of plums, spoons, cobblestones — aesthetic attention as a life.", source: FICTIONAL },
      { name: "Aang", medium: "Animation (Avatar: The Last Airbender)", note: "The ISFP under world-saving pressure — Fi pacifism maintained against political necessity.", source: FICTIONAL },
    ],
    historical: [
      { name: "Frida Kahlo", note: "The body, the feeling, the painting — Fi/Se made autobiographical.", source: COMMUNITY },
      { name: "Michael Jackson", note: "Inner world expressed through the body — performance as soul.", source: DISPUTED },
      { name: "Marilyn Monroe", note: "Radiant surface over an aching Fi interior.", source: DISPUTED },
      { name: "Bob Dylan (early)", note: "Keirsey Artisan — Fi conviction channeled through Se performance in the folk and early rock era.", source: KEIRSEY },
    ],
  },

  estp: {
    cultural: [
      { name: "Han Solo", medium: "Film", note: "Se-dom operator — reads the room, cuts the deal, flies by feel.", source: FICTIONAL },
      { name: "James Bond (field mode)", medium: "Film", note: "Tactical improviser who thrives where plans fail.", source: FICTIONAL },
      { name: "Tony Soprano", medium: "Television", note: "Present-tense dominance with a dangerously underdeveloped interior.", source: FICTIONAL },
      { name: "Ferris Bueller", medium: "Film", note: "Ne-tinted ESTP — the room always bends around his attention.", source: FICTIONAL },
      { name: "Peggy Bundy", medium: "Television (Married with Children)", note: "Comic-exaggerated ESTP — no plan survives contact with the present moment.", source: FICTIONAL },
    ],
    historical: [
      { name: "Theodore Roosevelt", note: "Keirsey Artisan — action, charge, adventure, the Rough Rider in permanent motion.", source: KEIRSEY },
      { name: "Ernest Hemingway", note: "Keirsey Artisan — Se appetite turned into prose; lived from the body outward.", source: KEIRSEY },
      { name: "Donald Trump", note: "Extreme Se — reads the room, works the moment, never leaves the present tense.", source: DISPUTED },
      { name: "Winston Churchill", note: "The ESTP under wartime pressure — Se tactical reactivity carrying a whole country for five years.", source: COMMUNITY },
    ],
  },

  esfp: {
    cultural: [
      { name: "Satine", medium: "Film (Moulin Rouge)", note: "The stage-born performer — every moment played to the farthest row.", source: FICTIONAL },
      { name: "Peter Quill / Star-Lord", medium: "Film (Marvel)", note: "Live-wire improviser who holds the team with charm and music.", source: FICTIONAL },
      { name: "Rose", medium: "Film (Titanic)", note: "Se appetite for life breaking out of its engagement-shaped container.", source: FICTIONAL },
      { name: "Phoebe Buffay", medium: "Television (Friends)", note: "Se/Fi — live in the moment, sing whatever comes, mean every word of it.", source: FICTIONAL },
      { name: "Maui", medium: "Film (Moana)", note: "Se showmanship with a Fi core — the ESFP as demigod.", source: FICTIONAL },
    ],
    historical: [
      { name: "Elvis Presley", note: "Keirsey Artisan — the body on stage, performer as incarnate presence.", source: KEIRSEY },
      { name: "Marilyn Monroe (public)", note: "Luminous present-tense charisma.", source: DISPUTED },
      { name: "Jamie Oliver", note: "Energetic, tactile enthusiasm turned into a career.", source: COMMUNITY },
      { name: "Dolly Parton", note: "Keirsey Artisan register — Se performance joined to an intact Fi generosity that built a career.", source: KEIRSEY },
    ],
  },
};

export function getMbtiExemplars(slug: string): ExemplarSet | undefined {
  return MBTI_EXEMPLARS[slug];
}
