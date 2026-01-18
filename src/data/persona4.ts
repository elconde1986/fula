import type { Message, AgentStatus, Phase, AdvisorMessage, UserMessage } from '../types';

const createAdvisorMessage = (
  id: string,
  friendly: string,
  direct: string,
  options?: {
    severity?: 'Low' | 'Medium' | 'High';
    cognition?: any;
    followUpButtons?: string[];
  }
): AdvisorMessage => ({
  id,
  content: { friendly, direct },
  severity: options?.severity,
  cognition: options?.cognition,
  followUpButtons: options?.followUpButtons,
});

const createUserMessage = (id: string, content: string): UserMessage => ({
  id,
  content,
});

export const persona4Transcript: Record<Phase, Message[]> = {
  '00-02': [
    {
      type: 'user',
      data: createUserMessage('u4-1', "Models don't capture reality. Why should I trust this?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-1',
        "You shouldn't trust it blindly. I'll show assumptions and boundaries.",
        "You shouldn't. That's why we show boundaries.",
        {
          cognition: {
            signalsObserved: ['Model skepticism'],
            dataUsed: ['Model assumptions'],
            lensApplied: 'Boundary awareness',
            conclusion: 'Show boundaries, not confidence.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-1a', "Good. So what are the boundaries? Where does this model break?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-1a',
        "The model breaks when assumptions change. Income stability, burn stability, credit availability, market liquidity—these are assumptions. If any of these change—income drops, burn increases, credit freezes, markets lock—the model breaks. The boundaries are where assumptions fail.",
        "Model breaks when assumptions fail: income, burn, credit, liquidity. Those are the boundaries.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Assumption analysis', 'Model boundary mapping'],
            lensApplied: 'Assumption failure',
            conclusion: 'Models break at assumption boundaries.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-1b', "So what can you be confident about? What's the truth?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-1b',
        "The truth is runway, fixed costs, and time-to-cash. Those are facts—current liquid assets, current monthly burn, current obligations. Everything else—returns, future income, credit availability—those are guesses. I'll show you the truth, then we'll stress-test the guesses.",
        "Truth: runway, fixed costs, time-to-cash. Everything else is guesses.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Deterministic metrics', 'Uncertain assumptions'],
            lensApplied: 'Truth vs guesses',
            conclusion: 'Separate truth (runway, costs) from guesses (returns, income).',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '02-06': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-2',
        "Here are numbers we can be confident about: runway, fixed costs, time-to-cash.",
        "Runway and time-to-cash are the truth. Returns are guesses.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-2', "What assumptions are you making that I should challenge?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-3',
        "Great—challenge these: income stability, burn stability, credit availability.",
        "Challenge income, burn, credit. Those break plans.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-2a', "Why should I challenge income stability? My income is stable."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-3a',
        "Because income stability is an assumption until it's tested. Jobs end, industries contract, skills become obsolete. Income is stable until it's not. The assumption isn't wrong—it's just an assumption. Challenge it to see what happens if it breaks.",
        "Income is stable until it's not. Challenge the assumption to see failure mode.",
        {
          cognition: {
            signalsObserved: ['Income stability assumption'],
            dataUsed: ['Income volatility history', 'Job security analysis'],
            lensApplied: 'Assumption testing',
            conclusion: 'Income stability is an assumption that should be tested.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-2b', "What about burn stability? Can't I just cut expenses?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-3b',
        "You can cut some expenses. But fixed costs—mortgage, insurance, minimum debt payments—don't cut easily. Burn stability assumes fixed costs stay fixed. But if you need to cut, variable expenses are a small buffer. Fixed costs are the burn assumption.",
        "Burn stability assumes fixed costs stay fixed. Variable expenses are small buffer. Fixed costs are the assumption.",
        {
          cognition: {
            signalsObserved: ['Burn stability assumption'],
            dataUsed: ['Fixed vs variable cost ratio', 'Expense flexibility'],
            lensApplied: 'Burn assumption testing',
            conclusion: 'Burn stability depends on fixed costs staying fixed.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '06-10': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4',
        "The danger is optimizing a spreadsheet while ignoring behavior under stress.",
        "Spreadsheets lie when psychology changes.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-3', "But I can model my behavior. I know what I'll do under stress."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4a',
        "You can model your planned behavior. But under stress, behavior changes. You planned to stay disciplined, but under pressure you'll prioritize survival over plans. The spreadsheet assumes rational behavior. Stress makes behavior irrational.",
        "Spreadsheets assume rational behavior. Stress makes behavior irrational. Your model is right, your behavior changes.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Behavioral modeling confidence'],
            dataUsed: ['Behavioral research on stress', 'Stress-response patterns'],
            lensApplied: 'Behavior under stress',
            conclusion: 'Stress changes behavior regardless of planned models.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-3a', "So how do I plan if I can't model behavior?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4b',
        "You don't model behavior. You model guardrails. Instead of predicting what you'll do, you define what you'll do before stress hits. Pre-commit to actions: 'If runway drops below 3 months, I cut expenses.' That's a guardrail, not a behavior prediction.",
        "Don't model behavior. Build guardrails. Pre-commit to actions before stress hits.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Guardrail design', 'Pre-commitment strategies'],
            lensApplied: 'Guardrail approach',
            conclusion: 'Guardrails beat behavior models.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '10-14': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-5',
        "Blind spot #1: false precision",
        "Blind spot #1: false precision",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-4', "What's false precision? Like, calculating returns to two decimal places?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-5a',
        "Yes. False precision is when you calculate returns to two decimal places, or project income to the dollar, or model expenses to the penny. That precision implies accuracy that doesn't exist. The future is uncertain. Precise calculations of uncertain outcomes create false confidence.",
        "False precision: calculating uncertain outcomes precisely. Precise numbers imply accuracy that doesn't exist.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Precision vs accuracy', 'Uncertainty analysis'],
            lensApplied: 'Precision fallacy',
            conclusion: 'Precision on uncertain outcomes creates false confidence.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-6',
        "Blind spot #2: hidden dependencies",
        "Blind spot #2: hidden dependencies",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-4a', "What dependencies are hidden? Like correlation between assets?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-6a',
        "Yes. Hidden dependencies are when multiple things move together but your model treats them as independent. Your job, your equity, your brokerage, your credit—they might all depend on the same sector story. The model assumes independence. Reality has dependencies.",
        "Hidden dependencies: model assumes independence, reality has correlation. Job + equity + credit move together.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Correlation analysis', 'Dependency mapping'],
            lensApplied: 'Hidden dependency risk',
            conclusion: 'Hidden dependencies break independent assumptions.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-7',
        "Blind spot #3: assuming liquidity is a switch",
        "Blind spot #3: assuming liquidity is a switch",
        {
          followUpButtons: [
            "Show me where precision fails",
            "Show me the most fragile assumption",
            "Run the crisis drill",
          ],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-4b', "What do you mean by 'liquidity is a switch'?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-7a',
        "Assuming liquidity is a switch means thinking you can turn assets into cash instantly, like flipping a switch. But liquidity isn't a switch—it's a ladder. Some assets convert quickly (checking), some slowly (brokerage), some very slowly (retirement). The switch assumption breaks when you need cash fast and only slow-converting assets are available.",
        "Liquidity isn't a switch—it's a ladder. Switch assumption breaks when you need cash fast but only slow assets are available.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Time-to-cash ladder', 'Liquidity timing'],
            lensApplied: 'Liquidity assumption testing',
            conclusion: 'Liquidity is a ladder, not a switch.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8',
        'Blind spot #Tax: Show me exactly what assumptions you are using for taxes.',
        'Blind spot #Tax: Here are the assumptions and why they matter. This is illustrative, not advice.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-5', "Show me exactly what assumptions you're using for taxes."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8a',
        "Here are the assumptions and why they matter. This is illustrative, not advice.",
        "Here are assumptions. If you disagree, change them. Don't ignore them.",
        {
          cognition: {
            signalsObserved: ['User wants model transparency'],
            dataUsed: ['Holding period labels', 'Basis vs market', 'Bracket label'],
            lensApplied: 'Model boundary transparency',
            conclusion: 'We model tax friction explicitly; we do not hide it.',
            confidenceCaveats: 'Illustrative ranges only; confirm with a CPA.',
          },
          followUpButtons: ['Show tax impact'],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-6', "Why are you using ranges instead of a point estimate?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8b',
        "Because point estimates create false confidence. The exact number is less important than whether the decision survives reasonable uncertainty.",
        "Point estimates are how people lie to themselves. Ranges reflect reality.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Precision vs accuracy analysis'],
            lensApplied: 'Anti-false-precision',
            conclusion: 'Decision robustness > precise forecast.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-7', "Talk to me about unrealized gains. Why do people obsess over them?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8c',
        "Because unrealized gains feel like money. But they're not cash, and selling turns them into a bill. The obsession creates two mistakes: tax lock-in and panic selling.",
        "Unrealized gains are not spendable without consequences. People either get locked in or they sell under pressure.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Unrealized gain psychology', 'Tax lock-in patterns'],
            lensApplied: 'Behavioral + tax friction',
            conclusion: 'Unrealized gains create lock-in or panic—both destroy planning.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '14-18': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8',
        "base/bad/ugly are narratives not probabilities",
        "base/bad/ugly are narratives not probabilities",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-5', "Why narratives instead of probabilities? Don't probabilities give better information?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-8a',
        "Probabilities imply precision we don't have. 'There's a 18% chance of failure' sounds precise, but it's not—we don't know the real probability. Narratives—'here's what happens if this story breaks'—are more honest. They show outcomes without fake precision.",
        "Probabilities imply false precision. Narratives show outcomes without fake precision. More honest.",
        {
          cognition: {
            signalsObserved: ['Probability preference'],
            dataUsed: ['Precision vs narratives', 'Uncertainty communication'],
            lensApplied: 'Narrative vs probability',
            conclusion: 'Narratives are more honest than false-probability claims.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-9',
        "purpose: expose pressure points",
        "purpose: expose pressure points",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-5a', "What are pressure points? Like where the plan breaks?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-9a',
        "Yes. Pressure points are where assumptions fail and options narrow. Where income drops and credit freezes. Where liquidity disappears and choices compress. Pressure points expose fragility. We simulate them to build resilience, not to predict probabilities.",
        "Pressure points: where assumptions fail, options narrow, choices compress. We simulate them to build resilience.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Failure mode analysis', 'Pressure point identification'],
            lensApplied: 'Pressure point analysis',
            conclusion: 'Pressure points expose fragility and build resilience.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '18-22': [
    {
      type: 'user',
      data: createUserMessage('u4-6', "Try to talk me out of relying on the model."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-10',
        "Models are useful until they create confidence. Confidence is the failure.",
        "Your model is not wrong. Your confidence is wrong.",
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-6a', "But if my model is right, why shouldn't I be confident?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-10a',
        "Your model is right about the math. But it's wrong about assumptions. The math is deterministic. The assumptions—income stability, burn stability, credit availability—those are uncertain. Confidence in uncertain assumptions is the failure. The model is right. Your confidence in assumptions is wrong.",
        "Model math is right. Assumptions are uncertain. Confidence in uncertain assumptions is the failure.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Model confidence'],
            dataUsed: ['Assumption uncertainty', 'Model vs assumptions'],
            lensApplied: 'Confidence fallacy',
            conclusion: 'Confidence in uncertain assumptions is the failure.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-6b', "So what should I do? Not use models at all?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-10b',
        "Use models as tools, not comfort. Models show what happens if assumptions hold. They don't show what happens if assumptions break. Build guardrails around assumptions. Define actions if assumptions fail. That's how you use models without false confidence.",
        "Use models as tools, not comfort. Build guardrails around assumptions. Define actions if assumptions break.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Guardrail design', 'Assumption failure planning'],
            lensApplied: 'Model as tool',
            conclusion: 'Use models as tools with guardrails, not as comfort with confidence.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '22-25': [
    {
      type: 'user',
      data: createUserMessage('u4-8', "So what guardrails do I need? Give me the model boundaries."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-11',
        "Conditions framed as \"guardrails not forecasts\":\n\n- maintain minimum runway\n- define time-to-cash ladder\n- pre-commit stress actions\n- set decision triggers",
        "Guardrails not forecasts:\n\n- Minimum runway\n- Time-to-cash ladder\n- Pre-commit stress actions\n- Decision triggers",
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-9', "And what about tax guardrails? What are the model boundaries for taxes?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-13',
        'Tax guardrails (model-based, not advice):',
        'Tax guardrails. Follow them.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-14',
        "Tax conditions (with consequences):\n\n1) Never trigger a large realization without reserving cash for taxes.\n   Consequence: Avoid surprise bills that compress liquidity.\n\n2) Prefer rebalancing in tax-advantaged accounts first.\n   Consequence: Reduce unnecessary realized gains.\n\n3) Treat harvesting as an optimization, not a dependency.\n   Consequence: Avoid relying on losses that may not exist when needed.\n\n4) Document the assumptions you are relying on before executing.\n   Consequence: Maintain model transparency and avoid false precision.\n\n5) Ask a CPA about state-specific and property-specific rules.\n   Consequence: Avoid hidden complexity that breaks assumptions.",
        "Tax conditions:\n\n1) Reserve cash for taxes if large realization. Consequence: Avoid surprise bills.\n2) Rebalance tax-advantaged first. Consequence: Reduce realized gains.\n3) Harvesting is optimization, not dependency. Consequence: Don't rely on losses.\n4) Document assumptions before executing. Consequence: Maintain transparency.\n5) Ask CPA about state/property rules. Consequence: Avoid hidden complexity.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-10', "So the guardrails are about maintaining transparency and avoiding false precision. That's the model boundary?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-14a',
        "Yes. The model boundary is where assumptions become uncertain. Guardrails define what happens when assumptions break. Transparency means documenting assumptions before executing, not after.",
        "Model boundary = where assumptions break. Guardrails define actions when assumptions break. Transparency = document assumptions before executing.",
      ),
    },
  ],
  '25-28': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-12',
        "Crisis script:\n\n- credit frozen\n- brokerage down\n- cash needed in 14 days\n- forced to choose among bad options",
        "Crisis:\n\n- Credit frozen\n- Brokerage down\n- Cash needed 14 days\n- Forced bad choices",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-7', "This crisis script—is this likely to happen?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-12a',
        "Likelihood isn't the point. The point is: if it happens, are you prepared? This crisis script happens to someone every year—not you necessarily, but someone. We simulate it so it doesn't have to be you. Preparedness, not probability.",
        "Likelihood is irrelevant. If it happens, are you prepared? We simulate it so it doesn't have to be you.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Probability focus'],
            dataUsed: ['Historical crisis frequency', 'Tail risk analysis'],
            lensApplied: 'Preparedness over probability',
            conclusion: 'Prepare for tail risks, not just probabilities.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-13',
        "This is why access matters more than value.",
        "This is why net worth is irrelevant without access.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-7a', "But I have high net worth. Shouldn't that protect me?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-13a',
        "High net worth protects you if you can access it. But if credit is frozen, brokerage is down, and you need cash in 14 days, high net worth doesn't help. Access matters more than value. Net worth is value. Runway is access. We care about access.",
        "Net worth is value. Runway is access. In crisis, access matters, not value.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Net worth confidence'],
            dataUsed: ['Access vs value analysis', 'Crisis liquidity'],
            lensApplied: 'Access over value',
            conclusion: 'Access matters more than value in crisis.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '28-30': [
    {
      type: 'user',
      data: createUserMessage('u4-11', "So what's your final stance? What should I prioritize—optimization or guardrails?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-14',
        "My stance: use models as tools, not comfort. Build guardrails.",
        "My stance: guardrails first. Then optimize.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-12', "So guardrails first, then optimize. That's the order—safety then performance?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-14a',
        "Exactly. Guardrails first—define what happens when assumptions break. Then optimize within those guardrails. Optimization without guardrails is just gambling with precision.",
        "Guardrails first (define failure modes), then optimize within guardrails. Optimization without guardrails = gambling.",
      ),
    },
  ],
};

export const persona4Agents: Record<Phase, AgentStatus[]> = {
  '00-02': [
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Income: $210k/year | Monthly burn: $11k | Fixed costs: $4,700/month | Assumptions: Income stable, burn stable, credit available',
      computation: 'Deterministic calculations: Runway = $40k / $11k = 3.64 months | Fixed cost ratio = $4,700 / $11k = 42.7% | High confidence metrics identified',
      outputs: 'Deterministic calculations: Runway 3.64 months, Fixed costs 42.7% | Assumptions documented: Income/burn/credit stability',
    },
    {
      name: 'Correlation Mapper',
      status: 'Mapping',
      inputs: 'Job sector: Mixed | Investments: Diversified | Dependencies: Moderate',
      computation: 'Dependency mapping: Correlation score = 0.38 (moderate) | Dependencies: Job independent of assets (good) | Risk: Moderate correlation stacking',
      outputs: 'Dependencies mapped: Correlation 0.38 (moderate) | Risk: Moderate correlation, manageable',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Time-to-cash: Checking (0-7 days), Savings (7-30 days), Brokerage (30-90 days), Retirement (90+ days)',
      computation: 'Time-to-cash ladder: Immediate ($15k), 30-day ($40k), 90-day ($230k), 90+ days ($180k) | Stress test: Credit unavailable, brokerage down 30%',
      outputs: 'Time-to-cash calculated: Immediate $15k, 30-day $40k, 90-day $230k | Under stress: Only $40k accessible in 30 days',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Model confidence: High | Assumption certainty: High | Precision preference: High',
      computation: 'Confidence bias check: Model confidence (0.78) > Assumption certainty (0.45) = False confidence detected | Precision bias: Overweights precision on uncertain assumptions',
      outputs: 'Confidence bias checked: False confidence detected (0.78 vs 0.45) | Risk: Overweights model precision on uncertain assumptions',
    },
  ],
  '02-06': [
    {
      name: 'Profile Analyzer',
      status: 'Completed',
      inputs: 'Runway: 3.64 months | Fixed costs: $4,700/month (42.7%) | Time-to-cash: $15k immediate, $40k in 30 days',
      computation: 'Confidence interval: Runway (high confidence: $40k / $11k = 3.64 months) | Fixed costs (high confidence: current obligations) | Returns (low confidence: uncertain) | Income stability (medium confidence: assumption)',
      outputs: 'High confidence metrics: Runway (3.64 months), Fixed costs ($4,700), Time-to-cash (ladder calculated) | Low confidence: Returns, income stability (assumptions)',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Assumption challenges: Income stability, burn stability, credit availability',
      computation: 'Assumption testing: Income stability (assumption: stable, test: job loss risk), Burn stability (assumption: $11k, test: expenses can increase), Credit availability (assumption: available, test: credit freezes)',
      outputs: 'Assumption tests: Income (test: job loss), Burn (test: expense increase), Credit (test: freeze) | All assumptions should be challenged',
    },
  ],
  '06-10': [
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Spreadsheet assumptions: Rational behavior, Stable expenses, Consistent savings, Market liquidity available',
      computation: 'Stress behavior analysis: Under stress, 82% of users abandon planned savings, 67% increase credit usage, 91% prioritize survival over plans | Spreadsheet assumes rational behavior, reality changes under stress',
      outputs: 'Spreadsheet assumptions break under stress: Rational behavior (82% abandon plans), Stable expenses (67% increase credit), Consistent savings (breaks under stress)',
    },
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Current plan: Maintain $11k burn, Save $4k/month | Stress scenario: Burn increases, savings pause',
      computation: 'Plan vs stress: Planned behavior assumes $11k burn + $4k savings | Stress behavior: Burn $13k, savings $0 (plan breaks)',
      outputs: 'Plan vs stress gap: Planned ($11k burn + $4k savings) vs Stress ($13k burn + $0 savings) | Spreadsheet breaks under stress',
    },
  ],
  '10-14': [
    {
      name: 'Profile Analyzer',
      status: 'Checking',
      inputs: 'Model precision claims: Returns calculated to 2 decimals, Income projected to dollar, Expenses modeled to penny',
      computation: 'Precision failure analysis: Returns (2 decimal precision on uncertain outcome), Income (precise projection of uncertain future), Expenses (precise model of variable costs) | False precision: Precise calculations of uncertain assumptions',
      outputs: 'False precision identified: Returns (2 decimals), Income (dollar precision), Expenses (penny precision) on uncertain assumptions | Risk: Precision implies accuracy that does not exist',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Hidden dependencies: Job + equity + credit + brokerage',
      computation: 'Dependency analysis: Model assumes independence, but correlation = 0.38 (moderate) | Hidden dependencies: Job loss can correlate with market drop, credit freeze',
      outputs: 'Hidden dependencies detected: Correlation 0.38 (model assumes 0) | Risk: Model independence assumption may be false',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Liquidity switch assumption: All assets convertible instantly',
      computation: 'Liquidity reality: Checking (0-7 days), Savings (7-30 days), Brokerage (30-90 days + market risk), Retirement (90+ days + penalties) | Switch assumption breaks: Cannot convert all assets instantly',
      outputs: 'Liquidity switch assumption false: Assets have different time-to-cash (7 to 90+ days) | Reality: Liquidity is ladder, not switch',
    },
  ],
  '14-18': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Simulating',
      inputs: 'Base: Assumptions hold | Bad: One assumption breaks | Ugly: Multiple assumptions break',
      computation: 'Pressure point exposure: Base (no pressure), Bad (pressure on one assumption), Ugly (pressure on multiple assumptions) | Pressure points: Income drop, burn increase, credit freeze, market lock',
      outputs: 'Pressure points exposed: Income drop (pressure on income assumption), Burn increase (pressure on burn assumption), Credit freeze (pressure on credit assumption), Market lock (pressure on liquidity assumption)',
    },
    {
      name: 'Profile Analyzer',
      status: 'Simulating',
      inputs: 'Base/Bad/Ugly: Assumption holding vs breaking',
      computation: 'Narrative analysis: Base (assumptions hold, runway maintains), Bad (one assumption breaks, runway drops), Ugly (multiple assumptions break, runway collapses) | Narratives show outcomes without fake probability precision',
      outputs: 'Narrative outcomes: Base (runway maintains), Bad (runway drops), Ugly (runway collapses) | Pressure points exposed in each narrative',
    },
  ],
  '18-22': [
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Model confidence: High (0.78) | Assumption certainty: Low (0.45) | Precision: High (2 decimals)',
      computation: 'Confidence vs certainty analysis: Model confidence (0.78) > Assumption certainty (0.45) = False confidence gap of 0.33 | Confidence in uncertain assumptions is the failure',
      outputs: 'Confidence is the failure: Model confidence (0.78) exceeds assumption certainty (0.45) by 0.33 | False confidence detected',
    },
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Model precision: Returns to 2 decimals, Income to dollar | Assumption uncertainty: High',
      computation: 'Precision vs uncertainty mismatch: Model calculates precisely (2 decimals), but assumptions are uncertain (high variance) | False precision creates false confidence',
      outputs: 'Precision vs uncertainty mismatch: Precise calculations on uncertain assumptions | Risk: False precision creates false confidence',
    },
  ],
  '22-25': [
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Guardrail conditions: Minimum runway (3 months), Time-to-cash ladder defined, Pre-commit stress actions, Decision triggers set',
      computation: 'Guardrail validation: Minimum runway (PASS: 3.64 months > 3 months), Time-to-cash (PASS: ladder defined), Stress actions (FAIL: not pre-committed), Decision triggers (FAIL: not set)',
      outputs: 'Guardrails defined: 2 PASS (runway, time-to-cash), 2 FAIL (stress actions, decision triggers) | Need to pre-commit stress actions and set triggers',
    },
    {
      name: 'Tax Strategist',
      status: 'Completed',
      inputs: 'Funding requirements, holding periods, bracket label, state',
      computation: 'Tax guardrail validation: Tax reserve (FAIL if not reserved), Rebalancing preference (PASS if tax-advantaged first), Harvesting dependency (FAIL if treated as dependency), Assumption documentation (FAIL if not documented), CPA consultation (FAIL if not consulted for complex rules)',
      outputs: 'Tax guardrails: 1 PASS, 4 checks needed | Risk: Tax assumptions not documented, CPA not consulted | Recommendation: Document tax assumptions, consult CPA for state/property rules',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Guardrail approach: Pre-commit to actions before stress',
      computation: 'Guardrail vs model: Guardrails define actions before stress (better) vs models predict behavior (worse) | Guardrails beat behavior models',
      outputs: 'Guardrail approach validated: Pre-committing actions before stress beats predicting behavior | Recommendation: Use guardrails, not behavior models',
    },
  ],
  '25-28': [
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Crisis: Need $35k in 14 days | Net worth: $410k | Accessible: $40k (in 30 days), $15k (immediate)',
      computation: 'Access vs value: Net worth $410k (value), but only $15k accessible in 14 days (access) | Access gap: $395k (96%) locked in illiquid assets | Access matters more than value in crisis',
      outputs: 'Access matters more than value: $410k net worth but only $15k accessible in 14 days | Access gap: $395k (96%) locked | In crisis, access beats value',
    },
    {
      name: 'Profile Analyzer',
      status: 'Simulating',
      inputs: 'Crisis script: Credit frozen, Brokerage down 30%, Cash needed in 14 days',
      computation: 'Crisis drill: Need $35k in 14 days, Only $15k accessible immediately (covers 43%), Gap of $20k forces bad choices (sell at discount, borrow expensive, or delay)',
      outputs: 'Crisis drill: $35k needed, $15k available (43% covered) | $20k gap forces bad choices | This is why access matters more than value',
    },
  ],
  '28-30': [
    {
      name: 'Profile Analyzer',
      status: 'Completed',
      inputs: 'Final assessment: False precision identified, Hidden dependencies detected, Liquidity switch assumption false, Confidence bias detected',
      computation: 'Stance determination: Use models as tools with guardrails, not as comfort with confidence | Build guardrails around assumptions | Define actions if assumptions break',
      outputs: 'Stance: Guardrails first | Use models as tools, not comfort | Build guardrails around assumptions, define actions if assumptions break',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Completed',
      inputs: 'Final bias check: Model confidence (0.78), Assumption certainty (0.45), Precision preference (high)',
      computation: 'Final recommendation: Separate truth (runway, fixed costs) from guesses (returns, income) | Build guardrails on guesses | Do not create false confidence through precision',
      outputs: 'Final recommendation: Separate truth from guesses | Build guardrails on guesses | Avoid false confidence through precision',
    },
  ],
};
