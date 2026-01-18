import { useState } from 'react';
import { useFulaStore } from '../store';
import { personas } from '../data/personas';
import { calculatePAWRatio } from '../utils/calculators';

interface PersonalityData {
  archetype: string;
  corePersonality: string;
  moneyStory: string;
  howYouTalk: string[];
  defaultBeliefs: string[];
  behavioralPatterns: string[];
  strengths: string[];
  failureModes: string[];
  whatFulaMustDo: string[];
  stressTrigger: string;
  typicalReaction: string;
  badDecisionImpulse: string;
  fulaCountermeasure: string;
  // New sections
  habitsOperatingSystem: string[];
  spendingInvestingPattern: string[];
  stressBehaviorRecovery: {
    stressBehavior: string[];
    recoveryBehavior: string;
  };
  howFulaShouldCommunicate: string[];
}

const personaPersonalityData: Record<string, PersonalityData> = {
  '1': {
    archetype: 'High-income UAW tendency (Under Accumulator of Wealth) unless intentionally constrained',
    corePersonality: 'Conscientious, reflective, responsibility-driven, mildly anxious.',
    moneyStory: 'You learned that stability is earned, not granted. You have seen smart people get blindsided by timing, layoffs, or family needs. Your financial decisions are shaped by a desire to avoid regret more than a desire to maximize returns. You value calm over flex.',
    howYouTalk: [
      '"Is this too conservative?"',
      '"I know the math, but I still feel uneasy."',
      '"Am I overthinking this?"',
    ],
    defaultBeliefs: [
      '"If I can just make the right decisions, I can eliminate risk."',
      '"Being responsible means never being surprised."',
      '"I should be able to explain every choice logically."',
    ],
    behavioralPatterns: [
      '*Psychology of Money — uncertainty & tail risk:* You intellectually accept uncertainty, but emotionally you want it contained.',
      '*Millionaire Next Door — UAW drift:* Your income enables lifestyle creep that feels "reasonable" because it\'s incremental.',
      '*Behavioral finance — loss aversion:* You overweight downside scenarios and seek reassurance through planning.',
    ],
    strengths: [
      'You can follow disciplined systems.',
      'You are willing to delay gratification if the logic is clear.',
      'You respond well to clarity and guardrails.',
    ],
    failureModes: [
      'Quiet obligation creep: subscriptions, upgrades, bigger mortgage, "justified" lifestyle inflation.',
      'Buffer erosion through "good reasons."',
      'Analysis fatigue: too much optimization leads to stalled decisions.',
    ],
    whatFulaMustDo: [
      'Provide calm, transparent reasoning.',
      'Translate risk into *choice* and *runway*.',
      'Show "Paper vs Stress" so you can see why the unease is rational.',
      'Use peer framing: "People like you fail quietly this way."',
    ],
    stressTrigger: 'Income uncertainty or unexpected expense',
    typicalReaction: 'Seek more information and reassurance; may delay decisions while gathering data',
    badDecisionImpulse: 'Lock in obligations to "feel secure" (bigger house, more insurance, longer commitments)',
    fulaCountermeasure: 'Show runway visualization and time-to-cash ladder to demonstrate what security actually looks like',
    habitsOperatingSystem: [
      'You maintain a "responsibility calendar": bills, renewals, insurance, and family obligations are tracked like work deadlines.',
      'You review finances monthly, often at night, and you feel a small relief after reconciling everything.',
      'You keep multiple accounts "for safety" (checking, savings, backup savings) and like seeing buffers.',
      'You invest consistently, but you check balances more often than you admit because you want reassurance.',
      'You prefer rules: automated transfers, thresholds, and "if-then" decisions.',
    ],
    spendingInvestingPattern: [
      'You spend freely on convenience that reduces cognitive load (delivery, time-saving services, higher-quality basics).',
      'You justify upgrades as "reasonable" because they don\'t feel like luxury compared to peers.',
      'You avoid obvious status signaling, but you unintentionally increase baseline lifestyle cost through incremental upgrades.',
      'You diversify broadly, but you may carry hidden concentration through real estate exposure or a single employer.',
      'You value "safe" allocations, but you may underweight the invisible cost of tax drag and fixed obligations.',
    ],
    stressBehaviorRecovery: {
      stressBehavior: [
        'Under stress, you seek clarity by making spreadsheets, lists, and scenarios.',
        'You become more conservative and delay decisions until you feel certain—sometimes too long.',
        'You may cut discretionary spending quickly, but the fixed costs are the real constraint.',
      ],
      recoveryBehavior: 'Recovery behavior: you feel calm when you have explicit guardrails and a clear runway number.',
    },
    howFulaShouldCommunicate: [
      'Calm, structured explanations with clear guardrails and thresholds.',
      'Show "Paper vs Stress" comparisons to validate the unease rationally.',
      'Emphasize overlap risk and timing risk without sounding alarmist.',
      'When recommending action, tie it to preserving choice and reducing permanent obligations.',
    ],
  },
  '2': {
    archetype: 'PAW-capable, but only if survival capital is protected from the bets',
    corePersonality: 'Competitive, decisive, conviction-led, comfortable with volatility.',
    moneyStory: 'You associate wealth with autonomy and winning. You likely experienced a moment where a bold decision paid off and reinforced the belief that conviction is a multiplier. You are not reckless; you are outcome-driven. Your blind spot is that outcomes are not always repeatable.',
    howYouTalk: [
      '"This is a calculated risk."',
      '"If it works, it changes everything."',
      '"What\'s the probability we\'re wrong?"',
    ],
    defaultBeliefs: [
      '"Big upside requires bold moves."',
      '"Playing safe is a slow death."',
      '"I can solve problems as they happen."',
    ],
    behavioralPatterns: [
      '*Psychology of Money — luck & risk:* You respect risk but underweight how much luck shaped your best outcomes.',
      '*Millionaire Next Door — PAW behavior in pockets:* You can accumulate aggressively, but concentration risk can undo it fast.',
      '*Behavioral finance — overconfidence & narrative bias:* You commit strongly to a story, then seek confirming evidence.',
    ],
    strengths: [
      'You act quickly when opportunity appears.',
      'You can tolerate volatility without panic.',
      'You are willing to take discomfort today for upside later.',
    ],
    failureModes: [
      'Dependency stacking: job risk + asset risk + credit risk align.',
      'Liquidity illusion: assuming capital is available "when needed."',
      'Identity risk: a failed bet forces lifestyle compression you didn\'t plan for.',
    ],
    whatFulaMustDo: [
      'Respect upside, then map dependencies.',
      'Separate survival vs growth capital visually.',
      'Show overlap risk and "forced move" scenarios.',
      'Use blunt language when needed: "confidence peaks before concentration breaks."',
    ],
    stressTrigger: 'Multiple simultaneous failures or concentration risk materializing',
    typicalReaction: 'Double down on conviction; seek confirming evidence for the bet',
    badDecisionImpulse: 'Borrow against future success to maintain current lifestyle during disruption',
    habitsOperatingSystem: [
      'You operate in "opportunity mode": you scan for high-upside moves and act quickly when conviction hits.',
      'You review finances in bursts—before decisions, after wins, and during stress—not as a steady routine.',
      'You keep mental models of risk, but you dislike being slowed down by administrative details.',
      'You are comfortable with ambiguity and tend to believe you can solve problems as they arise.',
      'You maintain a personal narrative about why your bets are rational; you seek evidence that supports it.',
    ],
    spendingInvestingPattern: [
      'You spend aggressively when it increases leverage, speed, or optionality for the next opportunity.',
      'You dislike "waste," but you will spend on tools, advisors, or assets that you believe compound.',
      'You tolerate volatility and may maintain a concentrated position that dominates your net worth.',
      'You often treat liquidity as secondary to upside—until you feel constrained.',
      'You may postpone diversification because taxes make selling feel like "losing."',
    ],
    stressBehaviorRecovery: {
      stressBehavior: [
        'Under stress, you become more decisive, not less; you may double down to regain control.',
        'You can rationalize increased risk as "necessary" to recover faster.',
        'The danger: correlation stacking (credit tightens, markets down, income volatile) forces a move.',
      ],
      recoveryBehavior: 'Recovery behavior: you feel calm when survival capital is ring-fenced and protected from bets.',
    },
    howFulaShouldCommunicate: [
      'Respect upside first, then immediately map dependencies and forced-move risk.',
      'Use blunt language when necessary: "confidence peaks before concentration breaks."',
      'Show dependency maps and survival vs growth buckets.',
      'Give conditions that feel like "rules of the game," not emotional caution.',
    ],
    fulaCountermeasure: 'Show dependency map and overlap scenarios; separate survival capital from growth bets',
  },
  '3': {
    archetype: 'PAW tendency (Prodigious Accumulator of Wealth) through lifestyle restraint and optionality',
    corePersonality: 'Calm, patient, minimalist-leaning, autonomy-driven.',
    moneyStory: 'You value control of your time more than status. You believe the highest return is the ability to say "no." You may have watched someone get trapped by golden handcuffs or obligations, and you decided early that peace is a priority.',
    howYouTalk: [
      '"Does this buy freedom or complexity?"',
      '"What does this cost me in time?"',
      '"I don\'t want to feel trapped."',
    ],
    defaultBeliefs: [
      '"Optionality is fragile."',
      '"The best plan is the one that preserves choices."',
      '"Enough is a decision, not a number."',
    ],
    behavioralPatterns: [
      '*Psychology of Money — \'enough\' & compounding:* You understand that survival enables compounding.',
      '*Millionaire Next Door — PAW discipline:* You avoid status spending and prioritize savings rate.',
      '*Behavioral finance — opportunity cost sensitivity:* You think in tradeoffs and reversible decisions.',
    ],
    strengths: [
      'High savings discipline is easier for you.',
      'You avoid lifestyle inflation by default.',
      'You\'re resilient under uncertainty because you maintain buffers.',
    ],
    failureModes: [
      'Over-caution: delaying good moves because you dislike commitments.',
      'Under-investing in growth due to preference for safety.',
      'Saying yes to "reasonable" obligations that slowly harden.',
    ],
    whatFulaMustDo: [
      'Convert choices into months of runway gained/lost.',
      'Use timeline visuals and "freedom date" shifts.',
      'Emphasize reversibility and decision-space.',
      'Make tradeoffs explicit without pressuring action.',
    ],
    stressTrigger: 'Being forced into a commitment or losing optionality',
    typicalReaction: 'Retreat to safety; may delay all decisions to preserve status quo',
    badDecisionImpulse: 'Over-invest in "safe" assets while underinvesting in growth, limiting long-term freedom',
    fulaCountermeasure: 'Show freedom timeline shifts and demonstrate which moves are reversible vs permanent',
    habitsOperatingSystem: [
      'You run life like a simplicity system: fewer commitments, fewer obligations, fewer recurring decisions.',
      'You track runway and recurring expenses more than net worth because you care about independence.',
      'You review finances routinely (weekly or biweekly) but in a calm way; it\'s maintenance, not obsession.',
      'You use automation to protect optionality: automatic investing, but also automatic buffer building.',
      'You prefer reversible decisions and often ask "Can I undo this easily?"',
    ],
    spendingInvestingPattern: [
      'You spend intentionally on health, time, and experiences that increase life quality without creating obligations.',
      'You avoid lifestyle inflation and status purchases; you don\'t want to "need" your income.',
      'You keep buffers and dislike converting liquidity into illiquid assets unless it clearly buys freedom.',
      'You invest consistently and think in decades, but you avoid complexity that adds management burden.',
      'You\'re sensitive to hidden costs: taxes, fees, maintenance, and future commitment creep.',
    ],
    stressBehaviorRecovery: {
      stressBehavior: [
        'Under stress, you simplify: reduce commitments, cut optional expenses, protect buffers.',
        'You may become too cautious and delay good opportunities because you fear losing optionality.',
        'Your biggest fear is being trapped by a decision that becomes permanent.',
      ],
      recoveryBehavior: 'Recovery behavior: you feel calm when your freedom date is stable or improving and obligations remain reversible.',
    },
    howFulaShouldCommunicate: [
      'Translate decisions into months of freedom gained/lost and impact on choice.',
      'Use timeline visuals and "freedom date" shifts.',
      'Emphasize reversibility and decision space.',
      'Encourage action only when it increases optionality or meaningfully accelerates freedom.',
    ],
  },
  '4': {
    archetype: 'Variable: can be PAW or UAW depending on whether optimization serves behavior or ego',
    corePersonality: 'Analytical, precise, independent thinker, low tolerance for marketing.',
    moneyStory: 'You don\'t trust certainty. You\'ve seen "smart" systems fail. You want to understand assumptions, boundaries, and failure modes. You prefer intellectual honesty over inspirational narratives. You\'re comfortable with complexity, but you can confuse precision with control.',
    howYouTalk: [
      '"What assumptions are baked into this?"',
      '"Where does this model break?"',
      '"Show me the boundaries."',
    ],
    defaultBeliefs: [
      '"If I can model it, I can manage it."',
      '"Most people oversimplify risk."',
      '"Clarity comes from better definitions."',
    ],
    behavioralPatterns: [
      '*Psychology of Money — uncertainty:* You accept uncertainty intellectually, but you fight it by refining models.',
      '*Millionaire Next Door — discipline vs display:* You dislike flashy consumption, but may "spend" on complexity.',
      '*Behavioral finance — control bias:* You may overrate the value of precision in unpredictable environments.',
    ],
    strengths: [
      'Strong systems thinking and risk awareness.',
      'You can maintain discipline when rules are explicit.',
      'You learn quickly from disconfirming evidence.',
    ],
    failureModes: [
      'False precision creates false confidence.',
      'Analysis paralysis when inputs are imperfect.',
      'Over-engineering the plan rather than committing to behavior.',
    ],
    whatFulaMustDo: [
      'Display assumption tables and model boundaries up front.',
      'Separate what is known vs uncertain.',
      'Emphasize guardrails over forecasts.',
      'Avoid glossy visuals that imply certainty.',
    ],
    stressTrigger: 'Incomplete information or model breakdown',
    typicalReaction: 'Dive deeper into analysis; seek more precision and data',
    badDecisionImpulse: 'Delay all decisions until perfect data is available, or over-complicate simple choices',
    fulaCountermeasure: 'Show assumption table and model boundaries; emphasize guardrails over precision',
    habitsOperatingSystem: [
      'You maintain a "systems view" of money: inputs, outputs, constraints, assumptions.',
      'You track finances with tools/spreadsheets and refine models over time.',
      'You read and compare sources; you dislike advice that lacks explicit assumptions.',
      'You run scenario analysis and want to know the boundaries of every recommendation.',
      'You may over-invest in planning because planning feels like control.',
    ],
    spendingInvestingPattern: [
      'You avoid flashy spending; you prefer spending that increases capability or reduces risk.',
      'You\'re willing to spend on information, tools, and optimization (software, analysis, research).',
      'You value diversification conceptually but may keep complexity that hides practical fragility.',
      'You are sensitive to tax drag and realization events; you want net-of-tax clarity.',
      'You tend to treat decisions as engineering problems and can underweight emotions and timing.',
    ],
    stressBehaviorRecovery: {
      stressBehavior: [
        'Under stress, you seek more data and refine assumptions; you may delay action awaiting certainty.',
        'You can become rigid: "If the model isn\'t clear, we shouldn\'t act."',
        'The risk: false precision and analysis paralysis.',
      ],
      recoveryBehavior: 'Recovery behavior: you feel calm when the model boundaries are explicit and guardrails are defined.',
    },
    howFulaShouldCommunicate: [
      'Lead with model boundaries, not conclusions.',
      'Use assumption tables, ranges, and pressure points.',
      'Avoid glossy certainty; emphasize robustness.',
      'Provide guardrails and triggers rather than forecasts.',
    ],
  },
};

