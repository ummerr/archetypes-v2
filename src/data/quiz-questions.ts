// The Reading — question bank.
//
// Authored bank of ~60 items. Session draws ~50, stratified by section and
// dim, via seeded stable sampling in quiz-session.ts. Every prompt passes the
// voice + stance audit: second-person, aphoristic, restrained. No "you are X",
// no diagnosis, no hype. Scenarios sit closer to short fiction than to
// multiple-choice tests.
//
// Item id conventions:
//   cal-stage-NN   stage Likert (calibration)
//   cal-stab-NN    stability_risk Likert (calibration)
//   cal-bel-NN     belonging_independence Likert (calibration)
//   aff-NN         affect scenario (relational-affect)
//   stn-NN         stance forced-choice (relational-affect)
//   nar-NN         narrative scenario (narrative)
//   shd-NN         shadow reflective forced-choice (shadow)

import type { QuizItem } from "@/lib/quiz-types";

const STAGE_ANCHORS = { low: "not really", high: "deeply" } as const;
const STAB_ANCHORS = { low: "not really", high: "mostly yes" } as const;
const BEL_ANCHORS = { low: "not really", high: "mostly yes" } as const;

// ── Calibration: developmental stage (12) ────────────────────────────────────
// Polarity +1 means high Likert → integrated end of arc.
// Polarity -1 means high Likert → pre-initiation/striving end.

const STAGE_ITEMS: QuizItem[] = [
  {
    id: "cal-stage-01",
    kind: "likert",
    section: "calibration",
    prompt: "Most days, you know who you are — not perfectly, but plainly.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-02",
    kind: "likert",
    section: "calibration",
    prompt: "You are still becoming the person your life seems to be asking for.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-03",
    kind: "likert",
    section: "calibration",
    prompt: "Your center of gravity is steadier than it was a few years ago.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-04",
    kind: "likert",
    section: "calibration",
    prompt: "Something you are pursuing hasn't yet declared itself.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-05",
    kind: "likert",
    section: "calibration",
    prompt: "You carry quieter weather than you used to.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-06",
    kind: "likert",
    section: "calibration",
    prompt: "You are in the middle of a change you cannot quite name.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-07",
    kind: "likert",
    section: "calibration",
    prompt: "What you most need to do, you already know how to do.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-08",
    kind: "likert",
    section: "calibration",
    prompt: "Your real life still feels like it has not quite begun.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-09",
    kind: "likert",
    section: "calibration",
    prompt:
      "A part of your story you once needed to prove has relaxed its grip.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-10",
    kind: "likert",
    section: "calibration",
    prompt: "You are still outrunning a shape you cannot quite describe.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-11",
    kind: "likert",
    section: "calibration",
    prompt:
      "You can hold a contradiction inside yourself without needing to resolve it.",
    dim: "stage",
    polarity: 1,
    anchors: STAGE_ANCHORS,
  },
  {
    id: "cal-stage-12",
    kind: "likert",
    section: "calibration",
    prompt: "What you want has shifted again in the last year.",
    dim: "stage",
    polarity: -1,
    anchors: STAGE_ANCHORS,
  },
];

// ── Calibration: stability ↔ risk (7) ────────────────────────────────────────
// Polarity +1 means high Likert → high stability preference.
// Polarity -1 means high Likert → high risk appetite.

