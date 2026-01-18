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

export const persona1Transcript: Record<Phase, Message[]> = {
  '00-02': [
    {
      type: 'user',
      data: createUserMessage('u1-1', "I make good money. On paper I'm doing fine. But I still don't feel secure. Am I just being paranoid?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a1-1',
        'That feeling is not automatically irrational. For high earners, the most common mistake is confusing income with safety.',
        'Income is not safety. Many high earners fail because they confuse the two.',
        {
          cognition: {
            signalsObserved: [
              'Unease despite strong income',
              'Implicit fear of "one bad year"',
            ],
            dataUsed: [
              'Income vs monthly burn',
              'Fixed obligations vs liquidity',
            ],
            lensApplied: 'Behavioral + liquidity',
            conclusion: 'We evaluate runway and rigidity, not vibes.',
            confidenceCaveats: 'We can be directionally confident even without perfect data.',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u1-2', 'I save and invest every month. What exactly are you looking for?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a1-2',
        "I'm looking for whether your freedom is increasing or whether your life is getting more expensive faster than your buffer.",
        "I'm checking whether your buffer is growing slower than your obligations.",
        {
          cognition: {
            signalsObserved: ['Consistent saving behavior'],
            dataUsed: ['Savings rate proxy from balances', 'Monthly burn vs liquid assets'],
            lensApplied: 'Directional progress',
            conclusion: 'Measure runway and rigidity trend.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u1-3', "Okay, but I've been doing this for years. I have a good savings rate. What's the problem?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a1-3',
        "The problem isn't your savings rate. It's whether your obligations are growing faster than your buffer, and whether you're measuring the right thing.",
        "Your savings rate is irrelevant if obligations outpace liquidity. You're measuring the wrong thing.",
        {
          cognition: {
            signalsObserved: ['Defensive response to savings rate question'],
            dataUsed: ['Savings rate vs obligation growth rate', 'Liquid buffer vs fixed costs'],
            lensApplied: 'Rate of change analysis',
            conclusion: 'Measure buffer velocity, not just savings rate.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u1-4', 'What do you mean by "the right thing"?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a1-4',
        "Most people measure net worth. That's fine for retirement planning. But for security, you measure runway: how long your liquid assets last without income.",
        "Net worth is vanity. Runway is security. Measure runway, not net worth.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Liquid assets', 'Monthly burn rate'],
            lensApplied: 'Liquidity-first measurement',
            conclusion: 'Runway is the security metric, not net worth.',
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
        'a2-1',
        "Here is your reality snapshot. I'm going to be specific.",
        'Here is the snapshot. No comforting language.',
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-2',
        "Your liquid assets support roughly 4–5 months of your current burn without income. That's not dangerous. It's not \"safe\" either.",
        'You have ~4–5 months runway. That is thinner than you think.',
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Liquid assets (checking+savings)', 'Monthly burn'],
            lensApplied: 'Liquidity runway',
            conclusion: 'Runway is modest relative to obligations.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-1', "Five months isn't terrible. Why does it still feel fragile?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-3',
        "Because fragility is not just how long you can last. It's how many things can go wrong at once before you lose choice.",
        "Because you're one overlap away from being forced to act.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: [],
            lensApplied: 'Sequence risk',
            conclusion: 'Overlaps drive failure, not averages.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-2', "What do you mean by 'overlap'? Can you give me an example?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-4',
        "An overlap is when multiple things go wrong at the same time. Like: your income drops AND the market falls AND credit tightens. Individually, you might handle each. Together, they compound.",
        "Overlap: income disruption + market crash + credit freeze. Individually manageable. Together, lethal.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Correlation analysis', 'Stress scenario modeling'],
            lensApplied: 'Correlation risk',
            conclusion: 'Failures compound when correlated.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-3', 'But I have retirement accounts, brokerage accounts. Those count, right?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-4',
        "They count for net worth, yes. But for runway? Not immediately. Converting stocks to cash takes time, and when you need it most—during a downturn—selling hurts more. Retirement accounts have penalties. Runway uses only what's accessible within 30 days without penalty.",
        "Retirement accounts don't count for runway. Selling stocks under stress is expensive. Count only what's liquid now.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Confusion between net worth and liquidity'],
            dataUsed: ['Time-to-cash ladder', 'Access constraints'],
            lensApplied: 'Liquidity accessibility',
            conclusion: 'Only immediate-access assets count for runway.',
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
        'a3-1',
        "Let's talk direction. People don't lose freedom in one event. They lose it in drift.",
        'You lose freedom through drift, not disaster.',
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-2',
        "Your net worth is rising. But your fixed costs are rising faster than your liquidity. That's the drift.",
        'Your obligations are compounding faster than your buffer.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-1', "Isn't increasing fixed costs normal as you build wealth?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-3',
        'It can be. The risk is when obligations become permanent but income is not.',
        "Only if you assume income is permanent. It isn't.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: [],
            lensApplied: 'Income volatility vs permanent obligations',
            conclusion: 'Permanent obligations require larger buffers.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-2', "But I've been earning more each year. That should cover it."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-4',
        "Income growth isn't guaranteed. Your obligations are. If income stops growing or drops, your fixed costs don't shrink.",
        "Income can stop. Obligations don't.",
        {
          cognition: {
            signalsObserved: ['Income growth assumption'],
            dataUsed: ['Income volatility history', 'Fixed cost permanence'],
            lensApplied: 'Asymmetry of obligations',
            conclusion: 'Obligations are more permanent than income.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u3-3', 'What should I do differently?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a3-5',
        "Measure the trend. If your obligations are growing faster than your buffer, you're moving in the wrong direction, even if net worth is rising.",
        "Measure buffer velocity, not net worth. If obligations outpace liquidity, you're drifting backward.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Obligation growth rate', 'Liquidity growth rate'],
            lensApplied: 'Directional measurement',
            conclusion: 'Measure buffer velocity to detect drift.',
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
        'a4-1',
        'Here are the blind spots I see most often for high earners.',
        'Here are the ways you fail quietly.',
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-2',
        'Blind spot #1: Underestimating how stress changes decisions. You will not behave the same under pressure.',
        "Blind spot #1: Your 'plan' assumes you behave rationally under stress. You won't.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-1', "But I've thought through my plan. I know what I'll do."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-2a',
        "You've thought through it while calm. Stress changes how you think. Under pressure, you'll prioritize short-term survival over long-term plans.",
        "You planned while calm. Under stress, you'll abandon plans for survival.",
        {
          cognition: {
            signalsObserved: ['Planning confidence'],
            dataUsed: ['Behavioral research on stress decisions', 'Stress-response patterns'],
            lensApplied: 'Behavioral economics',
            conclusion: 'Stress overrides rational planning.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-3',
        'Blind spot #2: Assuming liquidity is available when needed. Liquidity disappears when confidence disappears.',
        "Blind spot #2: Liquidity is not there when you want it. It's there when markets are calm.",
        {
          followUpButtons: [
            'What am I missing?',
            'Where is my thinking fragile?',
            'Show me a liquidity crisis',
            'Try to talk me out of buying a property',
          ],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-2', "But I have brokerage accounts. I can sell stocks if I need to."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-3a',
        "You can sell stocks when markets are calm. When you actually need the money—during a crisis—markets are down, selling locks in losses, and settlement takes time. Liquidity is there when you don't need it. When you do, it's expensive.",
        "Stocks are liquid when markets are calm. When you need cash, markets crash and selling is expensive. Liquidity disappears when needed.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Liquidity assumption'],
            dataUsed: ['Market correlation with stress events', 'Settlement timing', 'Selling costs under stress'],
            lensApplied: 'Liquidity timing risk',
            conclusion: 'Liquidity is inversely correlated with need.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4',
        'Blind spot #Tax: Taxes create surprises and drag. The goal is not avoidance. The goal is control.',
        'Blind spot #Tax: Taxes create surprises and drag. Ignore them and you get forced into bad sales.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-3', "I'm not trying to dodge taxes. I just don't want surprises. Where do taxes actually hurt me?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4a',
        "That's a healthy question. Taxes hurt you in two ways: surprise bills and silent drag. The goal is not avoidance. The goal is control.",
        "Taxes hurt you through surprises and drag. If you ignore them, you will eventually be forced into a bad sale.",
        {
          cognition: {
            signalsObserved: ['User wants predictability and no surprises.'],
            dataUsed: ['Taxable vs retirement balances', 'Brokerage embedded gains (market vs basis)', 'Holding period labels'],
            lensApplied: 'Liquidity + behavioral ("avoid forced moves")',
            conclusion: 'We plan funding and sales to avoid short-term realization surprises.',
            confidenceCaveats: 'Illustrative ranges only; confirm with a CPA.',
          },
          followUpButtons: ['Show tax impact'],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-4', "Okay. So if I sell something to fund a property down payment, what's the damage?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4b',
        "We treat that as a funding decision, not an investment decision. Funding with a taxable sale can create a second bill: the purchase cost plus the tax cost.",
        "Funding a down payment by selling taxable assets is paying twice: the down payment and the tax bill.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Hypothetical sale amount', 'Embedded gain portion', 'Holding period labels'],
            lensApplied: 'Net-of-tax funding friction',
            conclusion: 'Compare funding sources before you pick "sell."',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u4-5', "But taxes are inevitable. Isn't this just noise?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4c',
        "Taxes are inevitable. Timing is not. Timing is where you keep control.",
        "Taxes are inevitable. Bad timing is optional. Avoid bad timing.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: [],
            lensApplied: 'Timing control as resilience',
            conclusion: 'The plan is to avoid being forced to realize at the worst time.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a4-4d',
        'Tax guardrail: do not create a tax bill you have not pre-funded in cash.',
        'Rule: never create a tax bill you cannot pay immediately.',
        {
          severity: 'Medium',
        }
      ),
    },
  ],
  '14-18': [
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-1',
        "I'm going to show you paths, not predictions.",
        'We simulate failure, not comfort.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u5-1', "Why focus on failure? Shouldn't we plan for success?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-1a',
        "Because planning for success is easy. Everyone does that. Planning for failure is what keeps you from being trapped. We simulate the worst to build resilience.",
        "Success plans itself. Failure traps you. We simulate failure to avoid being trapped.",
        {
          cognition: {
            signalsObserved: ['Optimism bias'],
            dataUsed: ['Failure mode analysis', 'Stress testing methodology'],
            lensApplied: 'Resilience planning',
            conclusion: 'Stress testing prevents failure.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-2',
        'Base path: income steady, moderate market returns, no major shocks. You slowly increase runway if spending stays flat.',
        'Base path: nothing breaks, you keep drifting unless spending discipline holds.',
        {
          severity: 'Low',
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-3',
        'Bad path: a 6-month income disruption plus modest market drawdown. Your liquidity falls fast; stress rises; you delay investing and recovery slows.',
        'Bad path: 6 months disruption. Your buffer collapses. You start making defensive decisions.',
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u5-2', "But I could cut expenses if I needed to. That would extend my runway."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-3a',
        "You could cut some expenses. But fixed costs—mortgage, insurance, minimum debt payments—don't shrink easily. Those consume most of your runway. Variable expenses are a smaller buffer than you think.",
        "Fixed costs don't cut. They're locked. Only variable expenses shrink, and those are a small buffer.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Expense reduction assumption'],
            dataUsed: ['Fixed vs variable cost ratio', 'Discretionary spending analysis'],
            lensApplied: 'Expense flexibility',
            conclusion: 'Fixed costs limit expense flexibility.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-4',
        'Ugly path: income disruption overlaps with a tightening credit market. Your options narrow, borrowing is expensive, selling is penalized, and your freedom timeline moves out dramatically.',
        'Ugly path: overlap. You get trapped by timing.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u5-3', 'How likely is the ugly path?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a5-4a',
        "Probability isn't the point. The point is: if it happens, are you prepared? The ugly path happens to someone every year. We simulate it so it doesn't have to be you.",
        "Probability is irrelevant. If it happens, you're trapped. We simulate it to avoid being that person.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Probability assessment request'],
            dataUsed: ['Historical overlap frequency', 'Tail risk analysis'],
            lensApplied: 'Preparedness over probability',
            conclusion: 'Prepare for tail risks, not just averages.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '18-22': [
    {
      type: 'user',
      data: createUserMessage('u6-1', 'Okay. But I still want to buy an investment property. Talk me out of it.'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a6-1',
        "I will. Not because real estate is bad—because it can convert your liquidity into obligations.",
        "I will. Because this is how high earners trap themselves.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u6-2', "But it will cash-flow. The spreadsheet shows positive returns."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a6-1a',
        "The spreadsheet assumes 100% occupancy, no major repairs, and stable rent. Reality is different. Vacancy happens, roofs leak, tenants leave. The spreadsheet is wrong more often than it's right.",
        "Spreadsheets assume perfect conditions. Reality is vacancy, repairs, and rent drops. The math is wrong.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Optimism about cash flow'],
            dataUsed: ['Historical vacancy rates', 'Capex requirements', 'Rent volatility'],
            lensApplied: 'Reality vs assumptions',
            conclusion: 'Real estate returns are overstated in planning models.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a6-2',
        "Here's the uncomfortable truth: you don't fail when the spreadsheet is wrong. You fail when timing is wrong.",
        'You fail on timing, not math.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u6-3', 'What do you mean by timing?'),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a6-3',
        "Timing is when you need liquidity but can't access it. When tenant leaves AND roof leaks AND your income drops AND credit tightens, you need cash now. But property equity doesn't convert to cash quickly. You're stuck.",
        "Timing: When you need cash but property equity is locked. Overlap creates forced selling at bad prices.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Time-to-cash for real estate', 'Stress scenario timing'],
            lensApplied: 'Liquidity timing',
            conclusion: 'Real estate liquidity evaporates when needed.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '22-25': [
    {
      type: 'user',
      data: createUserMessage('u7-1', "Okay, so you're saying I shouldn't do this at all?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a7-1',
        'If you proceed, it must be under strict conditions.',
        "Proceed only if you can't be harmed.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u7-2', "What kind of conditions are we talking about? I'm trying to understand what 'safe' actually means here."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a7-2',
        "Conditions:\n\n1) 12+ months post-purchase liquidity: If not, you risk forced selling.\n2) No refi dependence: If you need refi, you're betting on credit.\n3) Vacancy tolerance 6+ months: If not, stress arrives fast.\n4) Capex reserve prefunded: If not, you borrow under pressure.\n5) Exit without forced sale: If not, the market sets your price.\n6) Rate shock survivable: If not, payments become the crisis.\n7) Does not delay primary freedom goal: If yes, it's a distraction.\n8) You can walk away: If not, you're emotionally leveraged.",
        'Conditions:\n\n1) 12+ months liquidity post-purchase or forced selling risk\n2) No refi dependence or you bet on credit\n3) 6+ months vacancy tolerance or stress arrives\n4) Capex reserve prefunded or you borrow under pressure\n5) Exit without forced sale or market sets price\n6) Rate shock survivable or payments become crisis\n7) Does not delay freedom goal or it is distraction\n8) You can walk away or you are emotionally leveraged.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u7-3', "And what about taxes? I keep hearing about tax implications but I'm not sure what to worry about."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a7-3',
        'Tax conditions to proceed:',
        'Tax conditions. Fail them and do not proceed.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a7-4',
        "Tax conditions (with consequences):\n\n1) If funding requires selling short-term gains, delay or change funding source.\n   Consequence: Short-term realization increases tax friction and reduces buffer.\n\n2) Pre-fund an estimated tax reserve if a sale is required.\n   Consequence: Avoid surprise bills that compress liquidity.\n\n3) Prefer rebalancing inside tax-advantaged accounts before taxable selling.\n   Consequence: Reduce unnecessary realized gains.\n\n4) Document what you will do if the market drops before you sell.\n   Consequence: Avoid panic selling.\n\n5) Create a CPA question list before execution.\n   Consequence: Avoid hidden complexity surprises.",
        "Tax conditions:\n\n1) If funding requires short-term gains, delay or change source. Consequence: Higher tax friction.\n2) Pre-fund tax reserve if sale required. Consequence: Avoid surprise bills.\n3) Rebalance in tax-advantaged first. Consequence: Reduce realized gains.\n4) Document market-drop plan. Consequence: Avoid panic selling.\n5) Create CPA questions. Consequence: Avoid hidden complexity.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u7-4', "This is a lot of conditions. Is this realistic? Can anyone actually meet all of these?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a7-4a',
        "The conditions exist to protect you, not to frustrate you. If meeting them feels impossible, that's the point—it means proceeding would be risky. These aren't arbitrary rules; they're the reality of what it takes to proceed safely.",
        "If conditions feel impossible, proceeding is risky. That's the point. Safety isn't negotiable.",
      ),
    },
  ],
  '25-28': [
    {
      type: 'user',
      data: createUserMessage('u8-1', "This all sounds like worst-case scenarios. How likely is this actually going to happen?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a8-1',
        "Let's rehearse the crisis so you can recognize it.",
        'Here is how you break.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u8-2', "I understand the theory, but walk me through what this would actually look like. Help me see it."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a8-2',
        'Crisis script:\n\n- Tenant leaves → 2 months vacancy\n- HVAC fails → $9k\n- Credit tightens → HELOC frozen\n- Your income disrupted → bonus canceled\n- Cash needed in 21 days\n- Brokerage down 18% (selling painful)\n\nConclusion:\n\nThis is where people discover that net worth is not liquidity.',
        'Crisis script:\n\n- Tenant leaves → 2 months vacancy\n- HVAC fails → $9k\n- Credit tightens → HELOC frozen\n- Your income disrupted → bonus canceled\n- Cash needed in 21 days\n- Brokerage down 18% (selling painful)\n\nThis is where you find out net worth is useless without access.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u8-3', "Okay, that's terrifying. But realistically, all of these happening at once? That seems unlikely."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a8-2a',
        "They don't all have to happen. Just enough overlap to create a cash crunch. Tenant leaves and HVAC fails is enough if you're tight on liquidity. The point isn't to predict probability—it's to ensure you can survive if it happens.",
        "They don't all need to happen. Just enough overlap to break you. Prepare for overlap, not probability.",
      ),
    },
  ],
  '28-30': [
    {
      type: 'user',
      data: createUserMessage('u9-1', "I hear you, but I'm still not sure. What's your final recommendation? Should I do this or not?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a9-1',
        'My stance: caution. Wait unless every condition is met. Your freedom is worth more than activity.',
        "My stance: do not proceed unless you can walk away today without regret.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u9-2', "So if I wait and build up my buffer first, then we can revisit this? When would that be?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a9-2',
        'Next Review Triggers:\n\n- If runway reaches 9 months, reassess.\n- If fixed costs fall below X% of income, reassess.\n- If you can fund capex reserves without reducing buffer, reassess.',
        'Next Review Triggers:\n\n- Runway reaches 9 months → reassess\n- Fixed costs fall below threshold → reassess\n- Capex reserves funded without buffer reduction → reassess',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u9-3', "Alright. I'll wait and build the buffer first. It's the responsible thing to do."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a9-3',
        "Responsible is the right word. You're making the choice to preserve optionality. That's how high earners build real security—not by taking every opportunity, but by choosing the ones that don't compromise your foundation.",
        "Good choice. Security comes from preserving optionality, not taking every opportunity.",
      ),
    },
  ],
};

export const persona1Agents: Record<Phase, AgentStatus[]> = {
  '00-02': [
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Income: $180,000/year | Monthly burn: $14,500 | Fixed costs: $8,200/month',
      computation: 'Fixed-cost ratio = $8,200 / $14,500 = 56.6% | Obligation growth rate: +3.2%/year vs liquidity growth: +1.8%/year',
      outputs: 'High fixed-cost ratio (56.6%) | Obligations growing 1.8x faster than liquidity',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Checking: $18k | Savings: $42k | Brokerage: $85k | Total liquid: $60k accessible',
      computation: 'Runway = $60k / $14,500 = 4.14 months | Stress test: 3-month disruption reduces to 2.8 months, 6-month to 1.4 months',
      outputs: 'Current runway: 4.14 months | Under 6-month disruption: 1.4 months remaining',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'User anxiety signal: "feeling insecure" | Income level: High | Savings rate: Moderate',
      computation: 'Anxiety-to-threat ratio: 0.73 (rational) | Behavioral pattern: Risk-averse high earner with valid liquidity concerns',
      outputs: 'Anxiety is rational (not paranoia) | Pattern: High income, low runway mismatch detected',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current runway: 4.14 months | Obligations: $8,200/month fixed | Income: $15k/month net',
      computation: 'At current rate: Freedom timeline = 8.3 years | If reduce fixed costs 20%: 6.1 years | If increase liquidity 50%: 5.4 years',
      outputs: 'Baseline trajectory: 8.3 years to time independence | Optimized: 5.4 years (if conditions met)',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Primary income: Tech job | Housing: Mortgage + HCOL area | Investments: Stock-heavy',
      computation: 'Correlation matrix: Job loss + housing costs + market drop = 0.42 correlation | Single narrative risk: Tech sector downturn affects job, housing, and investments simultaneously',
      outputs: 'Overlap risk score: 0.42 (moderate-high) | Single narrative detected: Tech sector dependency',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Asset allocation: 25% liquid | 75% illiquid (brokerage + retirement)',
      computation: 'Time-to-cash analysis: Checking (0-7 days), Savings (7-30 days), Brokerage (30-90 days + market risk), Retirement (90+ days + penalties)',
      outputs: 'Time-to-cash ladder generated | Immediate access: $18k | 30-day access: $60k | 90-day access: $145k (with costs)',
    },
  ],
  '02-06': [
    {
      name: 'Profile Analyzer',
      status: 'Completed',
      inputs: 'Income vs monthly burn',
      computation: 'Fixed-cost ratio calculated',
      outputs: 'High fixed-cost ratio identified',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Completed',
      inputs: 'Checking + savings',
      computation: 'Runway calculation',
      outputs: '4-5 months runway',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Completed',
      inputs: 'Anxiety signals',
      computation: 'Rationality check',
      outputs: 'Anxiety is rational',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Completed',
      inputs: 'Runway months',
      computation: 'TII calculation',
      outputs: 'Time Independence Index: 4-5 months',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Completed',
      inputs: 'Job + housing',
      computation: 'Overlap analysis',
      outputs: 'Single narrative risk present',
    },
  ],
  '06-10': [
    {
      name: 'Profile Analyzer',
      status: 'Completed',
      inputs: 'Historical trend data',
      computation: 'Fixed cost creep analysis',
      outputs: 'Obligations rising faster than liquidity',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Completed',
      inputs: 'Liquidity trend',
      computation: 'Directional drift calculation',
      outputs: 'Negative drift identified',
    },
  ],
  '10-14': [
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'User plan: "Continue saving, invest monthly" | Stress scenario: Income disruption + market drop',
      computation: 'Behavioral stress test: Under pressure, 73% of users abandon investment plans, 61% increase credit usage, 82% delay discretionary purchases but maintain fixed obligations',
      outputs: 'Behavior will change under pressure | Prediction: Investments paused, credit usage +$300/month, runway reduces faster than planned',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Market conditions: Normal | Credit availability: Good | Stress scenario: Market down 20%, credit tightens',
      computation: 'Liquidity access simulation: Normal conditions: 90% accessible | Under stress: 45% accessible (brokerage locked, credit frozen, retirement inaccessible)',
      outputs: 'Liquidity not guaranteed when needed | Under stress: Only $27k accessible vs $60k planned (55% reduction)',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Stress scenarios: Job disruption, housing cost increase, investment loss',
      computation: 'Correlation analysis: Job loss + housing stress + investment loss correlation = 0.52 | Probability of overlap: 18% in any 5-year period',
      outputs: 'Overlap probability: 18% chance of multiple failures in 5 years | Correlation risk: Moderate-high (0.52)',
    },
  ],
  '14-18': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Simulating',
      inputs: 'Base scenario: Income steady | Bad scenario: 6-month disruption | Ugly scenario: Disruption + credit freeze + market drop',
      computation: 'Path simulation: Base path maintains 4.14-month runway | Bad path reduces to 1.4 months | Ugly path reduces to 0.3 months with forced selling',
      outputs: 'Base/Bad/Ugly paths generated | Base: 4.14 months | Bad: 1.4 months | Ugly: 0.3 months (critical)',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Three scenarios: Base, Bad, Ugly | Current freedom timeline: 8.3 years',
      computation: 'Freedom timeline shift: Base path: No change (8.3 years) | Bad path: +1.2 years delay (9.5 years) | Ugly path: +3.4 years delay (11.7 years)',
      outputs: 'Freedom timeline shifts: Base: 0 years | Bad: +1.2 years | Ugly: +3.4 years',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Cash flow projection: 24 months | Starting balance: $60k | Monthly burn: $14,500',
      computation: 'Cash flow simulation: Base path: Balance grows to $75k in 24 months | Bad path: Balance drops to $8k | Ugly path: Balance drops to -$12k (borrowing required)',
      outputs: 'Cash flow projection generated | Base: +$15k | Bad: -$52k | Ugly: -$72k (requires borrowing)',
    },
  ],
  '18-22': [
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Investment property: $450k purchase | 20% down ($90k) | Assumed rent: $2,500/month | Vacancy: 5% historical',
      computation: 'Property stress test: Vacancy 2 months (-$5k) + Capex $9k + Refi unavailable = -$14k required | Current buffer: $60k → $46k post-property | New runway: 3.2 months (down from 4.14)',
      outputs: 'Timing risk high | Post-property runway: 3.2 months (down 23%) | Buffer reduction: -$14k (23% of liquid assets)',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Primary dependencies: Job income, Primary residence, Investment property, Credit access',
      computation: 'Dependency mapping: Job loss affects primary mortgage + investment property + credit access simultaneously | Correlation increases from 0.42 to 0.67',
      outputs: 'Overlap risk increases from 0.42 to 0.67 (high) | Single narrative dependency: Job income supports all three obligations',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'User statement: "It will cash-flow" | Historical data: 82% of properties don\'t cash-flow first year | Vacancy rates: 5-10% typical',
      computation: 'Optimism bias check: User assumes 100% occupancy, 0% capex, stable rent | Reality: 95% occupancy, 2% capex/year, rent volatility 5-10%',
      outputs: 'Optimism bias detected | Assumptions: 18% deviation from realistic expectations | Risk: Underestimates costs by ~$3,600/year',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current freedom timeline: 8.3 years | Property purchase reduces liquidity by $90k | Property adds obligations: $450/mo net (rent - expenses)',
      computation: 'Freedom timeline impact: Liquidity reduction delays timeline by +0.6 years | Additional obligations delay by +0.3 years | Total delay: +0.9 years (8.3 → 9.2 years)',
      outputs: 'Freedom timeline impact: +0.9 years delay | New timeline: 9.2 years (up from 8.3)',
    },
    {
      name: 'Tax Strategist',
      status: 'Estimating',
      inputs: 'Taxable positions, cost basis, holding period, bracket label, state',
      computation: 'Realized gain exposure range; short-term flag',
      outputs: 'Tax bill risk range + guardrail',
    },
  ],
  '22-25': [
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: 'Runway: 4.14 months | Fixed costs: $8,200/month (56.6%) | Liquid assets: $60k | Proposed purchase: $450k property',
      computation: 'Condition validation: 8 conditions evaluated | 1) Post-purchase liquidity: $60k - $90k down = -$30k (FAIL) | 2) Refi dependence: No if 20% down (PASS) | 3) Vacancy tolerance: Buffer allows ~4 months (FAIL - need 6) | 4) Capex reserve: Not prefunded (FAIL) | 5-8: Additional conditions evaluated',
      outputs: '8 conditions checked: 4 PASS, 4 FAIL | Critical failures: Post-purchase liquidity insufficient, vacancy tolerance below threshold, capex not prefunded | Recommendation: Do not proceed until conditions met',
    },
    {
      name: 'Tax Strategist',
      status: 'Flagging',
      inputs: 'Funding: $90k down payment | Taxable positions: $160k | Short-term holdings: $50k (Tech Concentration) | Long-term: $85k + $25k | State: IL | Bracket: High',
      computation: 'Tax condition validation: 1) Short-term gain risk: $50k position = $8k gain (if sold = $8k * 0.37 = $2.96k tax) - FAIL if used for down payment | 2) Tax reserve: Not prefunded (FAIL) | 3) Rebalancing: No tax-advantaged rebalancing planned (FAIL) | 4) Market drop plan: Not documented (FAIL) | 5) CPA questions: Not prepared (FAIL)',
      outputs: '5 tax conditions evaluated: 1 PASS, 4 FAIL | Critical risks: Short-term gain tax if funding from taxable, no tax reserve prefunded, no market-drop plan | Output: 5 tax conditions + CPA question list generated',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Checking',
      inputs: 'Proposed property dependency: Job income + Primary residence + Credit access',
      computation: 'Dependency analysis: Property purchase increases correlation from 0.42 to 0.67 (high) | Single narrative risk: Job income supports primary mortgage + investment property + credit simultaneously | Overlap probability increases from 18% to 28% in 5-year period',
      outputs: 'Dependency mapping: Correlation increases to 0.67 (high) | Overlap risk increases to 28% | Single failure point: Job income disruption affects all three obligations',
    },
  ],
  '25-28': [
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Crisis scenario: Tenant leaves (2 months vacancy) + HVAC fails ($9k) + Credit frozen (HELOC unavailable) + Income disruption (bonus canceled) + Brokerage down 18% + Cash needed in 21 days',
      computation: 'Liquidity drill simulation: Available immediately: Checking $18k (PASS - covers $9k HVAC) | Available in 8-30 days: Savings $42k (PARTIAL - covers vacancy but tight) | Available in 31-90 days: Brokerage $160k but down 18% = $131k accessible (STRESSED - selling at loss) | Retirement: $210k but penalty/friction (NOT ACCESSIBLE) | Time-to-cash ladder: 0-7 days: $18k | 8-30 days: $60k total | 31-90 days: $191k total (with penalty) | Crisis gap: Need $9k + $5k vacancy + buffer = $17k in 21 days | Available: $60k in 30 days (CLOSE - but tight margin)',
      outputs: 'Time-to-cash ladder under stress generated | Crisis scenario: $17k needed in 21 days, $60k available in 30 days (margin: +$43k but timing gap) | Risk: Timing mismatch creates stress even with sufficient total assets | Conclusion: Only cash and near-cash matter in crisis',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Simulating',
      inputs: 'Overlap scenario: Multiple simultaneous failures (tenant + HVAC + credit + income)',
      computation: 'Correlation stress test: Job disruption + credit freeze + property vacancy = triple dependency failure | Overlap probability in crisis: 28% chance of 2+ failures simultaneously | Forced move risk: If 2+ failures occur, liquidity compression forces selling at bad prices',
      outputs: 'Overlap risk high: 28% chance of 2+ simultaneous failures | Forced move scenario: Multiple failures create liquidity compression, forcing selling at stressed prices | Dependency stacking increases vulnerability',
    },
  ],
  '28-30': [
    {
      name: 'Freedom Optimizer',
      status: 'Completed',
      inputs: 'Final assessment: Runway 4.14 months | 8 conditions: 4 PASS, 4 FAIL | 5 tax conditions: 1 PASS, 4 FAIL | Overlap risk: 28% | Crisis readiness: Marginally acceptable',
      computation: 'Stance determination: Conditions not met (4 failures) | Tax conditions not met (4 failures) | Overlap risk elevated (28%) | Freedom timeline: Would delay by +0.9 years | Crisis readiness: Tight margins (21-day gap) | Weighted risk score: 6.8/10 (moderate-high risk) | Stance: CAUTION - Do not proceed unless all conditions met',
      outputs: 'Stance: Caution - Wait unless all conditions met | Risk score: 6.8/10 (moderate-high) | Recommendation: Build buffer first (target: 9 months runway), then reassess | Next review triggers: Runway reaches 9 months, fixed costs below 40%, capex reserves funded',
    },
    {
      name: 'Profile Analyzer',
      status: 'Completed',
      inputs: 'Current position: Runway 4.14 months, Fixed costs 56.6%, Liquid assets $60k | Target position: Runway 9+ months, Fixed costs <40%, Liquid assets $130k+',
      computation: 'Gap analysis: Current vs target | Runway gap: 4.14 → 9 months = +4.86 months needed = +$70k buffer required | Fixed cost gap: 56.6% → 40% = need to reduce by $2,400/month OR increase income by $6k/month | Timeline to target: Assuming $5k/month savings, 14 months to reach 9-month runway | Freedom timeline impact: If proceed now = +0.9 years delay | If wait and build buffer = +0.3 years delay (better)',
      outputs: 'Gap analysis: Need +$70k buffer and/or -$2,400/month fixed costs | Timeline: 14 months to reach target runway | Freedom timeline comparison: Proceed now = +0.9 years delay | Build buffer first = +0.3 years delay (better path)',
    },
  ],
};
