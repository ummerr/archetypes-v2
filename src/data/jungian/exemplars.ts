import { JungianExemplars } from "@/types/jungian";

// Pearson-Marr exemplar set. Starter content drawn from canonical brand-archetype
// literature (Mark & Pearson, "The Hero and the Outlaw") and widely-cited
// cultural mappings. Meant to be edited and refined over time.

export const JUNGIAN_EXEMPLARS: Record<string, JungianExemplars> = {
  innocent: {
    brands: [
      { name: "Coca-Cola", note: "Happiness, togetherness, a simpler world." },
      { name: "Dove", note: "Real beauty, gentle goodness, self-acceptance." },
      { name: "Ivory Soap", note: "Purity - '99 and 44/100% pure.'" },
      { name: "Disney (original)", note: "The kingdom where wishes come true." },
    ],
    cultural: [
      { name: "Forrest Gump", medium: "Film", note: "Pure-hearted witness to history, unchanged by it." },
      { name: "Snow White", medium: "Fairy Tale", note: "The archetypal innocent whose virtue survives the forest." },
      { name: "Maria von Trapp", medium: "Film", note: "Faith, song, and stubborn goodness in the shadow of war." },
    ],
    historical: [
      { name: "Fred Rogers", note: "A ministry of simple kindness, held with total seriousness." },
      { name: "Anne Frank", note: "Belief in human goodness even while hunted by its opposite." },
    ],
  },

  everyman: {
    brands: [
      { name: "IKEA", note: "Design for everyone; a home within reach." },
      { name: "Target", note: "Ordinary life, slightly better." },
      { name: "Levi's", note: "The working uniform of the democratic century." },
      { name: "Budweiser", note: "The beer that belongs to the crowd." },
    ],
    cultural: [
      { name: "Samwise Gamgee", medium: "Literature", note: "The loyal companion whose ordinary love carries the story." },
      { name: "Homer Simpson", medium: "Television", note: "The American everyman - flawed, tender, indestructible." },
      { name: "Charlie Brown", medium: "Comics", note: "Persistence without glory; the dignity of trying." },
    ],
    historical: [
      { name: "Walter Cronkite", note: "Television's voice of shared American experience." },
      { name: "Studs Terkel", note: "Chronicler of the working life, listener to the ordinary." },
    ],
  },

  hero: {
    brands: [
      { name: "Nike", note: "Just do it - the athlete as mythic conqueror." },
      { name: "BMW", note: "The ultimate driving machine; mastery as identity." },
      { name: "Under Armour", note: "Performance earned, not given." },
      { name: "FedEx", note: "Mission accomplished, overnight." },
    ],
    cultural: [
      { name: "Luke Skywalker", medium: "Film", note: "The called young hero who meets the father-shadow." },
      { name: "Wonder Woman", medium: "Film / Comics", note: "Strength wedded to compassion; the protector." },
      { name: "Rocky Balboa", medium: "Film", note: "Discipline as redemption; going the distance." },
    ],
    historical: [
      { name: "Theodore Roosevelt", note: "The strenuous life; self-made vigor as public virtue." },
      { name: "Joan of Arc", note: "Called to arms by vision; the warrior-saint." },
    ],
  },

  caregiver: {
    brands: [
      { name: "Johnson & Johnson", note: "A family company - products for the vulnerable." },
      { name: "Volvo", note: "Protection as the highest luxury." },
      { name: "Campbell's", note: "M'm! M'm! Good - comfort in a can." },
      { name: "UNICEF", note: "Care at the scale of civilizations." },
    ],
    cultural: [
      { name: "Molly Weasley", medium: "Literature", note: "The fierce maternal force - warmth and warrior both." },
      { name: "Atticus Finch", medium: "Literature", note: "Protective justice; care expressed as principle." },
      { name: "Mary Poppins", medium: "Film", note: "Firm, magical, exactly sufficient nurture." },
    ],
    historical: [
      { name: "Mother Teresa", note: "Radical devotion to the dying and the discarded." },
      { name: "Florence Nightingale", note: "Care as discipline; nursing as reform." },
    ],
  },

  explorer: {
    brands: [
      { name: "The North Face", note: "Never stop exploring." },
      { name: "Patagonia", note: "Gear for the wild; ethics for the journey." },
      { name: "Jeep", note: "Go anywhere, do anything." },
      { name: "Airbnb", note: "Belong anywhere - the nomadic home." },
    ],
    cultural: [
      { name: "Indiana Jones", medium: "Film", note: "The scholar-adventurer addicted to the horizon." },
      { name: "Bilbo Baggins", medium: "Literature", note: "The reluctant wanderer who finds himself in the wilds." },
      { name: "Jack Kerouac's Sal", medium: "Literature", note: "On the Road - motion as identity." },
    ],
    historical: [
      { name: "Anthony Bourdain", note: "Appetite as curiosity; the traveler as witness." },
      { name: "Amelia Earhart", note: "The sky as her one true country." },
    ],
  },

  rebel: {
    brands: [
      { name: "Harley-Davidson", note: "Outlaw freedom; the open road as refusal." },
      { name: "Virgin", note: "Cheerful insurgency against incumbents." },
      { name: "Diesel", note: "Be stupid - provocation as brand." },
      { name: "Jack Daniel's", note: "Outlaw Americana bottled in Tennessee." },
    ],
    cultural: [
      { name: "Tyler Durden", medium: "Film", note: "The seductive destroyer who promises freedom." },
      { name: "V (V for Vendetta)", medium: "Graphic Novel / Film", note: "Revolution as art, as terror, as theater." },
      { name: "Katniss Everdeen", medium: "Literature / Film", note: "The reluctant symbol of refusal." },
    ],
    historical: [
      { name: "Malcolm X", note: "Uncompromising truth-teller, enemy of polite hypocrisy." },
      { name: "Emma Goldman", note: "Anarchist conscience of an age." },
    ],
  },

  lover: {
    brands: [
      { name: "Chanel", note: "Seduction as art form; beauty as birthright." },
      { name: "Godiva", note: "Luxury made edible; pleasure without apology." },
      { name: "Victoria's Secret", note: "Eros mass-marketed." },
      { name: "Hallmark", note: "Intimacy scripted for the greeting card." },
    ],
    cultural: [
      { name: "Elizabeth Bennet", medium: "Literature", note: "Intelligence and passion fused; love as recognition." },
      { name: "Romeo", medium: "Literature", note: "The archetype of all-consuming first love." },
      { name: "Marianne Dashwood", medium: "Literature", note: "Sensibility's devotion - all feeling, all at once." },
    ],
    historical: [
      { name: "Pablo Neruda", note: "Language at the edge of the erotic." },
      { name: "Rumi", note: "Love of the beloved as path to the divine." },
    ],
  },

  creator: {
    brands: [
      { name: "Apple", note: "Think different - tools for the creative class." },
      { name: "Lego", note: "Imagination in pieces; building as play." },
      { name: "Adobe", note: "The substrate of modern making." },
      { name: "Crayola", note: "Color as childhood's first creative act." },
    ],
    cultural: [
      { name: "Willy Wonka", medium: "Literature / Film", note: "The eccentric maker guarding a factory of dreams." },
      { name: "Dr. Frankenstein", medium: "Literature", note: "Creation severed from care - the Creator's shadow." },
      { name: "Geppetto", medium: "Literature", note: "The craftsman who loved his work into life." },
    ],
    historical: [
      { name: "Steve Jobs", note: "Obsessive taste as product philosophy." },
      { name: "Frida Kahlo", note: "Pain rendered as iconography." },
    ],
  },

  jester: {
    brands: [
      { name: "M&M's", note: "Anthropomorphic candy, self-aware snack." },
      { name: "Old Spice", note: "Absurdist masculinity as marketing coup." },
      { name: "Ben & Jerry's", note: "Playful flavors, earnest politics." },
      { name: "Skittles", note: "Taste the rainbow - nonsense as joy." },
    ],
    cultural: [
      { name: "Deadpool", medium: "Film / Comics", note: "The fourth-wall-breaking trickster antihero." },
      { name: "Bugs Bunny", medium: "Animation", note: "The eternal American wit." },
      { name: "Falstaff", medium: "Literature", note: "Shakespeare's holy fool - wisdom in drunkenness." },
    ],
    historical: [
      { name: "Robin Williams", note: "Comedy as mercy; grief beneath the grin." },
      { name: "Richard Pryor", note: "Truth-telling in the form of a punchline." },
    ],
  },

  sage: {
    brands: [
      { name: "Google", note: "Organize the world's information." },
      { name: "The New York Times", note: "All the news that's fit to print." },
      { name: "BBC", note: "Public-service knowledge at global scale." },
      { name: "Harvard", note: "Veritas - the institutional sage." },
    ],
    cultural: [
      { name: "Gandalf", medium: "Literature", note: "The wise one who walks among the small." },
      { name: "Yoda", medium: "Film", note: "Knowledge compressed to paradox." },
      { name: "Hermione Granger", medium: "Literature", note: "Scholarship as heroism." },
    ],
    historical: [
      { name: "Carl Sagan", note: "The scientist as public teacher." },
      { name: "Maya Angelou", note: "Memoir as wisdom literature." },
    ],
  },

  magician: {
    brands: [
      { name: "Disney", note: "Where dreams come true - transformation as product." },
      { name: "Tesla", note: "The physics of the future, made driveable." },
      { name: "MAC Cosmetics", note: "Transformation applied to the face." },
      { name: "Dyson", note: "Engineering that feels like sorcery." },
    ],
    cultural: [
      { name: "Merlin", medium: "Myth", note: "The archetypal wizard-advisor to power." },
      { name: "Prospero", medium: "Literature", note: "Shakespeare's sovereign-magician on the island." },
      { name: "Morpheus (The Matrix)", medium: "Film", note: "The initiator who offers the red pill." },
    ],
    historical: [
      { name: "Carl Jung", note: "Psyche's cartographer - made the unseen map." },
      { name: "Nikola Tesla", note: "Electricity wielded as if it were alive." },
    ],
  },

  ruler: {
    brands: [
      { name: "Mercedes-Benz", note: "The best or nothing - sovereign standard." },
      { name: "Rolex", note: "Authority worn on the wrist." },
      { name: "American Express", note: "Membership has its privileges." },
      { name: "Microsoft", note: "The platform that runs the enterprise world." },
    ],
    cultural: [
      { name: "Aragorn", medium: "Literature / Film", note: "The reluctant king matured into his crown." },
      { name: "T'Challa", medium: "Film", note: "Sovereignty in service of the people, not the throne." },
      { name: "Miranda Priestly", medium: "Film", note: "Fashion's tyrant - the Ruler's shadow made couture." },
    ],
    historical: [
      { name: "Queen Elizabeth II", note: "Duty as identity; the throne as covenant." },
      { name: "Nelson Mandela", note: "Sovereign forgiveness as political act." },
    ],
  },
};

export function getJungianExemplars(slug: string): JungianExemplars | undefined {
  return JUNGIAN_EXEMPLARS[slug];
}
