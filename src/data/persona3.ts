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

export const persona3Transcript: Record<Phase, Message[]> = {
  '00-02': [
    {
      type: 'user',
      data: createUserMessage('u3-1', "I don't want to feel trapped. Does this decision move me closer to freedom?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-1',
        "Yes. We'll translate everything into time and choice.",
        "We measure freedom in runway and optionality. Everything else is decoration.",
        {
          cognition: {
            signalsObserved: ['Freedom-focused language'],
            dataUsed: ['Current runway', 'Obligations'],
            lensApplied: 'Freedom optimization',
            conclusion: 'Measure in time and choice.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-1a', "Good. So how do you measure freedom? What's the metric?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-1a',
        "Freedom is measured in months of runway and degrees of choice. Runway is how long you can go without income. Choice is how many options remain reversible. More runway + more reversible options = more freedom.",
        "Freedom = runway (months) + optionality (reversible choices). More of both = more freedom.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Runway calculation', 'Obligation reversibility analysis'],
            lensApplied: 'Freedom metrics',
            conclusion: 'Freedom = runway + optionality.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-1b', "I like that. It's concrete. Not just 'save more' but 'buy more time and choice.'"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-1b',
        "Exactly. Most advice focuses on net worth or returns. But freedom isn't about net worth—it's about runway and choice. You can have high net worth and low freedom if your obligations are high and your choices are locked.",
        "Freedom is runway + choice, not net worth. High net worth with locked choices is not freedom.",
        {
          cognition: {
            signalsObserved: ['Value alignment'],
            dataUsed: ['Net worth vs freedom metrics'],
            lensApplied: 'Freedom definition',
            conclusion: 'Freedom requires runway and optionality, not just net worth.',
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
        'a3-2',
        "You have meaningful runway. Your risk is not panic—it's slow re-commitment.",
        "Your risk is re-trapping yourself.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-2', "So what would you optimize first?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-3',
        "Optionality. Which means protecting buffers and keeping obligations reversible.",
        "Keep obligations reversible.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-2a', "What does 'reversible' mean? Like, canceling subscriptions?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-3a',
        "Reversible means you can exit without major cost. Subscriptions are reversible—you can cancel. Mortgages are less reversible—you can sell, but at transaction costs. Large purchases, committed investments, lifestyle upgrades—these become permanent obligations. Reversibility is about exit cost.",
        "Reversible = low exit cost. Subscriptions reversible. Mortgages less reversible. Large commitments not reversible.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Exit cost analysis', 'Obligation permanence'],
            lensApplied: 'Reversibility measurement',
            conclusion: 'Reversibility depends on exit cost.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-2b', "So I should avoid all commitments? That seems extreme."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-3b',
        "No. You should make commitments consciously. Know the exit cost. Know how it affects your runway. Know whether it's reversible. The problem isn't commitments—it's commitments made without understanding the cost to freedom.",
        "Make commitments consciously. Know exit cost and freedom impact. The problem is unconscious commitments.",
        {
          cognition: {
            signalsObserved: ['All-or-nothing thinking'],
            dataUsed: ['Commitment cost analysis', 'Freedom impact calculation'],
            lensApplied: 'Conscious commitment',
            conclusion: 'Conscious commitments preserve freedom; unconscious commitments trap.',
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
        'a3-4',
        "Directionally you are improving. But any new obligation pushes your freedom date out.",
        "Any obligation delays freedom. Decide consciously.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-3', "How much does each obligation delay freedom? Is there a formula?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-4a',
        "There's a simple calculation: new monthly obligation divided by your monthly savings rate equals months added to freedom date. A $500/month obligation, if you save $3,000/month, adds about 3 months to freedom (because you need to save an extra $500/month for 18 months to maintain runway).",
        "New obligation / savings rate = months added to freedom date. $500/month obligation adds 3 months if you save $3k/month.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Monthly savings rate', 'Obligation impact calculation'],
            lensApplied: 'Freedom impact math',
            conclusion: 'Obligations delay freedom proportionally to savings rate.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-3a', "So every $500/month I add pushes freedom out by 3 months? That's expensive."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-4b',
        "Exactly. Most people think in dollars: '$500 is only 3% of my income.' But they should think in time: '$500 adds 3 months to my freedom date.' Time is the real cost.",
        "Think in time, not dollars. $500 = 3 months of freedom. That's the real cost.",
        {
          cognition: {
            signalsObserved: ['Time cost awareness'],
            dataUsed: ['Time cost calculation', 'Opportunity cost analysis'],
            lensApplied: 'Time pricing',
            conclusion: 'Time cost is the real cost of obligations.',
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
        'a3-5',
        "Blind spot #1: underpricing time cost",
        "Blind spot #1: underpricing time cost",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-4', "What do you mean by underpricing time cost? Like, not thinking about opportunity cost?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-5a',
        "Exactly. Most people price decisions in dollars—'This costs $500/month'—but not in time—'This costs 3 months of freedom.' They think about what they're spending, not what they're giving up in time.",
        "People price in dollars, not time. They see $500/month, not 3 months of freedom lost.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Time cost calculation', 'Opportunity cost analysis'],
            lensApplied: 'Time pricing',
            conclusion: 'Time cost is underweighted relative to dollar cost.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6',
        "Blind spot #2: saying yes too early",
        "Blind spot #2: saying yes too early",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-4a', "Why is saying yes too early a problem? Shouldn't I be decisive?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6a',
        "Decisiveness is good when information is clear. But saying yes too early—before understanding the time cost, before checking reversibility—that traps you. The best decision is often to delay until you understand the cost to freedom.",
        "Decisiveness is good. Saying yes before understanding time cost traps you. Delay until you understand freedom cost.",
        {
          cognition: {
            signalsObserved: ['Decisiveness preference'],
            dataUsed: ['Decision timing analysis', 'Information gathering patterns'],
            lensApplied: 'Decision timing',
            conclusion: 'Delayed decisions preserve freedom; early commitments trap.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-7',
        "Blind spot #3: \"comfort upgrades\" that become permanent",
        "Blind spot #3: comfort upgrades that become permanent",
        {
          followUpButtons: [
            "Show me freedom date impact",
            "Where do I lose choice first?",
            "Try to talk me out of buying property",
          ],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-4b', "Like a bigger house or better car?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-7a',
        "Yes. A bigger house, a better car, a nicer neighborhood—they feel like reasonable upgrades. But they become permanent obligations. Once you're used to the space, the car, the area, downgrading feels like loss. The upgrade becomes permanent, and it pushes your freedom date out.",
        "Comfort upgrades become permanent. Once upgraded, downgrading feels like loss. The upgrade locks you in.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Lifestyle creep analysis', 'Obligation permanence'],
            lensApplied: 'Comfort trap',
            conclusion: 'Comfort upgrades create permanent obligations.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6',
        'Blind spot #Tax: If freedom is time, how do taxes change your freedom timeline?',
        'Blind spot #Tax: Taxes change your freedom timeline by reducing how much of your assets are truly available. Net-of-tax is the real runway.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5', "If freedom is time, how do taxes change my freedom timeline?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6a',
        "Taxes change the timeline by reducing how much of your assets are truly available. Net-of-tax is the real runway.",
        "Freedom timeline must be net-of-tax. Otherwise it's fantasy.",
        {
          cognition: {
            signalsObserved: ['User wants predictability and no surprises.'],
            dataUsed: ['Taxable vs retirement split', 'Liquid assets net-of-tax proxy'],
            lensApplied: 'Time independence index net-of-tax',
            conclusion: 'Taxes can delay freedom if you fund life with taxable realization.',
            confidenceCaveats: 'Illustrative ranges only; confirm with a CPA.',
          },
          followUpButtons: ['Show tax impact'],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5a', "So should I never sell taxable investments?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6b',
        "Not never. But you should sell with a plan, not under pressure. Selling under pressure is when freedom disappears.",
        "Sell with a plan. Never under pressure.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Planned vs forced sale scenarios'],
            lensApplied: 'Choice preservation',
            conclusion: 'Planned sales preserve freedom. Forced sales destroy it.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5b', "What about dividends? People tell me dividends are 'safe.'"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-6c',
        "Dividends can be fine, but they are often taxable. What feels safe can create steady tax drag. We care about net-of-tax compounding.",
        "Dividends can create tax drag. Safe-feeling cashflow can still reduce compounding.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Dividend tax implications', 'Compounding impact'],
            lensApplied: 'Tax drag + compounding',
            conclusion: 'Net-of-tax compounding matters more than "income feeling."',
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
        'a3-8',
        "Base: steady saving, freedom in X months",
        "Base: steady saving, freedom in X months",
        {
          severity: 'Low',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5', "What does 'freedom in X months' mean? Like, I can quit working?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-8a',
        "Freedom means you can walk away from your job without financial stress. Your runway is long enough—12+ months—and your obligations are low enough that income becomes optional, not required. You don't have to quit, but you can. That's freedom.",
        "Freedom = you can quit without stress. Income becomes optional, not required. That's the freedom date.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Freedom definition', 'Runway requirements'],
            lensApplied: 'Freedom measurement',
            conclusion: 'Freedom = ability to walk away without financial stress.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-9',
        "Bad: mild disruption, freedom delayed",
        "Bad: mild disruption, freedom delayed",
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5a', "How much does a 'mild disruption' delay freedom?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-9a',
        "A mild disruption—like a 3-month income gap, or a $15k unexpected expense—might delay freedom by 6-9 months. You tap your runway, then need to rebuild it. It's not catastrophic, but it's noticeable.",
        "Mild disruption delays freedom 6-9 months. You tap runway, then rebuild. Noticeable but not catastrophic.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Disruption impact calculation', 'Runway recovery time'],
            lensApplied: 'Disruption analysis',
            conclusion: 'Mild disruptions delay freedom by 6-9 months.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-10',
        "Ugly: obligation increase, freedom pushed far out",
        "Ugly: obligation increase, freedom pushed far out",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-5b', "How does an obligation increase delay freedom? Like, a bigger mortgage?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-10a',
        "Exactly. A bigger mortgage adds $1,000/month. If you save $3,000/month, that $1,000/month obligation adds 6 months to freedom. But the real cost is that it's permanent—you can't easily downsize. That $1,000/month obligation stays for 30 years, delaying freedom continuously.",
        "Bigger mortgage = permanent obligation = continuous freedom delay. $1k/month adds 6 months, then keeps delaying.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Obligation permanence', 'Freedom delay calculation'],
            lensApplied: 'Permanent obligation impact',
            conclusion: 'Permanent obligations delay freedom continuously, not just once.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '18-22': [
    {
      type: 'user',
      data: createUserMessage('u3-6', "I want an investment property, but I don't want to be trapped."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-11',
        "Then we evaluate whether it buys freedom or buys complexity.",
        "Most properties buy complexity first.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-6a', "But it will generate income. That should help freedom, right?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-11a',
        "It can. But properties usually generate income after you've managed tenants, repairs, vacancies, and taxes. That's complexity. And if the property needs work, or the tenant leaves, or the roof leaks, you're managing problems instead of enjoying freedom. Most properties generate income but add complexity that reduces freedom.",
        "Properties generate income but add complexity. Complexity reduces freedom even if income increases net worth.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Income focus'],
            dataUsed: ['Property complexity analysis', 'Freedom vs net worth tradeoff'],
            lensApplied: 'Complexity vs freedom',
            conclusion: 'Property income can reduce freedom through complexity.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-6b', "So when does a property actually buy freedom?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-11b',
        "A property buys freedom when it's passive—hands-off management, steady cash flow, no surprises. But most properties aren't passive. They're active businesses that require attention, decisions, and problem-solving. If you want freedom, passive income beats active property management.",
        "Property buys freedom only if passive. Most properties are active businesses that reduce freedom.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Property passivity analysis', 'Active vs passive income'],
            lensApplied: 'Freedom vs property',
            conclusion: 'Only passive properties buy freedom; active properties reduce it.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '22-25': [
    {
      type: 'user',
      data: createUserMessage('u3-7', "So what conditions would make this okay? What would preserve my freedom?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-12',
        "Conditions focus on reversibility:\n\n- can exit without loss of dignity\n- reserves protect buffers\n- obligation remains reversible\n- no dependency on appreciation/refi\n- freedom date not pushed beyond threshold",
        "Conditions:\n\n- Exit without loss of dignity\n- Reserves protect buffers\n- Obligation reversible\n- No dependency on appreciation/refi\n- Freedom date not pushed beyond threshold",
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-8', "And what about taxes? How do taxes affect my freedom timeline?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-13',
        'Tax conditions that protect freedom:',
        'Tax conditions that protect freedom.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-14',
        "Tax conditions (with consequences):\n\n1) Prefer spending buffers and cash before realizing gains, if it preserves runway.\n   Consequence: Avoid tax friction that reduces freedom timeline.\n\n2) When realizing gains, plan the tax reserve as part of the decision.\n   Consequence: Avoid surprise bills that compress liquidity.\n\n3) Rebalance in tax-advantaged accounts first.\n   Consequence: Reduce unnecessary realized gains.\n\n4) Avoid 'income' strategies that increase taxable drag without increasing freedom.\n   Consequence: Tax drag reduces compounding and delays freedom.\n\n5) Create CPA questions for real estate depreciation and passive rules (if property).\n   Consequence: Avoid hidden complexity that traps you later.",
        "Tax conditions:\n\n1) Prefer cash/buffers before realizing gains. Consequence: Preserve runway.\n2) Plan tax reserve when realizing. Consequence: Avoid surprise bills.\n3) Rebalance tax-advantaged first. Consequence: Reduce realized gains.\n4) Avoid income strategies with drag. Consequence: Tax drag delays freedom.\n5) Create CPA questions for property. Consequence: Avoid hidden traps.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-9', "So the goal is to preserve runway and avoid anything that delays my freedom date. That's the main thing?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-14a',
        "Exactly. Every decision should preserve or accelerate your freedom date. If it delays freedom, it's not worth it unless the upside is extraordinary.",
        "Preserve or accelerate freedom date. If it delays freedom, don't do it.",
      ),
    },
  ],
  '25-28': [
    {
      type: 'user',
      data: createUserMessage('u3-10', "What would a crisis look like for me? Help me see it in terms of freedom."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-13',
        "Crisis framed as loss of choice:\n\n- forced to work\n- forced to sell\n- forced to accept bad terms",
        "Crisis: loss of choice\n\n- Forced to work\n- Forced to sell\n- Forced to accept bad terms",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-11', "So the worst thing is losing my ability to choose—being forced into something I don't want."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-13a',
        "Exactly. Crisis isn't just about losing money—it's about losing choice. When you're forced to work, forced to sell, forced to accept bad terms, that's the real failure. That's what we're protecting against.",
        "Crisis = loss of choice. Being forced is the failure. That's what we protect against.",
      ),
    },
  ],
  '28-30': [
    {
      type: 'user',
      data: createUserMessage('u3-12', "So what's your final recommendation? Should I do this or protect my freedom?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-14',
        "My stance: protect optionality. If the decision reduces it, you need stronger reasons.",
        "If it delays freedom materially, don't do it.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-13', "So protect freedom first, then consider the opportunity. That's the priority?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-14a',
        "Yes. Freedom first, opportunity second. If an opportunity reduces freedom, it's not worth it. If it preserves or accelerates freedom, then evaluate it. But freedom is always the priority.",
        "Freedom first, opportunity second. Freedom is always the priority.",
      ),
    },
  ],
};

export const persona3Agents: Record<Phase, AgentStatus[]> = {
  '00-02': [
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current runway: 7.05 months | Obligations: $4,200/month fixed | Monthly savings: $9,500 | Income: $185k/year',
      computation: 'Freedom date calculation: At current rate (9.5k savings/month), freedom date = 5.8 years | If reduce obligations 10%: 5.2 years | If increase savings 20%: 4.6 years',
      outputs: 'Freedom trajectory: Base case 5.8 years | Optimized (reduce obligations + increase savings): 4.6 years',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Checking',
      inputs: 'Liquid assets: $67k (checking + savings) | Monthly burn: $9,500 | Buffer erosion risk: Low',
      computation: 'Runway = $67k / $9.5k = 7.05 months | Buffer erosion: -0.15 months/year (obligations growing slightly faster than liquidity)',
      outputs: 'Buffer erosion risk assessed: Low (-0.15 months/year) | Current runway: 7.05 months (healthy)',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Purchase decisions: Minimal | Status spending: Low | Freedom-focused purchases: High',
      computation: 'Status purchase risk: 0.12 (low) | Freedom-focused purchases: 0.89 (high) | Pattern: User avoids status, prioritizes freedom',
      outputs: 'Status purchase risk: Low (0.12) | Freedom-focused pattern: High (0.89) | Risk: Low risk of status purchases masquerading as freedom',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Income: Stable | Obligations: Low | Dependencies: Minimal',
      computation: 'Correlation score: 0.28 (low) | Dependencies: Minimal (income independent of assets) | Risk: Low correlation stacking',
      outputs: 'Correlation risk: Low (0.28) | Dependencies: Minimal | Good: Low risk of correlated failures',
    },
  ],
  '02-06': [
    {
      name: 'Freedom Optimizer',
      status: 'Completed',
      inputs: 'Runway: 7.05 months | Obligations: $4,200/month | Income: $15.4k/month net',
      computation: 'Freedom measurement: 7.05 months runway is meaningful (above 6-month threshold) | Risk: Not panic, but slow re-commitment (obligations can creep)',
      outputs: 'Meaningful runway confirmed: 7.05 months (healthy) | Risk identified: Slow re-commitment, not panic',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Checking',
      inputs: 'Current buffer: $67k | Obligations: $4,200/month | Reversibility: High',
      computation: 'Reversibility analysis: 85% of obligations reversible (low mortgage, minimal debt) | Exit cost: Low (most commitments can be exited)',
      outputs: 'Reversibility: High (85% of obligations reversible) | Exit cost: Low | Good: High optionality maintained',
    },
  ],
  '06-10': [
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'New obligations: Variable | Monthly savings: $9,500 | Freedom date: 5.8 years',
      computation: 'Freedom impact calculation: $500/month obligation = +3 months to freedom date | $1,000/month = +6 months | Each $500/month obligation adds 3 months to freedom timeline',
      outputs: 'New obligations delay freedom: $500/month = +3 months, $1k/month = +6 months | Time cost is the real cost',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Time cost awareness: High | Opportunity cost sensitivity: High',
      computation: 'Time cost pricing: User understands time cost (good) | Risk: May over-caution, delaying good moves unnecessarily',
      outputs: 'Time cost awareness: High (good) | Risk: Over-caution may delay good moves (moderate risk)',
    },
    {
      name: 'Tax Strategist',
      status: 'Estimating',
      inputs: 'Taxable vs retirement split, cost basis, holding period labels, bracket label',
      computation: "Net-of-tax liquidity range: Taxable assets ($140k) - potential tax on gains = $125k-$130k accessible (illustrative) | Tax drag on dividends: $2.4k/year (if all in taxable) creates ~$600-$900 tax drag (illustrative)",
      outputs: 'Net-of-tax liquidity range: $125k-$130k (illustrative) | Tax drag: Low-Medium on dividend positions | Freedom timeline impact: +0.2 to +0.4 years if funded with taxable realization',
    },
  ],
  '10-14': [
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Decision patterns: Freedom-focused | Time cost awareness: High | Saying yes timing: Sometimes too early',
      computation: 'Time cost pricing: Generally good (0.82 awareness score) | Blind spot: May say yes too early before understanding reversibility | Comfort upgrade risk: Moderate (may justify "reasonable" upgrades)',
      outputs: 'Time cost awareness: Good (0.82) | Blind spot: Saying yes too early | Comfort upgrade risk: Moderate',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current freedom date: 5.8 years | Obligation patterns: Low but can creep',
      computation: 'Freedom trajectory: If no new obligations: 5.8 years | If $500/month obligation added: 6.1 years | If $1,000/month: 6.4 years',
      outputs: 'Freedom trajectory: Base (5.8 years) | With obligations: +3 to +6 months per $500/month added',
    },
  ],
  '14-18': [
    {
      name: 'Freedom Optimizer',
      status: 'Simulating',
      inputs: 'Base: Steady saving | Bad: Mild disruption | Ugly: Obligation increase',
      computation: 'Freedom timeline shifts: Base (5.8 years, no change) | Bad: +0.8 years delay (mild disruption) | Ugly: +2.4 years delay (obligation increase)',
      outputs: 'Freedom date shifts: Base (0 years), Bad (+0.8 years), Ugly (+2.4 years) | Obligation increase is the main threat to freedom',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Cash flow scenarios: Base, Bad, Ugly | Starting buffer: $67k',
      computation: 'Cash flow simulation: Base (buffer grows to $82k), Bad (buffer drops to $45k), Ugly (buffer drops to $28k due to obligations)',
      outputs: 'Cash flow: Base (+$15k), Bad (-$22k), Ugly (-$39k) | Obligation increase reduces buffer significantly',
    },
  ],
  '18-22': [
    {
      name: 'Freedom Optimizer',
      status: 'Checking',
      inputs: 'Property purchase: $400k property | Down payment: $80k | Monthly obligation: +$1,800 (mortgage + expenses)',
      computation: 'Freedom impact: Property adds $1,800/month obligation = +6 months to freedom date (5.8 → 6.4 years) | Complexity: High (tenant management, repairs, vacancies)',
      outputs: 'Complexity risk identified: Property adds 6 months to freedom date + high complexity | Risk: Complexity may reduce freedom more than income increases it',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'User goal: "Don\'t want to be trapped" | Property risk: High complexity, moderate reversibility',
      computation: 'Freedom vs complexity: Property reduces freedom through complexity more than it increases it through income | Reversibility: Moderate (can sell but at transaction cost)',
      outputs: 'Freedom vs complexity: Property likely reduces freedom (high complexity, moderate reversibility) | Recommendation: Evaluate reversibility before committing',
    },
    {
      name: 'Tax Strategist',
      status: 'Flagging',
      inputs: 'Funding requirements: May require selling taxable | Current positions: $140k brokerage, $14k embedded gains | Holding periods: Mostly long-term',
      computation: 'Tax condition check: Cash/buffer preference (PASS if using cash), Tax reserve planning (FAIL if not planned), Rebalancing preference (PASS if using tax-advantaged first), Income strategy drag (PASS if avoiding drag), CPA questions (FAIL if property and not created)',
      outputs: 'Tax conditions: 3 PASS, 2 checks needed | Recommendation: Plan tax reserve if realizing, create CPA questions if property',
    },
  ],
  '22-25': [
    {
      name: 'Freedom Optimizer',
      status: 'Scanning',
      inputs: '5 conditions: Exit without loss of dignity, Reserves protect buffers, Obligation reversible, No refi dependency, Freedom date not pushed beyond threshold',
      computation: 'Condition check: Exit (PASS: can sell), Reserves (FAIL: need $24k reserve), Reversible (PASS: can sell), Refi (PASS: no dependency), Freedom threshold (FAIL: +6 months pushes beyond acceptable)',
      outputs: 'Reversibility conditions: 3 PASS, 2 FAIL | Critical: Reserves insufficient, Freedom date pushed beyond threshold',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Checking',
      inputs: 'Current buffer: $67k | Property reserve need: $24k | Post-property buffer: $43k',
      computation: 'Buffer impact: Property reduces buffer from $67k to $43k (-36%) | New runway: 4.5 months (down from 7.05 months)',
      outputs: 'Buffer impact: -$24k (-36% reduction) | New runway: 4.5 months (down from 7.05 months) | Risk: Buffer too thin after property',
    },
  ],
  '25-28': [
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Crisis scenario: Need $35k in 30 days | Available: $43k buffer (post-property)',
      computation: 'Choice compression: $35k needed, $43k available (covers it) | But if property needs repair ($15k) + income disruption: Need $50k, only $43k available, forced to sell property or take expensive loan',
      outputs: 'Forced choice scenarios: 30-day crisis covered ($43k available) | Extended crisis + property needs: $7k shortfall, forced to sell property or borrow',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Crisis impact on freedom: Forced selling delays freedom by +1.2 years | Forced borrowing delays by +0.6 years',
      computation: 'Crisis freedom impact: If forced to sell property at loss: +1.2 years delay | If forced to borrow: +0.6 years delay | Both reduce optionality',
      outputs: 'Crisis freedom impact: Forced selling (+1.2 years), Forced borrowing (+0.6 years) | Both reduce choice and delay freedom',
    },
  ],
  '28-30': [
    {
      name: 'Freedom Optimizer',
      status: 'Completed',
      inputs: 'Final assessment: Freedom date impact (+6 months), Complexity risk (high), Reversibility (moderate), Buffer impact (-36%)',
      computation: 'Stance determination: Property adds 6 months to freedom date, increases complexity, reduces buffer 36% | Recommendation: Protect optionality—if property reduces it, need stronger reasons',
      outputs: 'Stance: Protect optionality | Property adds 6 months + complexity + reduces buffer 36% | Only proceed if reversibility is high and freedom impact acceptable',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Completed',
      inputs: 'Final buffer assessment: Pre-property ($67k, 7.05 months), Post-property ($43k, 4.5 months)',
      computation: 'Buffer recommendation: Maintain 6+ months runway for freedom | Post-property buffer (4.5 months) is below threshold',
      outputs: 'Buffer recommendation: Need 6+ months for freedom | Post-property buffer (4.5 months) is insufficient | Risk: Property reduces freedom buffer too much',
    },
  ],
};
