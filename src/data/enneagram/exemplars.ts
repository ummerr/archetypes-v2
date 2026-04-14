import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Enneagram exemplars. Historical attributions lean heavily on Don Riso &
// Russ Hudson's Personality Types (1996) and The Wisdom of the Enneagram
// (1999), which close each type chapter with a list of named exemplars.
// Helen Palmer's The Enneagram (1988) is a secondary anchor. Cultural
// figures are either drawn from Riso-Hudson directly or from widely-echoed
// Enneagram community typings; treat all attributions as interpretive.

const RH = "Riso & Hudson 1996";
const RH99 = "Riso & Hudson 1999";
const PALMER = "Palmer 1988";
const COMMUNITY = "widely typed in Enneagram community sources";

export const ENNEAGRAM_EXEMPLARS: Record<string, ExemplarSet> = {
  reformer: {
    cultural: [
      { name: "Atticus Finch", medium: "Literature (Lee)", note: "The upright inner standard carried into a crooked town — the One's ethical disposition translated into a legal defense.", source: COMMUNITY },
      { name: "Hermione Granger", medium: "Literature (Rowling)", note: "The inner auditor — corrects teachers, classmates, and herself in equal measure. The One's discipline rendered as study habit.", source: COMMUNITY },
      { name: "Leslie Knope", medium: "Television (Parks & Rec)", note: "The reform impulse as civic love — every binder, every plan, the One's conviction that government can be made good.", source: COMMUNITY },
      { name: "Mary Poppins", medium: "Film", note: "'Practically perfect in every way' — the One's secret wish, spoken aloud.", source: COMMUNITY },
      { name: "Javert", medium: "Literature (Hugo, Les Misérables)", note: "The One's shadow — moral absolutism with no mercy; a lifetime of conviction defeated by a single act of grace.", source: PALMER },
    ],
    historical: [
      { name: "Mahatma Gandhi", note: "Riso-Hudson's archetypal Reformer — truth-discipline (satyagraha) applied as political method.", source: RH },
      { name: "Ruth Bader Ginsburg", note: "Decades of patient, precise correction of a flawed legal system — Reformer as institutional craft.", source: COMMUNITY },
      { name: "Confucius", note: "Named by Riso-Hudson; a whole ethical tradition founded on the rectification of names and conduct.", source: RH },
      { name: "Pope John Paul II", note: "Riso-Hudson exemplar — moral authority pressed against late-twentieth-century political regimes.", source: RH },
    ],
  },

  helper: {
    cultural: [
      { name: "Molly Weasley", medium: "Literature (Rowling)", note: "Nurture as totalizing life-project — the Helper whose love is also her weapon.", source: COMMUNITY },
      { name: "Samwise Gamgee", medium: "Literature / Film (Tolkien)", note: "The companion whose care carries the quest; the Two's self-forgetting pushed to its noblest form.", source: COMMUNITY },
      { name: "Dolores Umbridge", medium: "Literature (Rowling)", note: "The Two's shadow — helping as control, sweetness wielded as a blade, the saccharine office as instrument of cruelty.", source: COMMUNITY },
      { name: "Leo McGarry", medium: "Television (The West Wing)", note: "Serves the president's mission with a devotion that is also his identity — Helper as power-behind-the-throne.", source: COMMUNITY },
      { name: "Melanie Hamilton", medium: "Literature (Mitchell, Gone with the Wind)", note: "The Two whose goodness is so unselfconscious it disarms even Scarlett — Helper as moral center of a flawed novel.", source: PALMER },
    ],
    historical: [
      { name: "Mother Teresa", note: "Riso-Hudson's canonical Two — given over, entirely, to the needs of others.", source: RH },
      { name: "Princess Diana", note: "Riso-Hudson exemplar; warmth deployed as public vocation, touching AIDS patients when it was still culturally dangerous.", source: RH },
      { name: "Fred Rogers", note: "Named by Riso-Hudson; the Two's empathic attention scaled into a sustained public practice.", source: RH99 },
      { name: "Desmond Tutu", note: "Riso-Hudson exemplar — the Helper's warmth at the center of South Africa's Truth and Reconciliation process.", source: RH99 },
    ],
  },

  achiever: {
    cultural: [
      { name: "Don Draper", medium: "Television (Mad Men)", note: "Image as asset, asset as self — the Three whose invented biography is the entire brand.", source: COMMUNITY },
      { name: "Jay Gatsby", medium: "Literature (Fitzgerald)", note: "The Achiever's green light — success as proof one exists, reinvention as the American religion's central sacrament.", source: COMMUNITY },
      { name: "Miranda Priestly", medium: "Film (The Devil Wears Prada)", note: "Excellence weaponized — the cost of standing absolutely at the top of one's field.", source: COMMUNITY },
      { name: "Rachel Berry", medium: "Television (Glee)", note: "The Three's relentless pursuit of the spotlight rendered as high-school musical comedy.", source: COMMUNITY },
      { name: "Patrick Bateman", medium: "Literature (Ellis, American Psycho)", note: "The Three's shadow at terminal velocity — image with nothing inside it.", source: COMMUNITY },
    ],
    historical: [
      { name: "Oprah Winfrey", note: "Riso-Hudson's canonical Three — achievement as vehicle for a bigger message; the Three evolving toward the Two and Four.", source: RH99 },
      { name: "Tony Robbins", note: "Riso-Hudson exemplar; the Three archetype industrialized into a personal-development empire.", source: RH },
      { name: "Bill Clinton", note: "Riso-Hudson exemplar — the Three's charm and adaptive intelligence at presidential scale.", source: RH },
      { name: "Will Smith", note: "Riso-Hudson exemplar; reinvention across rap, sitcom, blockbuster, memoir — the Three as multi-medium brand.", source: RH99 },
    ],
  },

  individualist: {
    cultural: [
      { name: "Jay Gatsby", medium: "Literature (Fitzgerald)", note: "Read from the Four side: longing as the constant mood; the perfect thing always a little out of reach.", source: COMMUNITY },
      { name: "Rue Bennett", medium: "Television (Euphoria)", note: "The depth of feeling as both gift and wound — the Four's interior amplified by chemistry.", source: COMMUNITY },
      { name: "Holden Caulfield", medium: "Literature (Salinger)", note: "The Four as teenage first-person — aesthetic objection to 'phoniness' as identity.", source: COMMUNITY },
      { name: "Amy Winehouse (persona)", medium: "Music", note: "Torch songs from the romantic interior; beauty braided into self-harm.", source: COMMUNITY },
      { name: "Prince Hamlet", medium: "Literature (Shakespeare)", note: "The Four's melancholy pressed to its Elizabethan extreme — mourning as intellectual vocation.", source: PALMER },
    ],
    historical: [
      { name: "Vincent van Gogh", note: "Riso-Hudson exemplar — the painter of feeling itself; devotion to the unique inner seeing.", source: RH },
      { name: "Frida Kahlo", note: "The Four's mirror held up to her own body and biography until the self-portrait became the subject.", source: COMMUNITY },
      { name: "Edgar Allan Poe", note: "Riso-Hudson exemplar; the Four's aesthetic of ruin, loss, and the uncanny.", source: RH },
      { name: "Virginia Woolf", note: "Riso-Hudson exemplar — modernist prose as the Four's interior made literary method.", source: RH99 },
    ],
  },

  investigator: {
    cultural: [
      { name: "Sherlock Holmes", medium: "Literature (Doyle)", note: "The detached mind; the body as a thin layer over a working brain. Five as genre-founding detective.", source: PALMER },
      { name: "Rust Cohle", medium: "Television (True Detective S1)", note: "The Five withdrawn into nihilist philosophy until a murder case forces him back into the world.", source: COMMUNITY },
      { name: "Walter Bishop", medium: "Television (Fringe)", note: "Reclusive theorizer with an encyclopedic interior — the Five as eccentric physicist.", source: COMMUNITY },
      { name: "Elliot Alderson", medium: "Television (Mr. Robot)", note: "Observation as refuge; mastery through knowing — the Five through a dissociative 21st-century lens.", source: COMMUNITY },
      { name: "Bartleby", medium: "Literature (Melville, Bartleby the Scrivener)", note: "'I would prefer not to' — the Five's withdrawal stated as ontological refusal.", source: PALMER },
    ],
    historical: [
      { name: "Isaac Newton", note: "Riso-Hudson exemplar — years alone with the math; minimal interruption, maximal depth.", source: RH },
      { name: "Emily Dickinson", note: "Riso-Hudson exemplar; withdrew into a private observatory of the soul and invented a whole prosody there.", source: RH },
      { name: "Stephen Hawking", note: "Riso-Hudson exemplar — severely bounded body, expansively mapped cosmos.", source: RH99 },
      { name: "Jane Goodall", note: "Riso-Hudson exemplar; decades of patient, solitary observation of Gombe chimpanzees as the Five's field method.", source: RH99 },
    ],
  },

  loyalist: {
    cultural: [
      { name: "Ron Weasley", medium: "Literature (Rowling)", note: "Loyalty tested again and again; the friend who stays even when his own abandonment would be rational.", source: COMMUNITY },
      { name: "Chandler Bing", medium: "Television (Friends)", note: "Humor as defense; anxiety managed through the group — the Six's wit as coping strategy.", source: COMMUNITY },
      { name: "Frodo Baggins", medium: "Literature (Tolkien)", note: "The Six as reluctant quest-bearer — commitment sustained against creeping inner dread.", source: COMMUNITY },
      { name: "Steve Rogers / Captain America", medium: "Film", note: "The counter-phobic Six — meets every threat head-on for the sake of duty; the Loyalist as moral anchor of the team.", source: COMMUNITY },
      { name: "Arya Stark", medium: "Television (Game of Thrones)", note: "The counter-phobic Six in full adolescent form — fear metabolized into a list of names.", source: COMMUNITY },
    ],
    historical: [
      { name: "Richard Nixon", note: "Riso-Hudson exemplar — paranoid Six dynamics visible in the Watergate tapes; Loyalist distrust turned on the system itself.", source: RH },
      { name: "George H. W. Bush", note: "Riso-Hudson exemplar; lifelong institutionalist, loyalty to country and agency as organizing principle.", source: RH },
      { name: "Malala Yousafzai", note: "The counter-phobic Six — walked toward danger because the cause required it.", source: COMMUNITY },
      { name: "Sigmund Freud", note: "Riso-Hudson exemplar; the Six's suspicion of manifest surfaces elevated into a psychology.", source: RH99 },
    ],
  },

  enthusiast: {
    cultural: [
      { name: "Peter Quill / Star-Lord", medium: "Film (Marvel)", note: "Joy, playlists, improvisation — the Seven with a jetpack.", source: COMMUNITY },
      { name: "Willy Wonka", medium: "Literature / Film", note: "The Enthusiast's factory — every door opens on something delightful or terrifying.", source: COMMUNITY },
      { name: "Jack Sparrow", medium: "Film", note: "Avoidance dressed as charm — the Seven outrunning its own commitments.", source: COMMUNITY },
      { name: "Phoebe Buffay", medium: "Television (Friends)", note: "Relentlessly open to experience; every day a new possibility, every past a different story.", source: COMMUNITY },
      { name: "Auntie Mame", medium: "Literature / Film", note: "'Life is a banquet, and most poor suckers are starving to death' — the Seven's program stated explicitly.", source: PALMER },
    ],
    historical: [
      { name: "John F. Kennedy", note: "Riso-Hudson exemplar — youthful charm, ambition, and the Seven's gift for making an era feel open.", source: RH },
      { name: "Benjamin Franklin", note: "Riso-Hudson exemplar; inventor, diplomat, printer, almanac-writer — the Seven's options-maximizing as life method.", source: RH },
      { name: "Robin Williams", note: "Riso-Hudson exemplar; joy as public gift, pain beneath that the Seven's strategy kept outrunning.", source: RH99 },
      { name: "Anthony Bourdain", note: "Appetite as vocation — the Seven cooked down to its gold and its shadow.", source: COMMUNITY },
    ],
  },

  challenger: {
    cultural: [
      { name: "Tony Soprano", medium: "Television", note: "Dominance, territory, force — the Eight in full North Jersey bloom.", source: COMMUNITY },
      { name: "Olenna Tyrell", medium: "Television (Game of Thrones)", note: "The iron matriarch — truth stated without costume, power exercised from the garden.", source: COMMUNITY },
      { name: "Imperator Furiosa", medium: "Film (Mad Max: Fury Road)", note: "The Eight as protector — force organized around a mercy.", source: COMMUNITY },
      { name: "Walter White (late)", medium: "Television (Breaking Bad)", note: "'I am the one who knocks' — the Eight shadow fully claimed, self-justification complete.", source: COMMUNITY },
      { name: "Stanley Kowalski", medium: "Literature (Williams, A Streetcar Named Desire)", note: "The Eight at its most raw and unliterary — domestic force as the Challenger's shadow.", source: PALMER },
    ],
    historical: [
      { name: "Martin Luther King Jr.", note: "Riso-Hudson exemplar — Eight-energy held in service of justice and disciplined non-violence.", source: RH },
      { name: "Franklin D. Roosevelt", note: "Riso-Hudson exemplar; the Eight at presidential scale, reshaping the American state across four terms.", source: RH },
      { name: "Pablo Picasso", note: "Riso-Hudson exemplar — the Eight as artistic force, dominating styles and relationships alike.", source: RH },
      { name: "Serena Williams", note: "Physical and competitive dominance as birthright; the Eight's body at the top of a sport for two decades.", source: COMMUNITY },
    ],
  },

  peacemaker: {
    cultural: [
      { name: "Luna Lovegood", medium: "Literature (Rowling)", note: "The merged, dreamy ease that receives the world without needing to edit it.", source: COMMUNITY },
      { name: "Ted Lasso", medium: "Television", note: "Warmth that refuses the fight; mediation as default setting, optimism as deliberate practice.", source: COMMUNITY },
      { name: "The Dude", medium: "Film (The Big Lebowski)", note: "The Nine in dressing-gown form — 'The Dude abides,' a whole ethos in two words.", source: COMMUNITY },
      { name: "Winnie-the-Pooh", medium: "Literature (Milne)", note: "The bear of very little fuss — presence without demand.", source: COMMUNITY },
      { name: "Forrest Gump", medium: "Film", note: "The Nine's bland receptivity walked through American history without friction or resistance.", source: COMMUNITY },
    ],
    historical: [
      { name: "Abraham Lincoln", note: "Riso-Hudson exemplar — the Nine integrating to Three; the quiet mediator moved, by duty, into decisive war-leadership.", source: RH },
      { name: "Queen Elizabeth II", note: "Riso-Hudson exemplar; seven decades of the Nine's still, impartial center at the heart of the state.", source: RH99 },
      { name: "Carl Rogers", note: "Riso-Hudson exemplar — built a whole therapy (client-centered, unconditional positive regard) on the Nine's gift for non-intrusive presence.", source: RH },
      { name: "Walter Cronkite", note: "Riso-Hudson exemplar; the Nine's impartial warmth as the country's shared evening voice.", source: RH99 },
    ],
  },
};

export function getEnneagramExemplars(slug: string): ExemplarSet | undefined {
  return ENNEAGRAM_EXEMPLARS[slug];
}