export default function Profile() {
  const { personaId, setPersona } = useFulaStore();
  const [activeTab, setActiveTab] = useState<'account' | 'personality' | 'stress'>('account');
  const currentPersona = personas.find((p) => p.id === personaId);

  if (!personaId || !currentPersona) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center py-12 text-gray-900">
          <p className="text-xl font-semibold mb-4">No Persona Selected</p>
          <p className="text-gray-600 mb-6">Please select a persona from the home page to view their profile, or choose one below:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setPersona(p.id as any)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const profile = currentPersona.profile;
  const pawResult = calculatePAWRatio(profile);
  const personality = personaPersonalityData[currentPersona.id];
  
  if (!personality) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center py-12 text-gray-900">
          <p className="text-xl font-semibold mb-4">Personality Data Not Found</p>
          <p className="text-gray-600">Personality data for this persona is not available.</p>
        </div>
      </div>
    );
  }

  const archetypeColors = {
    PAW: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Average: 'bg-gray-100 text-gray-800 border-gray-300',
    UAW: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{currentPersona.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${archetypeColors[pawResult.label]}`}>
            {pawResult.label}
          </span>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'account'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Account Profile
            </button>
            <button
              onClick={() => setActiveTab('personality')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'personality'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Personality & Money Story
            </button>
            <button
              onClick={() => setActiveTab('stress')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'stress'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Behavior Under Stress
            </button>
          </div>
        </div>
      </div>

      {/* Account Profile Tab */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Sample Profile: {currentPersona.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Basic Info</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Age: {profile.age}</li>
                <li>Pre-tax Income: ${profile.pretaxIncome.toLocaleString()}/year</li>
                <li>Net Worth: ${profile.netWorth.toLocaleString()}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Accounts</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Checking: ${profile.checking.toLocaleString()}</li>
                <li>Savings: ${profile.savings.toLocaleString()}</li>
                <li>Brokerage: ${profile.brokerage.toLocaleString()}</li>
                <li>Retirement: ${profile.retirement.toLocaleString()}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Obligations</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Monthly Burn: ${profile.monthlyBurn.toLocaleString()}</li>
                <li>Mortgage PITI: ${profile.mortgagePITI.toLocaleString()}</li>
                <li>Credit Card Mins: ${profile.creditCardMins.toLocaleString()}</li>
                <li>Other Debt: ${profile.otherDebt.toLocaleString()}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Liquid Assets: ${(profile.checking + profile.savings).toLocaleString()}</li>
                <li>Total Debt: ${(profile.mortgagePITI * 12 + profile.creditCardMins * 12 + profile.otherDebt * 12).toLocaleString()}/year</li>
                <li>Debt-to-Income: {((profile.mortgagePITI * 12 + profile.creditCardMins * 12 + profile.otherDebt * 12) / profile.pretaxIncome * 100).toFixed(1)}%</li>
                <li>PAW/UAW Ratio: {pawResult.ratio.toFixed(2)} ({pawResult.label})</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            This is sample data for demonstration purposes only.
          </p>
        </div>
      )}

      {/* Personality & Money Story Tab */}
      {activeTab === 'personality' && personality && (
        <div className="space-y-6">
          {/* Archetype + Core Personality */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mb-3 ${archetypeColors[pawResult.label]}`}>
                {pawResult.label}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm font-semibold text-gray-700">Archetype:</span>
              <span className="ml-2 text-sm text-gray-600 italic">{personality.archetype}</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">Core personality:</span>
              <span className="ml-2 text-sm text-gray-600">{personality.corePersonality}</span>
            </div>
          </div>

          {/* Money Story */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Money Story (Psychology of Money)</h3>
            <p className="text-gray-700 leading-relaxed">{personality.moneyStory}</p>
          </div>

          {/* How You Talk */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How You Talk</h3>
            <ul className="space-y-2">
              {personality.howYouTalk.map((quote, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span className="italic">{quote}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Default Beliefs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Default Beliefs</h3>
            <ul className="space-y-2">
              {personality.defaultBeliefs.map((belief, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span className="italic">{belief}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Behavioral Patterns */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Behavioral Patterns (books → character)</h3>
            <ul className="space-y-2">
              {personality.behavioralPatterns.map((pattern, i) => (
                <li key={i} className="text-gray-700 text-sm leading-relaxed flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths / Failure Modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Strengths</h3>
              <ul className="space-y-2">
                {personality.strengths.map((strength, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start">
                    <span className="mr-2 text-emerald-600">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Failure Modes</h3>
              <ul className="space-y-2">
                {personality.failureModes.map((mode, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start">
                    <span className="mr-2 text-red-600">⚠</span>
                    <span>{mode}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What Fula Must Do */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What Fula Must Do for You</h3>
            <ul className="space-y-2">
              {personality.whatFulaMustDo.map((item, i) => (
                <li key={i} className="text-gray-700 text-sm flex items-start">
                  <span className="mr-2 text-blue-600">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Habits & Operating System */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Habits & Operating System</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {personality.habitsOperatingSystem.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Spending & Investing Pattern */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Spending & Investing Pattern</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {personality.spendingInvestingPattern.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Stress Behavior & Recovery */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Stress Behavior & Recovery</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Stress Behavior:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
                  {personality.stressBehaviorRecovery.stressBehavior.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-700">{personality.stressBehaviorRecovery.recoveryBehavior}</p>
              </div>
            </div>
          </div>

          {/* How Fula Should Communicate */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">How Fula Should Communicate</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {personality.howFulaShouldCommunicate.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Behavior Under Stress Tab */}
      {activeTab === 'stress' && personality && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Behavior Under Stress</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Stress Trigger</h3>
              <p className="text-gray-700">{personality.stressTrigger}</p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Typical Reaction</h3>
              <p className="text-gray-700">{personality.typicalReaction}</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Bad Decision Impulse</h3>
              <p className="text-gray-700">{personality.badDecisionImpulse}</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Fula Countermeasure</h3>
              <p className="text-gray-700">{personality.fulaCountermeasure}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
