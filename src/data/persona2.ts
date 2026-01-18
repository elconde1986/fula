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

export const persona2Transcript: Record<Phase, Message[]> = {
  '00-02': [
    {
      type: 'user',
      data: createUserMessage('u2-1', "This is a calculated risk. If it works, it changes everything."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-1',
        "I respect ambition. My job is to make sure a missed bet doesn't change your life permanently.",
        "Upside is not the problem. Dependency is.",
        {
          cognition: {
            signalsObserved: ['Outcome-dependent language'],
            dataUsed: ['Liquidity vs burn', 'Illiquid concentration'],
            lensApplied: 'Correlation + dependency',
            conclusion: 'Separate survival from growth.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-1a', "But I've done the math. The expected value is positive. This is a good bet."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-1a',
        "Expected value is useful, but it doesn't capture dependency. If this bet fails, does it fail in isolation or alongside your other risks? That's what matters.",
        "Expected value is irrelevant if all your risks fail together. Correlation kills expected value.",
        {
          cognition: {
            signalsObserved: ['Expected value confidence'],
            dataUsed: ['Correlation matrix', 'Dependency analysis'],
            lensApplied: 'Correlation risk',
            conclusion: 'Expected value breaks under correlation.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-1b', "What do you mean by dependency? My job, my equity, my credit—they're separate."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-1b',
        "They're separate until they're not. When a sector downturn hits, it often hits job security, equity values, and credit availability simultaneously. That's the dependency: one story affecting everything.",
        "They're separate until one story breaks. Then they all break together.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Dependency blindness'],
            dataUsed: ['Sector correlation analysis', 'Historical stress events'],
            lensApplied: 'Single narrative risk',
            conclusion: 'Single narrative creates dependency across assets.',
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
        'a2-2',
        "Your net worth is impressive. Your liquidity is the constraint.",
        "Your net worth is not usable under stress.",
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-3',
        "If the market turns or credit tightens, you may have to act before you want to.",
        "If credit tightens, your options disappear.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-2', "Why are you so focused on liquidity? I'm playing long-term."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-4',
        "Because liquidity determines whether you get to stay long-term.",
        "Because liquidity decides whether you're forced to sell your long-term.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-2a', "But I have $600k in equity comp. That's accessible, right?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-4a',
        "It's accessible if you can sell, and if you can sell when you need it. During stress—when you need liquidity most—equity comp often becomes harder to liquidate: vesting restrictions tighten, windows close, markets lock up. Count it for net worth. Don't count it for runway.",
        "Equity comp is liquid when you don't need it. When you do, it's often locked. Don't count it for runway.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Liquidity assumption on equity'],
            dataUsed: ['Equity vesting schedules', 'Market liquidity during stress'],
            lensApplied: 'Liquidity timing',
            conclusion: 'Equity liquidity disappears when needed.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-2b', "So what's the real number I should worry about?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-4b',
        "The real number is your runway: liquid assets divided by monthly burn. For you, that's about 3.5 months. Everything else is net worth—useful for retirement, not for short-term survival.",
        "Your runway is 3.5 months. Everything else is net worth, not liquidity.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Liquid assets (checking + savings)', 'Monthly burn'],
            lensApplied: 'Runway calculation',
            conclusion: 'Runway is the survival metric.',
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
        'a2-5',
        "You are building upside while shrinking tolerance for delay.",
        "You are building upside on a short fuse.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-3', "I can always raise money / borrow if needed."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-6',
        "That's true in normal times. In stress, capital becomes selective.",
        "Borrowing is easiest right before you need it. Hardest when you do.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-3a', "But my credit score is excellent. Banks will lend to me."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-6a',
        "Your credit score is excellent. But during stress, banks don't just look at credit scores. They look at income stability, asset liquidity, and sector risk. If your sector is under pressure—tech, finance, whatever—credit tightens regardless of your score.",
        "Credit scores don't matter when sectors collapse. Banks tighten credit by sector, not by score.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: ['Credit score confidence'],
            dataUsed: ['Sector correlation with credit', 'Historical credit tightening'],
            lensApplied: 'Credit availability during stress',
            conclusion: 'Credit tightens by sector during stress.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-3b', "So what's my real tolerance for delay? How long can I wait?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-6b',
        "Your tolerance is your runway: about 3.5 months. After that, you're forced to act. If the story takes longer than 3.5 months to materialize, and it doesn't materialize, you're forced to sell or borrow at bad terms.",
        "Your tolerance is 3.5 months. After that, you're forced to act. That's your fuse.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Runway calculation', 'Time-to-value analysis'],
            lensApplied: 'Tolerance for delay',
            conclusion: 'Runway determines tolerance for delay.',
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
        'a2-7',
        "Blind spot #1: Correlation stacking",
        "Blind spot #1: Correlation stacking",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-4', "What do you mean by correlation stacking? Can you give an example?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-7a',
        "Correlation stacking is when multiple risks move together. Like: your job depends on tech sector health, your equity comp is tech stock, your brokerage is tech-heavy, and credit availability tightens when tech crashes. Individually, each risk might be manageable. Together, they compound.",
        "Correlation stacking: job + equity + brokerage + credit all move together. Individually manageable. Together, lethal.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Correlation matrix', 'Sector dependency analysis'],
            lensApplied: 'Correlation risk',
            conclusion: 'Correlation compounds risks beyond individual probabilities.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-8',
        "Blind spot #2: Capital availability illusion",
        "Blind spot #2: Capital availability illusion",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-4a', "But I've always been able to raise money when I needed it."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-8a',
        "You've been able to raise money when you didn't desperately need it. Capital is most available when you don't need it—when your story is strong, markets are calm, and investors are optimistic. When you actually need it—during stress—capital becomes selective, terms worsen, and options narrow.",
        "Capital is available when you don't need it. When you do, it disappears.",
        {
          cognition: {
            signalsObserved: ['Capital availability assumption'],
            dataUsed: ['Historical capital availability during stress', 'Funding cycles'],
            lensApplied: 'Capital timing',
            conclusion: 'Capital availability is inversely correlated with need.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-9',
        "Blind spot #3: Identity risk (failed bet changes lifestyle)",
        "Blind spot #3: Identity risk",
        {
          followUpButtons: [
            "What dependency scares you most?",
            "Show me overlap failure",
            "Try to talk me out of the bet",
          ],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-4b', "What's identity risk? How is that different from financial risk?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-9a',
        "Identity risk is when a failed bet forces you to change who you are or how you live—not just temporarily, but permanently. Financial risk you can recover from. Identity risk—losing your lifestyle, your status, your sense of self—that's harder to bounce back from.",
        "Financial risk recovers. Identity risk—when a failed bet forces lifestyle compression—doesn't recover.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Lifestyle dependency analysis', 'Identity attachment to outcomes'],
            lensApplied: 'Identity risk',
            conclusion: 'Identity risk compounds financial risk.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-10',
        'Blind spot #Tax: Taxes can force timing. Timing is the enemy of concentrated bets.',
        'Blind spot #Tax: Taxes can force you into a sale at the wrong time. That is how concentration breaks.',
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5', "Taxes are the cost of winning. Why are we talking about this?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-10a',
        "Because taxes can force timing. Timing is the enemy of concentrated bets.",
        "Because taxes can force you into a sale at the wrong time. That's how concentration breaks.",
        {
          cognition: {
            signalsObserved: ['User dismisses tax planning as secondary.'],
            dataUsed: ['Concentrated position embedded gains', 'Liquidity thinness'],
            lensApplied: 'Forced-move prevention',
            conclusion: 'Tax friction increases dependency risk.',
            confidenceCaveats: 'Illustrative ranges; CPA required for execution.',
          },
          followUpButtons: ['Show tax impact'],
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5a', "So what's the move? Sell and pay the bill? Or hold and stay concentrated?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-10b',
        "That's the tradeoff. We don't pretend it's free. We decide deliberately: diversify slowly, use tax-advantaged rebalancing, or accept concentration with larger survival buffers.",
        "Pick one: pay the bill to reduce concentration, or accept concentration and increase survival capital. Don't pretend you can do neither.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Survival runway', 'Position size vs net worth'],
            lensApplied: 'Survival vs growth separation + tax friction',
            conclusion: 'If you keep the bet, you must increase buffers.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5b', "What about loss harvesting? Can I just offset it?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-10c',
        "Sometimes. But you can't assume losses appear when you want them. Also, harvesting has constraints. Treat it as an optimization, not a rescue plan.",
        "Loss harvesting is not a rescue plan. It's an optimization with constraints.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Loss harvesting constraints', 'Timing dependencies'],
            lensApplied: 'Avoid magical thinking',
            conclusion: 'Do not rely on harvestable losses to fund major decisions.',
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
        'a2-10',
        "Base: Story holds, liquidity slowly improves if burn controlled.",
        "Base: Story holds, liquidity slowly improves if burn controlled.",
        {
          severity: 'Low',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5', "What does 'story holds' mean exactly? Like, the company succeeds?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-10a',
        "Story holds means the narrative that justifies your bet remains intact. The company keeps growing, the sector stays strong, your equity comp continues vesting, credit stays available. Everything proceeds as planned—not perfectly, but within acceptable variance.",
        "Story holds: the narrative justifying your bet stays intact. Everything proceeds within acceptable variance.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Narrative dependency analysis', 'Success probability'],
            lensApplied: 'Narrative risk',
            conclusion: 'Story holding is the base case assumption.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-11',
        "Bad: Story holds but credit tightens; you can't bridge timing gaps.",
        "Bad: Story holds but credit tightens; you can't bridge timing gaps.",
        {
          severity: 'Medium',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5a', "But if the story holds, why would credit tighten?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-11a',
        "Because credit tightens for reasons beyond your story. Macro factors, sector sentiment, regulatory changes—these can tighten credit even when your specific situation is strong. The story can hold for you, but credit can still disappear for your sector.",
        "Credit tightens for macro reasons, not your story. Your story can hold while credit freezes.",
        {
          severity: 'Medium',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Macro credit cycles', 'Sector correlation'],
            lensApplied: 'External dependency',
            conclusion: 'Credit availability is partially independent of individual stories.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-12',
        "Ugly: Story breaks + credit tightens + burn persists; you are forced into dilution.",
        "Ugly: Story breaks + credit tightens + burn persists; you are forced into dilution.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-5b', "What do you mean by dilution? Like equity dilution?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-12a',
        "Yes. Equity dilution, but also forced selling at bad prices, accepting bad terms, taking expensive loans. Dilution is when you're forced to give up more than you planned because you need capital now and options are limited.",
        "Dilution: giving up more than planned because you need capital now and options are gone.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: [],
            dataUsed: ['Forced selling scenarios', 'Dilution mechanics'],
            lensApplied: 'Forced move analysis',
            conclusion: 'Dilution occurs when forced to act under stress.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '18-22': [
    {
      type: 'user',
      data: createUserMessage('u2-6', "Tell me why I shouldn't do this."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-13',
        "Because concentration makes you fragile to a single narrative.",
        "Because you are betting your identity on one story.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-6a', "But I'm not betting my identity. I'm betting on a good opportunity."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-13a',
        "You're betting on an opportunity. But if that opportunity fails, and it forces you to sell equity, or tighten spending, or change your lifestyle—that's identity risk. Your identity is wrapped up in your wealth, your freedom, your ability to take risks. If the bet fails and compresses that, you've lost identity, not just money.",
        "If the bet fails and compresses your lifestyle, you've lost identity. That's the bet.",
        {
          severity: 'High',
          cognition: {
            signalsObserved: ['Identity disconnection'],
            dataUsed: ['Lifestyle dependency', 'Identity attachment to outcomes'],
            lensApplied: 'Identity risk analysis',
            conclusion: 'Financial bets carry identity risk when lifestyle is at stake.',
            confidenceCaveats: '',
          },
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-6b', "So what should I do? Just avoid all risks?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-13b',
        "No. Take the risk. But separate survival capital from growth capital first. Protect your baseline—12 months of runway, family expenses covered, no forced selling—then bet with the rest. That way, if the bet fails, your identity stays intact because your survival isn't threatened.",
        "Take the risk. But protect survival capital first. Bet with growth capital, not survival capital.",
        {
          cognition: {
            signalsObserved: [],
            dataUsed: ['Survival vs growth capital allocation', 'Runway requirements'],
            lensApplied: 'Capital separation',
            conclusion: 'Separate survival from growth to preserve identity.',
            confidenceCaveats: '',
          },
        }
      ),
    },
  ],
  '22-25': [
    {
      type: 'user',
      data: createUserMessage('u2-13', "So what exactly do I need to do? Give me the rules."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-14',
        "Conditions:\n\n- survival capital segregated (12 months runway)\n- no forced selling requirements\n- reduce fixed obligations\n- pre-commit to max loss\n- define exit triggers before entry\n- diversify time-to-cash sources\n- stress-test with credit unavailable\n- ensure family baseline unaffected",
        "Conditions:\n\n- Survival capital segregated (12 months)\n- No forced selling\n- Reduce fixed obligations\n- Pre-commit max loss\n- Define exit triggers before entry\n- Diversify time-to-cash\n- Stress-test credit unavailable\n- Family baseline protected",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-14', "Got it. And what about taxes? I know there's tax risk here but I'm not sure how to manage it."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-15',
        'Tax conditions for a concentrated profile:',
        'Tax conditions. Follow them or you are gambling.',
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-16',
        "Tax conditions (with consequences):\n\n1) Do not fund a new bet by creating a short-term gain bill.\n   Consequence: Short-term realization increases tax friction and reduces survival capital.\n\n2) If diversifying, stage sales to reduce bracket shock (conceptual).\n   Consequence: Smooth tax impact over multiple years.\n\n3) Pre-fund tax reserve before triggering realization.\n   Consequence: Avoid surprise bills that compress survival capital.\n\n4) Avoid concentration + tax lock-in by setting a planned diversification path.\n   Consequence: Prevent forced sales at bad times.\n\n5) Keep survival capital untouched by tax events.\n   Consequence: Maintain buffer regardless of tax outcomes.",
        "Tax conditions:\n\n1) Do not fund bet with short-term gains. Consequence: Higher tax friction.\n2) Stage sales if diversifying (conceptual). Consequence: Smooth tax impact.\n3) Pre-fund tax reserve before realization. Consequence: Avoid surprise bills.\n4) Plan diversification path. Consequence: Avoid lock-in.\n5) Keep survival capital untouched. Consequence: Maintain buffer.",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-15', "These are hard constraints. What happens if I ignore one or two of them?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-16a',
        "The consequences are listed for a reason. Ignore them and you're betting that nothing goes wrong. That's fine if you're comfortable with that level of risk, but don't confuse it with following the conditions.",
        "Ignore conditions = betting nothing goes wrong. That's your choice, but it's not following the conditions.",
      ),
    },
  ],
  '25-28': [
    {
      type: 'user',
      data: createUserMessage('u2-16', "Show me what breaks. I need to see the failure mode."),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-15',
        "Crisis script:\n\n- bridge needed within 45 days\n- credit frozen\n- equity illiquid\n- brokerage down\n- only cash saves you",
        "Crisis script:\n\n- Bridge needed 45 days\n- Credit frozen\n- Equity illiquid\n- Brokerage down\n- Only cash saves",
        {
          severity: 'High',
        }
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-17', "So cash is the only thing that matters in a crisis? Everything else locks up?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-15a',
        "In crisis, everything that isn't cash becomes uncertain. Credit lines freeze, markets lock, equity becomes illiquid. Cash is the only certainty. That's why survival capital must be cash, not paper wealth.",
        "In crisis: credit freezes, markets lock, equity illiquid. Cash is the only certainty. That's why survival capital must be cash.",
      ),
    },
  ],
  '28-30': [
    {
      type: 'user',
      data: createUserMessage('u2-18', "So bottom line—am I doing this or not? What's the call?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-16',
        "I'm not saying no. I'm saying separate survival from growth first.",
        "Fix survival capital. Then take the bet.",
      ),
    },
    {
      type: 'user',
      data: createUserMessage('u2-19', "So fix survival capital first, then the bet is okay? That's the plan?"),
    },
    {
      type: 'advisor',
      data: createAdvisorMessage(
        'a2-16a',
        "Yes. Ring-fence survival capital—12 months runway, untouchable. Once that's protected, then evaluate the bet. Survival capital first, growth bets second. In that order.",
        "Ring-fence survival capital first. Then evaluate the bet. In that order.",
      ),
    },
  ],
};

export const persona2Agents: Record<Phase, AgentStatus[]> = {
  '00-02': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Primary income: Tech ($320k/year) | Equity comp: $600k illiquid | Brokerage: $90k tech-heavy | Credit: HELOC available',
      computation: 'Correlation matrix: Job loss + equity drop + market crash + credit freeze = 0.71 correlation | Single narrative: Tech sector downturn affects all four simultaneously',
      outputs: 'Single narrative risk identified: Tech sector correlation = 0.71 (high) | All assets move together in sector downturn',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Liquid assets: $52k (checking + savings) | Monthly burn: $15,000 | Illiquid equity: $600k | Time-to-access equity: 6-18 months',
      computation: 'Runway = $52k / $15k = 3.47 months | Under stress: Equity access delays 12-24 months, credit freezes, only $52k accessible',
      outputs: 'Access timing risk high | Current runway: 3.47 months | Under stress: Only $52k accessible (equity locked, credit frozen)',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'User language: "calculated risk", "changes everything" | Outcome dependency: High | Historical success: Likely 1-2 big wins',
      computation: 'Overconfidence index: 0.68 (high) | Narrative bias: Strong commitment to story, seeks confirming evidence | Luck attribution: Underweights luck in past wins',
      outputs: 'Overconfidence bias detected (0.68) | Narrative bias: Strong story commitment | Underweights luck in outcomes',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current runway: 3.47 months | Obligations: $8,400/month fixed | Income: $320k/year | Concentration: 75% in tech/single narrative',
      computation: 'If story holds: Freedom timeline = 6.2 years | If story breaks: Freedom timeline = 12.8 years (forced lifestyle compression)',
      outputs: 'Freedom trajectory: Base case 6.2 years | Stress case 12.8 years (2x delay) | Identity risk: High if story breaks',
    },
  ],
  '02-06': [
    {
      name: 'Liquidity Sentinel',
      status: 'Completed',
      inputs: 'Liquid: $52k | Net worth: $720k | Illiquid: $600k equity + $90k brokerage | Monthly burn: $15k',
      computation: 'Liquidity ratio = $52k / $720k = 7.2% | Runway = 3.47 months | Access gap: $668k (93%) locked in illiquid assets',
      outputs: 'Liquidity is constraint: Only 7.2% accessible | Runway: 3.47 months | 93% of net worth locked in illiquid assets',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Completed',
      inputs: 'Tech job + tech equity + tech brokerage + tech credit dependency',
      computation: 'Correlation score: 0.71 | Single narrative: All assets tied to tech sector | Diversification: Low (concentrated exposure)',
      outputs: 'Single narrative risk: 0.71 correlation | All assets depend on tech sector story | Diversification: Low',
    },
  ],
  '06-10': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Current runway: 3.47 months | Story validation timeline: 6-12 months | Monthly burn: $15k | Credit dependency: High',
      computation: 'Tolerance gap: Story needs 6-12 months to validate, but runway only 3.47 months | Fuse length: 3.47 months (short)',
      outputs: 'Short fuse identified: 3.47 months runway vs 6-12 month story timeline | Tolerance gap: -2.5 to -8.5 months',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Credit availability: Normal vs stress | Equity access: Vesting windows | Market liquidity',
      computation: 'Normal times: Credit available, equity accessible in 6 months | Stress times: Credit freezes, equity windows close, only cash accessible',
      outputs: 'Capital availability: Normal (high) | Stress (low) | Gap: 90% of assets become inaccessible during stress',
    },
  ],
  '10-14': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Job dependency: Tech sector | Equity dependency: Tech sector | Brokerage dependency: Tech-heavy | Credit dependency: Tech sector health',
      computation: 'Correlation stacking: All 4 dependencies move together | Stacking multiplier: 1.4x (risks compound, not add) | Probability of simultaneous failure: 18% in 5-year period',
      outputs: 'Correlation risk high: 0.71 correlation, 1.4x stacking multiplier | Probability of simultaneous failure: 18% in 5 years',
    },
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Capital availability assumptions | Historical fundraising success',
      computation: 'Availability bias: Overweights past success, underweights stress scenarios | Historical data: 100% success in normal times, 0% in stress times (but user only experienced normal)',
      outputs: 'Capital availability illusion detected | Overweights past success (normal times) | Underweights stress scenarios',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Equity comp: $600k | Vesting schedule: Quarterly | Market conditions: Normal vs stress',
      computation: 'Normal: Equity accessible in 3-6 months | Stress: Vesting windows close, blackout periods extend, access delays 12-24 months',
      outputs: 'Equity access timing: Normal (3-6 months) | Stress (12-24 months) | Access risk: High during stress',
    },
    {
      name: 'Tax Strategist',
      status: 'Flagging',
      inputs: 'Concentrated position: Tech stock $60k, gain $25k | Holding period: Short-term | Tax bracket: High | State: IL',
      computation: 'Tax lock-in risk: High embedded gain creates reluctance to diversify | Short-term risk: Medium (25k gain would be taxed at 24-37% range) | Net-of-tax impact: Selling $60k position = -$9k to -$14k tax bill (illustrative)',
      outputs: 'Tax lock-in risk: High + Short-term risk: Medium/High | Net-of-tax impact range: -$9k to -$14k if sold now (illustrative)',
    },
  ],
  '14-18': [
    {
      name: 'Risk Correlation Mapper',
      status: 'Simulating',
      inputs: 'Base: Story holds | Bad: Story holds, credit tightens | Ugly: Story breaks, credit freezes, burn persists',
      computation: 'Base path: Runway improves to 4.2 months in 12 months | Bad path: Runway stays 3.47 months (credit unavailable for growth) | Ugly path: Runway drops to 1.2 months, forced dilution at 40% discount',
      outputs: 'Base/Bad/Ugly paths: Base (4.2 months), Bad (3.47 months), Ugly (1.2 months + dilution) | Dilution risk: High in ugly path (40% discount)',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Three scenarios: Base (story holds), Bad (credit tightens), Ugly (story breaks)',
      computation: 'Freedom timeline shifts: Base (+0 years), Bad (+0.8 years), Ugly (+6.6 years due to dilution and lifestyle compression)',
      outputs: 'Freedom timeline: Base (no change), Bad (+0.8 years), Ugly (+6.6 years) | Identity risk: High in ugly path',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Crisis scenario: Need $45k in 45 days | Available: $52k cash | Equity locked, credit frozen',
      computation: 'Crisis drill: $45k needed, $52k available (covers it) | But if crisis extends to 90 days: Need $90k, only $52k available, forced dilution or expensive borrowing',
      outputs: 'Crisis drill: 45 days covered ($52k available) | 90 days crisis: $38k shortfall, forced dilution required',
    },
  ],
  '18-22': [
    {
      name: 'Behavioral Auditor',
      status: 'Checking',
      inputs: 'Lifestyle dependency: $15k/month burn | Identity attachment: High (wealth = identity) | Lifestyle compression tolerance: Low',
      computation: 'Identity risk score: 0.78 (high) | Lifestyle dependency: $15k/month requires $320k income | Compression impact: Failed bet forces lifestyle change = identity loss',
      outputs: 'Identity risk high (0.78) | Lifestyle compression = identity loss | Risk: Failed bet forces permanent lifestyle change',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Mapping',
      inputs: 'Survival capital vs growth capital | Identity dependency on outcomes',
      computation: 'Survival capital required: $180k (12 months runway) | Current survival capital: $52k (3.47 months) | Gap: -$128k (survival capital insufficient)',
      outputs: 'Survival capital gap: -$128k (insufficient) | Need to segregate $180k before betting | Identity protected only if survival capital segregated',
    },
  ],
  '22-25': [
    {
      name: 'Profile Analyzer',
      status: 'Scanning',
      inputs: '8 conditions: Survival capital (12 months), No forced selling, Reduce obligations, Pre-commit max loss, Exit triggers, Diversify time-to-cash, Stress test credit unavailable, Family baseline protected',
      computation: 'Condition check: Survival capital (FAIL: $52k vs $180k required), Forced selling (PASS: no requirement), Obligations (PASS: can reduce), Max loss (FAIL: not defined), Exit triggers (FAIL: not defined), Diversify (FAIL: all tech), Credit stress (FAIL: not tested), Family (PASS: baseline stable)',
      outputs: '8 conditions: 4 PASS, 4 FAIL | Critical failures: Survival capital insufficient, Max loss undefined, Exit triggers undefined, No diversification',
    },
    {
      name: 'Tax Strategist',
      status: 'Flagging',
      inputs: 'Funding requirements: New bet may require selling | Current positions: $90k brokerage, $25k embedded gains | Holding periods: Mixed (short-term risk present)',
      computation: 'Tax condition check: Short-term gain risk (FAIL if selling short-term), Tax reserve need (FAIL if not pre-funded), Survival capital protection (FAIL if tax bill reduces survival capital)',
      outputs: 'Tax conditions: 3 checks needed | Risk: Short-term gains create tax friction | Recommendation: Pre-fund tax reserve, stage sales, or use tax-advantaged rebalancing',
    },
    {
      name: 'Freedom Optimizer',
      status: 'Projecting',
      inputs: 'Current freedom timeline: 6.2 years | If bet succeeds: 4.1 years | If bet fails: 12.8 years',
      computation: 'Bet impact: Success accelerates by 2.1 years, failure delays by 6.6 years | Asymmetry: 3.1x downside penalty vs upside reward',
      outputs: 'Bet impact: +2.1 years if success, -6.6 years if failure | Asymmetry: 3.1x downside penalty',
    },
  ],
  '25-28': [
    {
      name: 'Liquidity Sentinel',
      status: 'Simulating',
      inputs: 'Crisis: $45k needed in 45 days | Available: $52k cash, $600k equity (locked), $90k brokerage (down 30%)',
      computation: 'Crisis drill: Cash covers 45-day need ($52k available) | But 90-day crisis: Need $90k, cash covers $52k, equity locked, brokerage down 30% ($63k value), forced to sell at discount or borrow expensive',
      outputs: 'Only cash saves in crisis: $52k covers 45 days, not 90 days | 90-day crisis: $38k shortfall, forced dilution or borrowing at 15-20% APR',
    },
    {
      name: 'Risk Correlation Mapper',
      status: 'Simulating',
      inputs: 'Crisis scenario: Tech sector crash, credit freeze, equity windows close, brokerage down',
      computation: 'Correlation materializes: All 4 risks fail simultaneously (job + equity + brokerage + credit) | Probability: 18% in 5 years | Impact: Runway drops to 1.2 months, forced dilution',
      outputs: 'Correlation materialization: All 4 risks fail together (18% probability) | Impact: Runway 1.2 months, forced dilution at 40% discount',
    },
  ],
  '28-30': [
    {
      name: 'Freedom Optimizer',
      status: 'Completed',
      inputs: 'Final assessment: Survival capital gap (-$128k), Identity risk (0.78), Correlation risk (0.71), Dilution risk (high)',
      computation: 'Stance determination: Must segregate $180k survival capital before betting | Protect identity by protecting baseline lifestyle | Separate survival from growth',
      outputs: 'Stance: Separate survival from growth | Required action: Segregate $180k (12 months runway) before taking bet | Identity protected only if survival capital protected',
    },
    {
      name: 'Liquidity Sentinel',
      status: 'Completed',
      inputs: 'Final liquidity assessment: $52k current, $180k required for survival capital',
      computation: 'Survival capital gap: -$128k | Recommendation: Build to $180k before betting | Time to build: 8.5 months at current savings rate',
      outputs: 'Survival capital recommendation: Build to $180k (12 months runway) before betting | Current: $52k | Gap: $128k | Timeline: 8.5 months',
    },
  ],
};
