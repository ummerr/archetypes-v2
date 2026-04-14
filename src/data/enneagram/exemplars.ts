import { ExemplarSet } from "@/components/shared/ExemplarsTabs";

// Enneagram exemplars - one set per type. Community typings are used
// suggestively, not as definitive assignments.

export const ENNEAGRAM_EXEMPLARS: Record<string, ExemplarSet> = {
  reformer: {
    cultural: [
      { name: "Atticus Finch", medium: "Literature", note: "The upright principle carried into a crooked town." },
      { name: "Hermione Granger", medium: "Literature", note: "The inner auditor; corrects teachers, classmates, and herself." },
      { name: "Leslie Knope", medium: "Television", note: "The reform impulse as civic love; the waffle as manifesto." },
      { name: "Mary Poppins", medium: "Film", note: "Practically perfect in every way - the Reformer's secret wish." },
    ],
    historical: [
      { name: "Mahatma Gandhi", note: "Discipline of truth applied as a political method." },
      { name: "Ruth Bader Ginsburg", note: "Decades of patient, precise correction of a flawed system." },
      { name: "Michelle Obama", note: "Decorum as moral force; the inner standard worn outward." },
    ],
  },

  helper: {
    cultural: [
      { name: "Molly Weasley", medium: "Literature", note: "Nurture as totalizing life-project." },
      { name: "Samwise Gamgee", medium: "Literature / Film", note: "The companion whose care carries the quest." },
      { name: "Dolores Umbridge (shadow 2)", medium: "Literature", note: "Helping as control; sweetness wielded as a blade." },
      { name: "Leo McGarry (West Wing)", medium: "Television", note: "Serves the president's mission with a devotion that is also his identity." },
    ],
    historical: [
      { name: "Mother Teresa", note: "The archetypal 2 - given over, entirely, to the needs of others." },
      { name: "Princess Diana", note: "Warmth deployed as public vocation." },
      { name: "Dolly Parton", note: "Generosity on a scale that has become infrastructure." },
    ],
  },

  achiever: {
    cultural: [
      { name: "Don Draper", medium: "Television", note: "Image as asset, asset as self." },
      { name: "Gatsby", medium: "Literature", note: "The Achiever's green light - success as proof one exists." },
      { name: "Miranda Priestly", medium: "Film", note: "Excellence weaponized; the cost of standing absolutely at the top." },
      { name: "Joey Tribbiani (auditioning)", medium: "Television", note: "Charm and adaptation - the Achiever's lighter shape." },
    ],
    historical: [
      { name: "Tom Brady", note: "Twenty-three years of measurable excellence; Achiever as career." },
      { name: "Oprah Winfrey", note: "Achievement as vehicle for a bigger message; the 3 evolving toward the 2 and 4." },
      { name: "Taylor Swift", note: "Reinvention as strategy; each era a new record set." },
    ],
  },

  individualist: {
    cultural: [
      { name: "Jay Gatsby", medium: "Literature", note: "Longing as the constant mood; the perfect thing always a little out of reach." },
      { name: "Rue (Euphoria)", medium: "Television", note: "The depth of feeling as both gift and wound." },
      { name: "Don Draper (interior)", medium: "Television", note: "The private 4 under the public 3 - ache as the real engine." },
      { name: "Amy Winehouse's persona", medium: "Music / Culture", note: "Torch songs from the romantic interior; beauty braided into self-harm." },
    ],
    historical: [
      { name: "Vincent van Gogh", note: "The painter of feeling itself; devotion to the unique inner seeing." },
      { name: "Frida Kahlo", note: "The 4's mirror held up to the body and the life." },
      { name: "Prince", note: "Unapologetic singularity - the 4 in glittering public form." },
    ],
  },

  investigator: {
    cultural: [
      { name: "Sherlock Holmes", medium: "Literature", note: "The detached mind; the body as a thin layer over a working brain." },
      { name: "Rust Cohle (True Detective S1)", medium: "Television", note: "The 5 withdrawn into philosophy until the world forces him back." },
      { name: "Walter Bishop (Fringe)", medium: "Television", note: "Reclusive theorizer with an encyclopedic interior." },
      { name: "Mr. Robot's Elliot", medium: "Television", note: "Observation as refuge; mastery through knowing." },
    ],
    historical: [
      { name: "Isaac Newton", note: "Years alone with the math; minimal interruption, maximal depth." },
      { name: "Emily Dickinson", note: "Withdrew into a private observatory of the soul." },
      { name: "Stephen Hawking", note: "Severely bounded body, expansively mapped cosmos." },
    ],
  },

  loyalist: {
    cultural: [
      { name: "Ron Weasley", medium: "Literature", note: "Loyalty tested again and again; the friend who stays." },
      { name: "Chandler Bing", medium: "Television", note: "Humor as defense; anxiety managed through the group." },
      { name: "Walter White (anxious phase)", medium: "Television", note: "Contingency-planning under threat; the 6 cornered." },
      { name: "Steve Rogers", medium: "Film", note: "Counter-phobic 6 - meets every threat head-on for the sake of duty." },
    ],
    historical: [
      { name: "George H. W. Bush", note: "Lifelong institutionalist; loyalty to country as organizing principle." },
      { name: "Malala Yousafzai", note: "Counter-phobic 6 - walked toward danger because the cause required it." },
      { name: "Ellen DeGeneres", note: "Anxious-to-warm 6 - safety built through welcome." },
    ],
  },

  enthusiast: {
    cultural: [
      { name: "Peter Quill / Star-Lord", medium: "Film", note: "Joy, playlists, improvisation; the 7 with a jetpack." },
      { name: "Willy Wonka", medium: "Literature / Film", note: "The Enthusiast's factory - every door opens on something delightful or terrifying." },
      { name: "Jack Sparrow", medium: "Film", note: "Avoidance dressed as charm; the 7 outrunning its own hold." },
      { name: "Phoebe Buffay", medium: "Television", note: "Relentlessly open to experience; every day a new possibility." },
    ],
    historical: [
      { name: "Anthony Bourdain", note: "Appetite as vocation; the 7 cooked down to its gold and its shadow." },
      { name: "Robin Williams", note: "Joy as public gift; pain beneath that the 7 strategy kept outrunning." },
      { name: "Richard Branson", note: "Serial adventurer-entrepreneur; options-maximizing as life method." },
    ],
  },

  challenger: {
    cultural: [
      { name: "Tony Soprano", medium: "Television", note: "Dominance, territory, force - the 8 in full north-Jersey bloom." },
      { name: "Olenna Tyrell", medium: "Literature / TV", note: "The iron matriarch; truth stated without costume." },
      { name: "Furiosa", medium: "Film", note: "The 8 as protector; force organized around a mercy." },
      { name: "Walter White (late)", medium: "Television", note: "The 8 shadow fully claimed - I am the one who knocks." },
    ],
    historical: [
      { name: "Martin Luther King Jr. (Letter from Birmingham Jail)", note: "Eight-energy held in service of justice and non-violence." },
      { name: "Serena Williams", note: "Physical and competitive dominance as birthright." },
      { name: "Fidel Castro", note: "The 8 as revolutionary - force used until it becomes its own regime." },
    ],
  },

  peacemaker: {
    cultural: [
      { name: "Luna Lovegood", medium: "Literature", note: "The merged, dreamy ease that receives the world without needing to edit it." },
      { name: "Ted Lasso", medium: "Television", note: "Warmth that refuses the fight; mediation as default setting." },
      { name: "The Dude (Lebowski)", medium: "Film", note: "The 9 in dressing-gown form; let everything abide." },
      { name: "Winnie-the-Pooh", medium: "Literature", note: "The bear of very little fuss; presence without demand." },
    ],
    historical: [
      { name: "Abraham Lincoln", note: "9 integrating to 3 - the quiet mediator moved, by duty, into decisive action." },
      { name: "Queen Elizabeth II", note: "Decades of the 9's still, impartial center at the heart of the state." },
      { name: "Carl Rogers", note: "Built a whole therapy on the 9's gift for unconditional, non-intrusive presence." },
    ],
  },
};

export function getEnneagramExemplars(slug: string): ExemplarSet | undefined {
  return ENNEAGRAM_EXEMPLARS[slug];
}