const STABILITY_ITEMS: QuizItem[] = [
  {
    id: "cal-stab-01",
    kind: "likert",
    section: "calibration",
    prompt: "A plan is a kind of peace.",
    dim: "stability_risk",
    polarity: 1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-02",
    kind: "likert",
    section: "calibration",
    prompt: "You would rather risk a wrong turn than stay put.",
    dim: "stability_risk",
    polarity: -1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-03",
    kind: "likert",
    section: "calibration",
    prompt: "Predictability is not a failure of imagination.",
    dim: "stability_risk",
    polarity: 1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-04",
    kind: "likert",
    section: "calibration",
    prompt:
      "You trust what you can improvise more than what you can rehearse.",
    dim: "stability_risk",
    polarity: -1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-05",
    kind: "likert",
    section: "calibration",
    prompt:
      "When a door opens, you usually take it, even if you do not know where it leads.",
    dim: "stability_risk",
    polarity: -1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-06",
    kind: "likert",
    section: "calibration",
    prompt: "Roots feel like a resource, not a rope.",
    dim: "stability_risk",
    polarity: 1,
    anchors: STAB_ANCHORS,
  },
  {
    id: "cal-stab-07",
    kind: "likert",
    section: "calibration",
    prompt:
      "Most change you have chosen has been slower than it could have been.",
    dim: "stability_risk",
    polarity: 1,
    anchors: STAB_ANCHORS,
  },
];

// ── Calibration: belonging ↔ independence (7) ────────────────────────────────
// Polarity +1 means high Likert → independence end.
// Polarity -1 means high Likert → belonging end.

const BELONGING_ITEMS: QuizItem[] = [
  {
    id: "cal-bel-01",
    kind: "likert",
    section: "calibration",
    prompt: "You are most yourself inside a 'we' you trust.",
    dim: "belonging_independence",
    polarity: -1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-02",
    kind: "likert",
    section: "calibration",
    prompt:
      "You do not need a room's agreement to know what you think.",
    dim: "belonging_independence",
    polarity: 1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-03",
    kind: "likert",
    section: "calibration",
    prompt:
      "Part of how you know what you believe is the people you believe it with.",
    dim: "belonging_independence",
    polarity: -1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-04",
    kind: "likert",
    section: "calibration",
    prompt: "Solitude is where most of your real thinking happens.",
    dim: "belonging_independence",
    polarity: 1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-05",
    kind: "likert",
    section: "calibration",
    prompt:
      "You would rather be known by a few, deeply, than admired by a room.",
    dim: "belonging_independence",
    polarity: -1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-06",
    kind: "likert",
    section: "calibration",
    prompt: "You resist being spoken for, even by those who love you.",
    dim: "belonging_independence",
    polarity: 1,
    anchors: BEL_ANCHORS,
  },
  {
    id: "cal-bel-07",
    kind: "likert",
    section: "calibration",
    prompt: "Your sense of self does not require an audience.",
    dim: "belonging_independence",
    polarity: 1,
    anchors: BEL_ANCHORS,
  },
];

// ── Relational & affect: affect scenarios (10, scenario-4) ───────────────────
// Four options per scene, each weighted toward one affect center:
//   anger · shame · fear · desire

