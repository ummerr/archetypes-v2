import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// MBTI exemplars. Fictional figures chosen to illustrate the cognitive stack
// in action rather than to assert a definitive type assignment. Historical
// figures drawn from widely-accepted community typings; treat all as suggestive.

export const MBTI_EXEMPLARS: Record<string, ExemplarSet> = {
  intj: {
    cultural: [
      { name: "Hannibal Lecter", medium: "Literature / Film", note: "Ni foresight in service of an unsparing plan; Te execution without flinch." },
      { name: "Thomas Shelby (Peaky Blinders)", medium: "Television", note: "Sees three moves out; organizes the visible world to meet it." },
      { name: "Stewie Griffin", medium: "Animation", note: "Comic-exaggerated INTJ — the toddler with the master plan." },
      { name: "Lisbeth Salander", medium: "Literature / Film", note: "Ferocious singular vision; the system solved from outside." },
    ],
    historical: [
      { name: "Friedrich Nietzsche", note: "Singular philosophical vision executed with monastic isolation." },
      { name: "Elon Musk", note: "Compresses a complicated future into an unbroken line of cause and effect." },
      { name: "Hillary Clinton", note: "Policy mind operating on a twenty-year horizon." },
    ],
  },

  intp: {
    cultural: [
      { name: "L (Death Note)", medium: "Anime", note: "Ti-dom detective; pure structural reasoning tested against a shifting puzzle." },
      { name: "Gil Grissom (CSI)", medium: "Television", note: "The patient theorizer who lets the evidence organize itself." },
      { name: "Rust Cohle (True Detective S1)", medium: "Television", note: "Speculative cartographer of ideas, chain-smoking in the philosophy." },
      { name: "Walter Bishop (Fringe)", medium: "Television", note: "Scattered, obsessive, theoretical — the INTP laboratory in a body." },
    ],
    historical: [
      { name: "Albert Einstein", note: "Thought experiments as life's method; the architecture of the universe felt by instinct." },
      { name: "Charles Darwin", note: "Twenty years of quiet structural pattern-finding before the book." },
      { name: "René Descartes", note: "Cogito — rebuilt the world from a single consistent axiom." },
    ],
  },

  entj: {
    cultural: [
      { name: "Miranda Priestly", medium: "Film", note: "Te-dom command of a complex system; tolerates no slack in the line." },
      { name: "Tywin Lannister", medium: "Literature / TV", note: "Strategy at the scale of a dynasty; every tool deployed in the service of the plan." },
      { name: "Claire Underwood", medium: "Television", note: "Cool long-range planning executed at glacial pace and fatal precision." },
      { name: "Harvey Specter", medium: "Television", note: "Commander in the boardroom — Ni strategy through Te delivery." },
    ],
    historical: [
      { name: "Margaret Thatcher", note: "The Iron Lady — systems-level authority carried with no apology." },
      { name: "Steve Jobs", note: "Commanded taste and logistics as if they were the same discipline." },
      { name: "Julius Caesar", note: "The template of the strategic commander." },
    ],
  },

  entp: {
    cultural: [
      { name: "Tyrion Lannister", medium: "Literature / TV", note: "Ne/Ti provocateur who wins rooms with wit and shakes dogmas for fun." },
      { name: "The Joker (Ledger's)", medium: "Film", note: "Ne in its dark mode — an agent of chaos testing every structure to its collapse." },
      { name: "Tony Stark", medium: "Film", note: "Devil's-advocate inventor; thinks best when provoked." },
      { name: "Miles Morales", medium: "Film / Comics", note: "Improviser who talks his way into the right answer en route." },
    ],
    historical: [
      { name: "Benjamin Franklin", note: "Experimenter, diplomat, aphorist — the polymath ENTP in its founding form." },
      { name: "Richard Feynman", note: "Playful structural thinker who refused to stay in a single frame." },
      { name: "Socrates", note: "The original gadfly — an entire philosophy built out of provocative questions." },
    ],
  },

  infj: {
    cultural: [
      { name: "Jean Grey / Phoenix", medium: "Film / Comics", note: "Ni/Fe — the compassionate seer carrying more than she can hold." },
      { name: "Aragorn", medium: "Literature / Film", note: "Reticent, long-sighted, attuned to the suffering of the realm he is called to serve." },
      { name: "Will Graham (Hannibal)", medium: "Television", note: "Empathic Ni — reads others down to the marrow, pays for it." },
      { name: "Atticus Finch", medium: "Literature", note: "Quiet moral vision; Fe discipline in a hostile room." },
    ],
    historical: [
      { name: "Carl Jung", note: "The archetypal INFJ — symbolic inner life rendered as a public cartography." },
      { name: "Martin Luther King Jr.", note: "Ni vision of a just future delivered through Fe oratory." },
      { name: "Fyodor Dostoevsky", note: "Interior visions of compassion and catastrophe rendered into fiction." },
    ],
  },

  infp: {
    cultural: [
      { name: "Frodo Baggins", medium: "Literature / Film", note: "Fi-dom carrier of the heavy thing; values held against the world's weight." },
      { name: "Amélie Poulain", medium: "Film", note: "Rich interior turned outward as small kindnesses; the poet of felt life." },
      { name: "Anne Shirley", medium: "Literature", note: "A romantic imagination large enough to reshape the house she lives in." },
      { name: "Fleabag", medium: "Television", note: "Fi laid bare — values in painful, witty collision with reality." },
    ],
    historical: [
      { name: "J.R.R. Tolkien", note: "Interior myth-world built across a life; Fi made topographical." },
      { name: "Virginia Woolf", note: "The interior river itself made into method and prose." },
      { name: "Søren Kierkegaard", note: "Fi as philosophy — the subjective truth, absolutely, of the single individual." },
    ],
  },

  enfj: {
    cultural: [
      { name: "Ted Lasso", medium: "Television", note: "Fe-dom leader who tends each soul in the locker room." },
      { name: "Leslie Knope", medium: "Television", note: "The visionary mentor who summons a town to its better self." },
      { name: "Professor X", medium: "Film / Comics", note: "Pedagogue-mentor; gathers others around a Ni-held future." },
      { name: "Coach Carter", medium: "Film", note: "Holds the team to a standard they discover they already believe in." },
    ],
    historical: [
      { name: "Barack Obama", note: "Fe/Ni — the orator who summoned a generation toward a future he could see." },
      { name: "Oprah Winfrey", note: "A career built on harmonizing rooms and surfacing each person's voice." },
      { name: "Maya Angelou", note: "Teacher-priestess — wisdom addressed to the listener by name." },
    ],
  },

  enfp: {
    cultural: [
      { name: "Michael Scott", medium: "Television", note: "Ne/Fi in comic form — every possibility chased, every feeling aired." },
      { name: "Jack Sparrow", medium: "Film", note: "Improvisational charm; the horizon is always more interesting than the plan." },
      { name: "Anne Shirley (at full gust)", medium: "Literature", note: "Possibility and feeling braided into ceaseless discovery." },
      { name: "Moana", medium: "Film", note: "The called adventurer who follows the pull past the reef." },
    ],
    historical: [
      { name: "Robin Williams", note: "Ne firing in every direction; Fi beneath it asking the serious questions." },
      { name: "Walt Disney", note: "Possibility-seeker who turned it into a kingdom." },
      { name: "Robert Downey Jr.", note: "Live-wire improviser whose charisma is Ne in performance." },
    ],
  },

  istj: {
    cultural: [
      { name: "Eddard Stark", medium: "Literature / TV", note: "Si/Te — the keeper of the old code, loyal past his own ruin." },
      { name: "Hermione Granger (early)", medium: "Literature", note: "Rules memorized, procedure trusted, homework done before dinner." },
      { name: "Captain America", medium: "Film", note: "Duty, tradition, and a steady hand — the reliable citizen in uniform." },
      { name: "Dana Scully", medium: "Television", note: "Evidence-first procedural thinker — the grounded partner to a flying one." },
    ],
    historical: [
      { name: "George Washington", note: "Duty as method; the fitness of one man to hold a fragile institution." },
      { name: "Queen Elizabeth II", note: "Seventy years of Si/Te — standard, schedule, service." },
      { name: "Warren Buffett", note: "Patience, tradition, known-quantity decisions compounded across decades." },
    ],
  },

  isfj: {
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature / Film", note: "Si/Fe — the quiet backbone; loyalty as a form of strength." },
      { name: "Molly Weasley (on watch)", medium: "Literature", note: "Home kept warm against the dark; care expressed in a thousand small acts." },
      { name: "Dr. Watson", medium: "Literature", note: "The steady companion whose memory keeps Holmes' genius available." },
      { name: "Neville Longbottom", medium: "Literature", note: "Loyal protector who grows into quiet, undeniable courage." },
    ],
    historical: [
      { name: "Mother Teresa", note: "Devoted service to particular people, one at a time, for decades." },
      { name: "Rosa Parks", note: "Long-practiced dignity concentrated into a single, patient refusal." },
      { name: "Fred Rogers", note: "Care as craft — the same small ritual enacted, precisely, for years." },
    ],
  },

  estj: {
    cultural: [
      { name: "Hermione Granger (as leader)", medium: "Literature", note: "Te/Si — organizes the group, enforces the plan, gets the homework turned in." },
      { name: "Miranda Bailey (Grey's Anatomy)", medium: "Television", note: "Hospital-floor commander; the order she imposes is the order the floor runs on." },
      { name: "Claire Dunphy", medium: "Television", note: "The household run like a well-audited firm." },
      { name: "Boromir", medium: "Literature / Film", note: "Institutional Te — the captain of Gondor who trusts the known structure." },
    ],
    historical: [
      { name: "Lyndon B. Johnson", note: "Master of legislative machinery; executive will made granular." },
      { name: "Colin Powell", note: "Chain of command as ethical instrument." },
      { name: "Martha Stewart", note: "Domestic life audited, standardized, and scaled." },
    ],
  },

  esfj: {
    cultural: [
      { name: "Monica Geller", medium: "Television", note: "Fe/Si host who tracks everyone's preferences and runs the group's social engine." },
      { name: "Molly Weasley", medium: "Literature", note: "The archetypal caretaking matriarch; tradition kept, the table full." },
      { name: "Steve Rogers (off-duty)", medium: "Film", note: "ESFJ warmth — remembers your birthday, checks you're okay, holds the group." },
      { name: "Dolores Umbridge (shadow)", medium: "Literature", note: "Fe in its authoritarian mode — propriety weaponized." },
    ],
    historical: [
      { name: "Taylor Swift", note: "Fe at scale — parasocial warmth and Si tradition-keeping across a career." },
      { name: "Bill Clinton", note: "Remembers every name; works the room as a moral instrument." },
      { name: "Barbara Walters", note: "Host as archetype — warmth, preparation, social memory." },
    ],
  },

  istp: {
    cultural: [
      { name: "James Bond", medium: "Film / Literature", note: "Se/Ti — a calm, mechanical operator in a world of moving parts." },
      { name: "Arya Stark", medium: "Literature / TV", note: "Physical precision with ruthless inner logic; a sword with a calendar." },
      { name: "Wolverine", medium: "Film / Comics", note: "Laconic master of violence; thinks with the body." },
      { name: "Mac (It's Always Sunny)", medium: "Television", note: "Comic ISTP — the hands-on problem-solver of the pack." },
    ],
    historical: [
      { name: "Bear Grylls", note: "The body-first problem-solver in every new terrain." },
      { name: "Clint Eastwood", note: "The laconic craftsman — minimal words, maximal fit." },
      { name: "Frank Gehry", note: "Architect who thinks with his hands, then diagrams afterward." },
    ],
  },

  isfp: {
    cultural: [
      { name: "Frodo (on the stairs of Cirith Ungol)", medium: "Literature / Film", note: "Fi/Se — sensory endurance carrying an unnameable inner standard." },
      { name: "Arwen", medium: "Literature / Film", note: "Quiet, devoted, choosing a mortal love against the grain of her people." },
      { name: "Eleven (Stranger Things)", medium: "Television", note: "Guileless feeling embodied; the Fi moral compass under pressure." },
      { name: "Amélie (sensory scenes)", medium: "Film", note: "The texture of plums, spoons, cobblestones — aesthetic attention as a life." },
    ],
    historical: [
      { name: "Frida Kahlo", note: "The body, the feeling, the painting — Fi/Se made autobiographical." },
      { name: "Michael Jackson", note: "Inner world expressed through the body; performance as soul." },
      { name: "Marilyn Monroe", note: "Radiant surface over an aching Fi interior." },
    ],
  },

  estp: {
    cultural: [
      { name: "Han Solo", medium: "Film", note: "Se-dom operator — reads the room, cuts the deal, flies by feel." },
      { name: "James Bond (field)", medium: "Film", note: "Tactical improviser who thrives where plans fail." },
      { name: "Tony Soprano", medium: "Television", note: "Present-tense dominance with a dangerously underdeveloped interior." },
      { name: "Ferris Bueller", medium: "Film", note: "Ne-tinted ESTP — the room always bends around his attention." },
    ],
    historical: [
      { name: "Theodore Roosevelt", note: "Action, charge, adventure — the Rough Rider in permanent motion." },
      { name: "Ernest Hemingway", note: "Se appetite turned into prose; lived from the body outward." },
      { name: "Donald Trump", note: "Extreme Se — reads the room, works the moment, never leaves the present tense." },
    ],
  },

  esfp: {
    cultural: [
      { name: "Moulin Rouge's Satine", medium: "Film", note: "The stage-born performer; every moment played to the farthest row." },
      { name: "Peter Quill / Star-Lord", medium: "Film", note: "Live-wire improviser who holds the team with charm and music." },
      { name: "Rose (Titanic)", medium: "Film", note: "Se appetite for life breaking out of its engagement-shaped container." },
      { name: "Phoebe Buffay", medium: "Television", note: "Se/Fi — live in the moment, sing whatever comes, mean every word of it." },
    ],
    historical: [
      { name: "Elvis Presley", note: "The body on stage — performer as incarnate presence." },
      { name: "Marilyn Monroe (public)", note: "Luminous present-tense charisma." },
      { name: "Jamie Oliver", note: "Energetic, tactile enthusiasm turned into a career." },
    ],
  },
};

export function getMbtiExemplars(slug: string): ExemplarSet | undefined {
  return MBTI_EXEMPLARS[slug];
}