const AFFECT_ITEMS: QuizItem[] = [
  {
    id: "aff-01",
    kind: "scenario",
    section: "relational-affect",
    prompt: "A piece of work you were quietly proud of gets a cold reception.",
    scene:
      "A piece of work you were quietly proud of lands with a cold, public reception. One of the people whose opinion matters to you is in the room.",
    options: [
      {
        id: "a",
        label: "The heat rises — the work is not bad, and you know it.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You shrink a little. Part of you already knew it wasn't enough.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You start running the list — what did you miss, who saw, what's next.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You want to know what would actually make them light up.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-02",
    kind: "scenario",
    section: "relational-affect",
    prompt: "Someone close has gone quiet.",
    scene:
      "A friend you've been close to for years has not returned three messages. No fight. No break. Just quiet.",
    options: [
      {
        id: "a",
        label: "You stop sending. You are done extending when nothing comes back.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You reread what you sent last. Something must have been off.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You catalog possibilities — illness, trouble, mood. You want data.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You miss them. You keep trying, patiently.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-03",
    kind: "scenario",
    section: "relational-affect",
    prompt: "The road not taken, visibly going well for someone else.",
    scene:
      "An opportunity you almost took, didn't. Now it is visibly going well for someone else.",
    options: [
      {
        id: "a",
        label: "The decision was wrong. You can feel that cleanly.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You made the timid choice. You usually do.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You have already found three reasons it would have gone badly for you.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You want the next door. You are already looking for it.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-04",
    kind: "scenario",
    section: "relational-affect",
    prompt: "The confident voice in the room has it wrong.",
    scene:
      "At a gathering, the conversation lands on a topic you have real experience with. The most confident voice in the room has it wrong.",
    options: [
      {
        id: "a",
        label: "You correct them, cleanly, without apology.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You stay quiet. You don't want to be the one making it awkward.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You wait to see which way the room is leaning before you speak.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You pull the thread gently — you want the real conversation to start.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-05",
    kind: "scenario",
    section: "relational-affect",
    prompt: "A door closes without explanation.",
    scene:
      "A role, a project, or a relationship you thought was yours closes without explanation.",
    options: [
      {
        id: "a",
        label: "Someone owes you a real answer.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You wonder what you did that made the decision easy for them.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You re-examine every recent move for the one that tipped it.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You turn toward what's next before the news has fully landed.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-06",
    kind: "scenario",
    section: "relational-affect",
    prompt: "An old friend reappears.",
    scene:
      "An old friend reappears after years. The first hour, you can feel which version of yourself they are expecting.",
    options: [
      {
        id: "a",
        label: "You refuse it. You are not that person anymore and you'll show it.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You slip back into the old shape before you even notice.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You manage the conversation carefully to keep it pleasant.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You let the old affection in. There is something you've missed.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-07",
    kind: "scenario",
    section: "relational-affect",
    prompt: "A piece of criticism arrives late.",
    scene:
      "Criticism lands late — weeks after the thing is done, months after it could have been changed.",
    options: [
      {
        id: "a",
        label: "Too late, and you are not going to pretend otherwise.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You turn it over anyway. They are probably right.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You wonder how many others thought the same and didn't say.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You mine it for what the next attempt could use.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-08",
    kind: "scenario",
    section: "relational-affect",
    prompt: "Someone asks for a favor you don't want to do.",
    scene:
      "Someone asks for something you can do but don't want to. They will probably notice if you say no.",
    options: [
      {
        id: "a",
        label: "No. You have stopped explaining.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "Yes. You don't want to be someone who lets people down.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You bargain — a smaller version, a later time.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You try to give them the real thing they need, not just what they asked for.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-09",
    kind: "scenario",
    section: "relational-affect",
    prompt: "A public stumble.",
    scene:
      "You mispronounced a word, or misattributed a quote, in front of people whose intellectual respect matters to you.",
    options: [
      {
        id: "a",
        label: "You own it loudly — better than pretending it didn't happen.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You can still feel it the next morning.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You begin fact-checking more carefully before speaking.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You move toward it — you want to be the kind of person who learns in public.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
  {
    id: "aff-10",
    kind: "scenario",
    section: "relational-affect",
    prompt: "An unexpected invitation.",
    scene:
      "Someone invites you into a circle you have admired from the outside. It is more access than you expected, earlier than you expected it.",
    options: [
      {
        id: "a",
        label: "You are skeptical — what's the catch.",
        delta: { affect: { anger: 1.0 } },
      },
      {
        id: "b",
        label: "You wonder if they have the wrong person.",
        delta: { affect: { shame: 1.0 } },
      },
      {
        id: "c",
        label: "You decline before you can second-guess saying yes.",
        delta: { affect: { fear: 1.0 } },
      },
      {
        id: "d",
        label: "You say yes before you have finished reading.",
        delta: { affect: { desire: 1.0 } },
      },
    ],
  },
];

// ── Relational & affect: stance forced-choice (10, forced-choice-3) ──────────
// Three options per item, each weighted toward one stance: toward · against · away

const STANCE_ITEMS: QuizItem[] = [
  {
    id: "stn-01",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "In a heated group conversation, your most honest instinct is to —",
    options: [
      {
        id: "a",
        label: "stay in it and keep the thread alive.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "name what no one else is naming.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "step back and let it find its own shape.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-02",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "When you feel misunderstood, you usually —",
    options: [
      {
        id: "a",
        label: "explain more carefully until they see it.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "hold your ground — the misunderstanding isn't yours to fix.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "let the misunderstanding stand; the right people will read through it.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-03",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "A team is drifting. You —",
    options: [
      {
        id: "a",
        label: "become the connector — rehearse the aim, bring people back in.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "become the edge — force the harder conversation.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label:
          "become the hinge — take care of your piece cleanly so the drift doesn't run through you.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-04",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "The way you love well —",
    options: [
      {
        id: "a",
        label: "is by staying close through the hard parts.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "is by refusing to let the other person shrink.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "is by leaving enough room that nothing has to be forced.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-05",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "Conflict is —",
    options: [
      {
        id: "a",
        label: "something you move through, not around.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "sometimes the most honest thing in the room.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "expensive; you pick which ones are worth it.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-06",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "When the group's direction is not yours —",
    options: [
      {
        id: "a",
        label: "you stay and shape it from inside.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "you dissent, out loud, on the record.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "you quietly take your weight elsewhere.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-07",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "Power, when you have it, feels like —",
    options: [
      {
        id: "a",
        label: "something to share.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "something to spend.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "something to hold lightly.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-08",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "The way you would rather be known is as —",
    options: [
      {
        id: "a",
        label: "someone who shows up.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "someone who tells the truth.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "someone who kept their own weather.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-09",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "A boundary, done right, is —",
    options: [
      {
        id: "a",
        label: "an invitation to a real relationship.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "a line you do not let be tested twice.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "a door closed quietly, no announcement.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
  {
    id: "stn-10",
    kind: "forced-choice",
    section: "relational-affect",
    prompt: "When someone wounds you, your first real move is —",
    options: [
      {
        id: "a",
        label: "to tell them, directly, so the thing can be repaired.",
        delta: { stance: { toward: 1.0 } },
      },
      {
        id: "b",
        label: "to make sure they know it will not happen again.",
        delta: { stance: { against: 1.0 } },
      },
      {
        id: "c",
        label: "to widen the distance before deciding what else to do.",
        delta: { stance: { away: 1.0 } },
      },
    ],
  },
];

// ── Narrative: position scenarios (7, scenario-4) ────────────────────────────
// Four options per scene, each weighted toward one narrative position:
//   departure · initiation · liminal · return
// Secondary stage nudges are included because position correlates with stage.

const NARRATIVE_ITEMS: QuizItem[] = [
  {
    id: "nar-01",
    kind: "scenario",
    section: "narrative",
    prompt: "The work you're good at has stopped feeding you.",
    scene:
      "You are good at a thing that, a year ago, you wanted. You can still do it well. It no longer feeds you.",
    options: [
      {
        id: "a",
        label:
          "You can feel the next threshold — you have not crossed it, but you know it is there.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label:
          "You make yourself do it anyway. The wanting will come back, or it will not.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label:
          "You do not know what is next. The old shape is empty and the new one has not arrived.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label:
          "You have started teaching others how to do it. The part of you that needed it is elsewhere now.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-02",
    kind: "scenario",
    section: "narrative",
    prompt: "Something you've told yourself you'd do, for years.",
    scene:
      "There is something you have been telling yourself you would do for years.",
    options: [
      {
        id: "a",
        label: "This is the year it stops being something you tell yourself.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label: "You are doing it now. It is harder than you thought; you are still at it.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label:
          "You have started and stopped. You don't know which version of you is supposed to finish it.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label: "You did it. What is left is the teaching.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-03",
    kind: "scenario",
    section: "narrative",
    prompt: "Someone sees something in your work you couldn't.",
    scene:
      "A person appears in your life who can see something in your work you could not see.",
    options: [
      {
        id: "a",
        label: "It gives you the push to begin something you have been circling.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label: "It makes the current work bearable, or sharper. You are still inside it.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label: "You notice them but aren't sure how to use the help yet.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label: "You recognize the role. You have played it for someone else.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-04",
    kind: "scenario",
    section: "narrative",
    prompt: "A room of people doing the work you want to do.",
    scene:
      "You walk into a room of people doing the work you want to do. None of them know you yet.",
    options: [
      {
        id: "a",
        label: "A door is opening. You step through.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label: "You earn your place over the evening.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label:
          "You watch. You don't know yet whether you belong or are passing through.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label:
          "You recognize the room. You have been the newest one here before, and you have been the other side.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-05",
    kind: "scenario",
    section: "narrative",
    prompt: "A place you used to live.",
    scene:
      "You go back to a place you used to live. The shape of the streets is the same. You are not.",
    options: [
      {
        id: "a",
        label: "It sharpens what you already knew — you had to leave.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label: "It shows you what the leaving cost, and why it was worth it.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label:
          "You feel between — neither that old version nor the current one fully true.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label: "You can be there without bracing. The old self is a smaller presence now.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-06",
    kind: "scenario",
    section: "narrative",
    prompt: "You inherit something you did not build.",
    scene:
      "You are given — or take on — responsibility for something you did not build.",
    options: [
      {
        id: "a",
        label: "It is a call; you didn't expect it, but it is yours now.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label: "It is a test; you are being made by carrying it.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label: "You do not yet know what it wants from you.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label: "You know what it asks, because you built something like it once before.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "nar-07",
    kind: "scenario",
    section: "narrative",
    prompt: "An old ambition surfaces.",
    scene: "An old ambition surfaces — one you had quietly set down.",
    options: [
      {
        id: "a",
        label: "You recognize it as a call you didn't answer. You are ready now.",
        delta: { narrative: { departure: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "b",
        label:
          "You are still inside it. You never actually set it down — you just rested.",
        delta: { narrative: { initiation: 1.0 }, stage: { striving: 0.3 } },
      },
      {
        id: "c",
        label: "You don't know if it is still yours. The person who wanted it was someone else.",
        delta: { narrative: { liminal: 1.0 }, stage: { liminal: 0.3 } },
      },
      {
        id: "d",
        label:
          "It is fine that you set it down. What came after is what it was pointing at.",
        delta: { narrative: { return: 1.0 }, stage: { integrated: 0.3 } },
      },
    ],
  },
];

// ── Shadow: reflective forced-choice-2 (7) ───────────────────────────────────
// Shadow is per-system metadata (not a user-scored axis). These items probe
// affect / stance / narrative through a shadow-framed lens. Slowest tempo.

const SHADOW_ITEMS: QuizItem[] = [
  {
    id: "shd-01",
    kind: "forced-choice",
    section: "shadow",
    prompt: "Shadow in your life, when you are honest —",
    options: [
      {
        id: "a",
        label:
          "arrives as a pressure from outside — someone else's fault, a system's fault, something you would call injustice if pressed.",
        delta: { affect: { anger: 0.7 }, stance: { against: 0.5 } },
      },
      {
        id: "b",
        label:
          "arrives as a pressure from inside — a steady sense that something about you is the thing falling short.",
        delta: { affect: { shame: 0.7 }, stance: { away: 0.5 } },
      },
    ],
  },
  {
    id: "shd-02",
    kind: "forced-choice",
    section: "shadow",
    prompt: "The part of yourself you keep quietest —",
    options: [
      {
        id: "a",
        label: "is a wanting. You do not always let yourself name what you actually want.",
        delta: { affect: { desire: 0.9 } },
      },
      {
        id: "b",
        label:
          "is a worrying. You do not always let yourself name what you are actually afraid of.",
        delta: { affect: { fear: 0.9 } },
      },
    ],
  },
  {
    id: "shd-03",
    kind: "forced-choice",
    section: "shadow",
    prompt: "When you catch yourself in a pattern you have been in before —",
    options: [
      {
        id: "a",
        label: "you recognize it and hold it. You already know its name.",
        delta: { narrative: { return: 0.7 }, stage: { integrated: 0.4 } },
      },
      {
        id: "b",
        label: "you resist it. You are tired of being the one who does this.",
        delta: { narrative: { initiation: 0.7 }, stance: { against: 0.4 } },
      },
    ],
  },
  {
    id: "shd-04",
    kind: "forced-choice",
    section: "shadow",
    prompt: "What people you have disappointed probably say about you —",
    options: [
      {
        id: "a",
        label: "is that you made yourself scarce when it got hard.",
        delta: { stance: { away: 0.7 }, affect: { fear: 0.4 } },
      },
      {
        id: "b",
        label: "is that you stayed past the point of being useful, trying.",
        delta: { stance: { toward: 0.7 }, affect: { shame: 0.4 } },
      },
    ],
  },
  {
    id: "shd-05",
    kind: "forced-choice",
    section: "shadow",
    prompt: "The trait you most silently resent in others —",
    options: [
      {
        id: "a",
        label: "is a version of something you have not let yourself have.",
        delta: { affect: { desire: 0.7 }, narrative: { liminal: 0.4 } },
      },
      {
        id: "b",
        label: "is a version of something you will not let yourself become.",
        delta: { affect: { fear: 0.7 }, stance: { away: 0.4 } },
      },
    ],
  },
  {
    id: "shd-06",
    kind: "forced-choice",
    section: "shadow",
    prompt: "The version of you you would rather not meet —",
    options: [
      {
        id: "a",
        label: "is younger than you. Afraid, making it work.",
        delta: { affect: { fear: 0.7 }, stage: { "pre-initiation": 0.4 } },
      },
      {
        id: "b",
        label: "is older than you. Resigned, no longer reaching.",
        delta: { affect: { shame: 0.7 }, stage: { integrated: 0.3 } },
      },
    ],
  },
  {
    id: "shd-07",
    kind: "forced-choice",
    section: "shadow",
    prompt: "When you have caused harm, the repair that actually fits —",
    options: [
      {
        id: "a",
        label: "is naming it, directly, to the person.",
        delta: { stance: { toward: 0.9 } },
      },
      {
        id: "b",
        label: "is changing the pattern, quietly, over time.",
        delta: { stance: { away: 0.9 } },
      },
    ],
  },
];

// ── Complete bank ────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizItem[] = [
  ...STAGE_ITEMS,
  ...STABILITY_ITEMS,
  ...BELONGING_ITEMS,
  ...AFFECT_ITEMS,
  ...STANCE_ITEMS,
  ...NARRATIVE_ITEMS,
  ...SHADOW_ITEMS,
];

// Dev-mode guardrail — every id unique, every item well-formed.
if (process.env.NODE_ENV !== "production") {
  const ids = new Set<string>();
  for (const q of QUIZ_QUESTIONS) {
    if (ids.has(q.id)) {
      console.warn(`[quiz-questions] duplicate id: ${q.id}`);
    }
    ids.add(q.id);
    if (q.kind === "forced-choice" || q.kind === "scenario") {
      const optIds = new Set(q.options.map((o) => o.id));
      if (optIds.size !== q.options.length) {
        console.warn(`[quiz-questions] duplicate option id in ${q.id}`);
      }
    }
  }
  const expected = 12 + 7 + 7 + 10 + 10 + 7 + 7;
  if (QUIZ_QUESTIONS.length !== expected) {
    console.warn(
      `[quiz-questions] expected ${expected} items, got ${QUIZ_QUESTIONS.length}`,
    );
  }
}
