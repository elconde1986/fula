import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFulaStore } from '../store';
import { personas } from '../data/personas';
import { personaTranscripts, personaAgents } from '../data/personaTranscripts';
import AdvisorMessageCard from '../components/AdvisorMessageCard';
import UserMessage from '../components/UserMessage';
import AgentConsole from '../components/AgentConsole';
import SessionTimeline from '../components/SessionTimeline';
import EvidenceCard from '../components/EvidenceCard';
import * as Visuals from '../components/visuals';
import type { Phase } from '../types';
import {
  calculateRunway,
  calculateTII,
  calculatePAWRatio,
} from '../utils/calculators';

export default function Session() {
  const { personaId } = useParams<{ personaId: string; scenarioId: string }>();
  const {
    tone,
    currentPhase,
    setPhase,
    messages,
    setMessages,
    agentConsole,
    updateAgentConsole,
    updateEvidenceCards,
    updateVisuals,
  } = useFulaStore();

  const persona = personas.find((p) => p.id === personaId);
  const transcript = personaId ? personaTranscripts[personaId as '1' | '2' | '3' | '4'] : null;
  const agents = personaId ? personaAgents[personaId as '1' | '2' | '3' | '4'] : null;

  const [activeTab, setActiveTab] = useState<'conversation' | 'evidence' | 'agents' | 'timeline'>('conversation');

  useEffect(() => {
    if (!persona || !transcript || !agents) return;

    try {
      // Load messages for current phase
      const phaseMessages = transcript[currentPhase] || [];
      setMessages(phaseMessages);

      // Load agents for current phase
      const phaseAgents = agents[currentPhase] || [];
      updateAgentConsole(phaseAgents);

      // Update evidence cards based on phase
      const evidenceCardsData = generateEvidenceCards(persona.profile, currentPhase);
      // Convert to EvidenceCard format with id and phase
      const evidenceCards = evidenceCardsData.map((card, i) => ({
        id: `card-${currentPhase}-${i}`,
        phase: currentPhase,
        title: card.title,
        content: card.content,
      }));
      updateEvidenceCards(evidenceCards);

      // Update visuals based on phase
      const visuals = generateVisuals(persona.profile, currentPhase, persona.id);
      updateVisuals(visuals);
    } catch (error) {
      console.error('Error loading session data:', error);
    }
  }, [persona, currentPhase, transcript, agents, setMessages, updateAgentConsole, updateEvidenceCards, updateVisuals]);

  const handlePhaseChange = (phase: Phase) => {
    setPhase(phase);
  };

  if (!persona || !transcript || !agents) {
    return (
      <div className="text-center py-12 text-gray-900">
        <p>Loading session...</p>
        <p className="text-sm text-gray-600 mt-2">
          Persona: {personaId || 'undefined'}, Persona found: {persona ? 'yes' : 'no'}, 
          Transcript: {transcript ? 'yes' : 'no'}, Agents: {agents ? 'yes' : 'no'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SessionTimeline currentPhase={currentPhase} onPhaseChange={handlePhaseChange} />

      {/* Mobile Tabs */}
      <div className="lg:hidden border-b border-gray-200 bg-white sticky top-16 z-40 backdrop-blur-sm bg-opacity-95">
        <div className="flex">
          {(['conversation', 'evidence', 'agents'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Two Column Layout | Mobile: Tabbed */}
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Conversation (60%) */}
          <div className={`lg:col-span-3 ${activeTab !== 'conversation' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl p-6 min-h-[600px] shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {persona.name} — {tone === 'friendly' ? persona.descriptionFriendly : persona.descriptionDirect}
              </h2>

              <div className="space-y-4">
                {messages && messages.length > 0 ? (
                  messages.map((msg) => {
                    if (msg.type === 'advisor') {
                      return <AdvisorMessageCard key={msg.data.id} message={msg.data} tone={tone} />;
                    } else {
                      return <UserMessage key={msg.data.id} message={msg.data} />;
                    }
                  })
                ) : (
                  <div className="text-gray-500 text-center py-8">No messages in this phase.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Evidence + Agents (40%) */}
          <div className={`lg:col-span-2 space-y-4 ${activeTab === 'evidence' || activeTab === 'agents' ? '' : 'hidden lg:block'}`}>
            {/* Agent Console */}
            <div className={activeTab === 'agents' ? 'block' : 'hidden lg:block'}>
              <AgentConsole agents={agentConsole} />
            </div>

            {/* Evidence Cards */}
            <div className={activeTab === 'evidence' ? 'block' : 'hidden lg:block'}>
              {generateEvidenceCards(persona.profile, currentPhase).map((card, i) => {
                try {
                  return (
                    <EvidenceCard key={i} title={card.title}>
                      {card.content}
                    </EvidenceCard>
                  );
                } catch (error) {
                  console.error(`Error rendering evidence card ${i}:`, error);
                  return null;
                }
              })}
            </div>

            {/* Visual Explainables */}
            <div className={activeTab === 'evidence' ? 'block' : 'hidden lg:block'}>
              {generateVisuals(persona.profile, currentPhase, persona.id).map((visual, i) => {
                try {
                  return (
                    <div key={i} className="mb-4">
                      {renderVisual(visual)}
                    </div>
                  );
                } catch (error) {
                  console.error(`Error rendering visual ${i}:`, error);
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateEvidenceCards(profile: any, phase: Phase) {
  try {
    const runway = calculateRunway(profile);
    const tii = calculateTII(profile);
    const paw = calculatePAWRatio(profile);

    const cards: Array<{ title: string; content: React.ReactNode }> = [];

  if (phase === '02-06' || phase === '06-10') {
    cards.push({
      title: 'Reality Snapshot',
      content: (
        <div className="space-y-2 text-gray-700">
          <div>Runway: ~{runway.toFixed(1)} months</div>
          <div>Time Independence Index: {tii.toFixed(1)} months</div>
          <div>Liquid Assets: ${(profile.checking + profile.savings).toLocaleString()}</div>
        </div>
      ),
    });

    cards.push({
      title: 'Financial Freedom (Time Independence Index)',
      content: <div className="text-gray-700">{tii.toFixed(1)} months of runway</div>,
    });

    cards.push({
      title: 'PAW/UAW (Millionaire Next Door lens)',
      content: (
        <div className="text-gray-700">
          Classification: <strong className="text-gray-900">{paw.label}</strong> (Ratio: {paw.ratio.toFixed(2)})
        </div>
      ),
    });
  }

  if (phase === '10-14') {
    cards.push({
      title: 'Blind Spots',
      content: (
        <div className="space-y-2 text-gray-700">
          <div>• Stress changes decisions</div>
          <div>• Liquidity disappears when needed</div>
          <div>• Overlap risk: multiple failures at once</div>
        </div>
      ),
    });

    // Add Tax Lens evidence card
    if (profile.taxProfile && profile.taxProfile.taxablePositions && profile.taxProfile.taxablePositions.length > 0) {
      const taxProfile = profile.taxProfile;
      const totalGains = taxProfile.taxablePositions.reduce((sum: number, pos: any) => sum + (pos.marketValue - pos.costBasis), 0);
      const hasShortTerm = taxProfile.taxablePositions.some((pos: any) => pos.holdingPeriod === 'Short-term' || pos.holdingPeriod === 'Mixed');
      const dividendHeavy = taxProfile.taxablePositions.some((pos: any) => pos.ticker && (pos.ticker.includes('Dividend') || pos.ticker.includes('dividend')));
      
      const realizedGainExposure = totalGains > 50000 ? 'High' : totalGains > 20000 ? 'Medium' : 'Low';
      const shortTermRisk = hasShortTerm ? (totalGains > 30000 ? 'High' : 'Medium') : 'Low';
      const taxDragRisk = dividendHeavy ? 'Medium' : 'Low';

      cards.push({
        title: 'Tax Lens — Net-of-Tax Reality',
        content: (
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-gray-900">Realized gain exposure:</span> {realizedGainExposure}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Short-term realization risk:</span> {shortTermRisk}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Tax drag risk (ongoing):</span> {taxDragRisk}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              <span className="font-semibold">Account location note:</span> Taxable positions create ongoing tax drag through dividends and interest. Consider location-aware allocation (conceptual). Rebalance in tax-advantaged accounts first to reduce unnecessary realized gains.
            </div>
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
              <span className="font-semibold text-gray-900">Net-of-tax impact range:</span> ${((totalGains * 0.15).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}–${((totalGains * 0.37).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} if all positions sold (illustrative range)
            </div>
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
              <span className="font-semibold text-gray-900">Questions for CPA:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
                <li>Confirm holding period classification</li>
                <li>State-specific tax impacts</li>
                <li>Real estate depreciation/recapture (if property)</li>
                <li>Passive activity limitations</li>
                <li>Loss harvesting strategies</li>
              </ul>
            </div>
          </div>
        ),
      });
    }
  }

  if (phase === '14-18') {
    cards.push({
      title: 'Ruin Analysis',
      content: (
        <div className="space-y-2 text-gray-700">
          <div>Base Path: Steady progress if disciplined</div>
          <div>Bad Path: 6-month disruption collapses buffer</div>
          <div>Ugly Path: Overlap creates forced moves</div>
        </div>
      ),
    });
  }

  if (phase === '22-25') {
    cards.push({
      title: 'Conditions to Proceed',
      content: (
        <div className="space-y-2 text-xs text-gray-700">
          <div>1. 12+ months liquidity post-purchase</div>
          <div>2. No refi dependence</div>
          <div>3. 6+ months vacancy tolerance</div>
          <div>4. Capex reserve prefunded</div>
          <div>5. Exit without forced sale</div>
          <div>6. Rate shock survivable</div>
          <div>7. Does not delay freedom goal</div>
          <div>8. You can walk away</div>
        </div>
      ),
    });

    // Add Tax Lens evidence card for Phase 22-25
    if (profile.taxProfile && profile.taxProfile.taxablePositions && profile.taxProfile.taxablePositions.length > 0) {
      const taxProfile = profile.taxProfile;
      const totalGains = taxProfile.taxablePositions.reduce((sum: number, pos: any) => sum + (pos.marketValue - pos.costBasis), 0);
      const hasShortTerm = taxProfile.taxablePositions.some((pos: any) => pos.holdingPeriod === 'Short-term' || pos.holdingPeriod === 'Mixed');
      
      const realizedGainExposure = totalGains > 50000 ? 'High' : totalGains > 20000 ? 'Medium' : 'Low';
      const shortTermRisk = hasShortTerm ? (totalGains > 30000 ? 'High' : 'Medium') : 'Low';

      cards.push({
        title: 'Tax Lens — Net-of-Tax Reality',
        content: (
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-gray-900">Realized gain exposure:</span> {realizedGainExposure}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Short-term realization risk:</span> {shortTermRisk}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Tax drag risk (ongoing):</span> Medium
            </div>
            <div className="text-xs text-gray-600 mt-2">
              <span className="font-semibold">Account location note:</span> Prefer rebalancing in tax-advantaged accounts first. Plan tax reserve before any realization events.
            </div>
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
              <span className="font-semibold text-gray-900">Net-of-tax impact range:</span> ${((totalGains * 0.15).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}–${((totalGains * 0.37).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} if all positions sold (illustrative range)
            </div>
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
              <span className="font-semibold text-gray-900">Questions for CPA:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
                <li>Tax reserve calculation before realization</li>
                <li>Staging sales for bracket management</li>
                <li>State-specific implications</li>
                <li>Property depreciation/recapture (if applicable)</li>
                <li>Loss harvesting constraints</li>
              </ul>
            </div>
          </div>
        ),
      });
    }
  }

  if (phase === '25-28') {
    const liquidAssets = profile.checking + profile.savings;
    const runway = calculateRunway(profile);
    
    cards.push({
      title: 'Liquidity Stress Test',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">Current liquid buffer:</span> ${liquidAssets.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Current runway:</span> ~{runway.toFixed(1)} months
          </div>
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <span className="font-semibold text-gray-900">Crisis scenario:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
              <li>Credit lines frozen</li>
              <li>Brokerage access delayed (settlement risk)</li>
              <li>Retirement accounts inaccessible (penalty)</li>
              <li>Only checking + savings available immediately</li>
            </ul>
          </div>
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
            <span className="font-semibold text-gray-900">Time-to-cash ladder:</span> See visual below for conversion timeline
          </div>
        </div>
      ),
    });

    cards.push({
      title: 'Crisis Readiness',
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">Immediate access (0-7 days):</span> ${profile.checking.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Short-term access (8-30 days):</span> ${profile.savings.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Emergency runway (cash only):</span> {((liquidAssets / profile.monthlyBurn)).toFixed(1)} months
          </div>
          <div className="mt-3 text-xs text-gray-600">
            <strong>Note:</strong> In crisis, only cash and near-cash assets are accessible. Brokerage and retirement accounts may have delays, penalties, or be unavailable when most needed.
          </div>
        </div>
      ),
    });
  }

  if (phase === '28-30') {
    const runway = calculateRunway(profile);
    const tii = calculateTII(profile);
    const fixedCostRatio = (profile.mortgagePITI + profile.creditCardMins + profile.otherDebt) / profile.monthlyBurn;
    
    cards.push({
      title: 'Advisor Stance & Recommendation',
      content: (
        <div className="space-y-3 text-sm text-gray-700">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="font-semibold text-gray-900 mb-2">Stance: Caution</div>
            <div className="text-xs">Wait unless all conditions met. Your freedom is worth more than activity.</div>
          </div>
          <div className="mt-3">
            <span className="font-semibold text-gray-900">Current Position:</span>
            <ul className="list-disc list-inside mt-1 text-xs space-y-1">
              <li>Runway: {runway.toFixed(1)} months (target: 9+ months)</li>
              <li>Time Independence: {tii.toFixed(1)} months</li>
              <li>Fixed cost ratio: {(fixedCostRatio * 100).toFixed(1)}%</li>
            </ul>
          </div>
          <div className="mt-3">
            <strong className="text-gray-900">Next Review Triggers:</strong>
            <ul className="list-disc list-inside mt-1 text-xs space-y-1">
              <li>Runway reaches 9 months → reassess opportunity</li>
              <li>Fixed costs fall below 40% of monthly burn → reassess</li>
              <li>Capex reserves fully funded without buffer reduction → reassess</li>
              <li>All 8 conditions met simultaneously → proceed with caution</li>
            </ul>
          </div>
        </div>
      ),
    });

    cards.push({
      title: 'Priority Actions',
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <div className="font-semibold text-gray-900">Build Buffer First:</div>
          <ul className="list-disc list-inside text-xs space-y-1 mt-1">
            <li>Increase runway to 9+ months before considering new obligations</li>
            <li>Reduce fixed costs if ratio exceeds 50%</li>
            <li>Prefund capex reserves (target: 6-12 months property expenses)</li>
            <li>Maintain tax reserve for any planned realizations</li>
          </ul>
          <div className="mt-3 font-semibold text-gray-900">Monitor Triggers:</div>
          <ul className="list-disc list-inside text-xs space-y-1 mt-1">
            <li>Track runway monthly</li>
            <li>Review fixed cost ratio quarterly</li>
            <li>Reassess when conditions change, not on calendar schedule</li>
          </ul>
        </div>
      ),
    });
  }

    return cards;
  } catch (error) {
    console.error('Error generating evidence cards:', error);
    return [];
  }
}

function generateVisuals(profile: any, phase: Phase, personaId: string) {
  const visuals: any[] = [];
  const runway = calculateRunway(profile);
  const monthlyIncome = profile.pretaxIncome / 12;
  const liquidAssets = profile.checking + profile.savings;

  if (phase === '00-02' && personaId === '1') {
    visuals.push({
      type: 'paperVsStress',
      data: {
        left: {
          title: 'Looks Fine on Paper',
          bullets: ['High income', 'Growing net worth', 'Bills paid on time'],
        },
        right: {
          title: 'Breaks Under Stress',
          bullets: ['Obligations persist', 'Liquidity converts slowly', 'Stress forces timing'],
        },
      },
    });
    // Add financial health chart
    visuals.push({
      type: 'financialHealth',
      data: {
        liquidity: Math.min(100, (runway / 12) * 100),
        solvency: Math.min(100, (profile.netWorth / (profile.pretaxIncome * 5)) * 100),
        leverage: Math.max(0, 100 - ((profile.mortgagePITI + profile.creditCardMins + profile.otherDebt) / monthlyIncome) * 100),
        diversification: Math.min(100, ((profile.brokerage + profile.retirement) / profile.netWorth) * 100),
        growth: Math.min(100, (profile.netWorth / (profile.age * profile.pretaxIncome / 10)) * 100),
      },
    });
  }

  if (phase === '02-06') {
    visuals.push({
      type: 'timeToCashLadder',
      data: {
        buckets: [
          { range: '0–7 days', source: 'Checking', amount: profile.checking, friction: 'Immediate' },
          { range: '8–30 days', source: 'Savings', amount: profile.savings, friction: 'Transfer time' },
          { range: '31–90 days', source: 'Brokerage', amount: profile.brokerage, friction: 'Sell + settlement' },
          { range: '90+ days', source: 'Retirement', amount: profile.retirement, friction: 'Penalty/friction' },
        ],
      },
    });
    // Add asset allocation chart
    visuals.push({
      type: 'assetAllocation',
      data: {
        checking: profile.checking,
        savings: profile.savings,
        brokerage: profile.brokerage,
        retirement: profile.retirement,
      },
    });
  }

  if (phase === '06-10') {
    // Add income vs expenses chart
    visuals.push({
      type: 'incomeExpense',
      data: {
        monthlyIncome,
        monthlyExpenses: profile.monthlyBurn,
        breakdown: {
          mortgage: profile.mortgagePITI,
          creditCards: profile.creditCardMins,
          otherDebt: profile.otherDebt,
          living: profile.monthlyBurn - profile.mortgagePITI - profile.creditCardMins - profile.otherDebt,
        },
      },
    });
    // Add financial health chart for directional progress
    visuals.push({
      type: 'financialHealth',
      data: {
        liquidity: Math.min(100, (runway / 12) * 100),
        solvency: Math.min(100, (profile.netWorth / (profile.pretaxIncome * 5)) * 100),
        leverage: Math.max(0, 100 - ((profile.mortgagePITI + profile.creditCardMins + profile.otherDebt) / monthlyIncome) * 100),
        diversification: Math.min(100, ((profile.brokerage + profile.retirement) / profile.netWorth) * 100),
        growth: Math.min(100, (profile.netWorth / (profile.age * profile.pretaxIncome / 10)) * 100),
      },
    });
  }

  if (phase === '10-14') {
    // Add runway visualization
    visuals.push({
      type: 'runwayVisualization',
      data: {
        runwayMonths: runway,
        monthlyBurn: profile.monthlyBurn,
        liquidAssets,
        targetRunway: 6,
      },
    });
    // Add dependency map for blind spots
    if (personaId === '1' || personaId === '2') {
      visuals.push({
        type: 'dependencyMap',
        data: {
          nodes: [
            { id: 'Income', dependencies: [] },
            { id: 'Housing', dependencies: ['Income'] },
            { id: 'Investments', dependencies: ['Income'] },
            { id: 'Credit', dependencies: ['Income', 'Housing'] },
          ],
          edges: [
            { from: 'Income', to: 'Housing', label: 'Required' },
            { from: 'Income', to: 'Investments', label: 'Funds' },
            { from: 'Income', to: 'Credit', label: 'Qualifies' },
            { from: 'Housing', to: 'Credit', label: 'Secures' },
          ],
        },
      });
    }

    // Add tax visuals for Phase 10-14
    if (profile.taxProfile && profile.taxProfile.taxablePositions && profile.taxProfile.taxablePositions.length > 0) {
      const taxProfile = profile.taxProfile;
      const hasShortTerm = taxProfile.taxablePositions.some((pos: any) => pos.holdingPeriod === 'Short-term');
      const hasMixed = taxProfile.taxablePositions.some((pos: any) => pos.holdingPeriod === 'Mixed');
      const holdingPeriod: 'Short-term' | 'Long-term' | 'Mixed' = hasMixed ? 'Mixed' : (hasShortTerm ? 'Short-term' : 'Long-term');

      // Realized vs Unrealized visual
      visuals.push({
        type: 'realizedVsUnrealized',
        data: {
          unrealized: {
            title: 'Unrealized',
            description: 'Paper gain, no tax due today',
          },
          realized: {
            title: 'Realized',
            description: 'Sale triggers tax event',
          },
        },
      });

      // Holding Period Gauge
      visuals.push({
        type: 'holdingPeriodGauge',
        data: {
          holdingPeriod,
        },
      });

      // Funding Source Comparison
      visuals.push({
        type: 'fundingSourceComparison',
        data: {
          sources: [
            {
              label: 'Cash',
              taxNote: 'No tax event',
              risk: 'Low' as const,
            },
            {
              label: 'Sell Taxable',
              taxNote: 'Tax event; depends on gain',
              risk: 'Medium' as const,
            },
            {
              label: 'Sell Retirement',
              taxNote: 'Penalties/ordinary income risk (conceptual)',
              risk: 'High' as const,
            },
            {
              label: 'Borrow (HELOC)',
              taxNote: 'Rate risk; not tax-free safety',
              risk: 'Medium' as const,
            },
          ],
        },
      });
    }
  }

  if (phase === '14-18') {
    visuals.push({
      type: 'baseBadUgly',
      data: {
        base: {
          label: 'Base',
          trigger: 'Income steady, markets normal',
          consequence: 'Slow runway increase if disciplined',
          pressurePoint: 'Spending discipline required',
        },
        bad: {
          label: 'Bad',
          trigger: '6-month income disruption',
          consequence: 'Buffer collapses, defensive decisions',
          pressurePoint: 'Forced delay of investments',
        },
        ugly: {
          label: 'Ugly',
          trigger: 'Overlap: disruption + credit tightening',
          consequence: 'Options narrow, trapped by timing',
          pressurePoint: 'Forced selling or expensive borrowing',
        },
      },
    });
    // Add cash flow projection
    visuals.push({
      type: 'cashFlow',
      data: {
        months: Math.min(24, Math.ceil(runway * 1.5)),
        monthlyIncome,
        monthlyExpenses: profile.monthlyBurn,
        startingBalance: liquidAssets,
      },
    });
  }

  if (phase === '18-22' && personaId === '1') {
    // Add dependency map for property decision
    visuals.push({
      type: 'dependencyMap',
      data: {
        nodes: [
          { id: 'Job Income', dependencies: [] },
          { id: 'Primary Residence', dependencies: ['Job Income'] },
          { id: 'Investment Property', dependencies: ['Job Income', 'Primary Residence'] },
          { id: 'Credit Access', dependencies: ['Job Income', 'Primary Residence'] },
        ],
        edges: [
          { from: 'Job Income', to: 'Primary Residence', label: 'Pays mortgage' },
          { from: 'Job Income', to: 'Investment Property', label: 'Qualifies loan' },
          { from: 'Primary Residence', to: 'Investment Property', label: 'Equity secures' },
          { from: 'Job Income', to: 'Credit Access', label: 'Enables' },
        ],
      },
    });
  }

  if (phase === '22-25') {
    // Add tax visuals for Phase 22-25 (Tax Assumption Table)
    if (profile.taxProfile && profile.taxProfile.taxablePositions) {
      visuals.push({
        type: 'assumptionTable',
        data: {
          assumptions: [
            { 
              assumption: 'Holding period classification', 
              why: 'Determines whether gains are taxed at long-term (15-23%) or short-term (24-37%) rates, directly impacting net proceeds from sales.',
              ifFails: 'If classification is wrong, you could pay higher short-term rates on what should be long-term gains, reducing net proceeds by 9-14 percentage points.'
            },
            { 
              assumption: 'Illustrative rates', 
              why: 'Actual tax rates vary by income bracket and state. These illustrative rates (long-term: 15-23%, short-term: 24-37%) are estimates for planning purposes.',
              ifFails: 'If actual rates differ significantly, net-of-tax impact could be materially different than projected, affecting decision-making and liquidity planning.'
            },
            { 
              assumption: 'State impacts', 
              why: 'State taxes can add 0-13%+ on top of federal rates, significantly affecting net proceeds, especially for high-income earners or in high-tax states.',
              ifFails: 'If state taxes are ignored or underestimated, net proceeds could be materially lower than expected, creating liquidity shortfalls or funding gaps.'
            },
            { 
              assumption: 'Passive activity rules (if property)', 
              why: 'Passive activity loss limitations can defer deductions and affect the tax treatment of real estate investments, impacting net cash flow and tax strategy.',
              ifFails: 'If passive activity rules apply unexpectedly, losses may not be immediately deductible, creating cash flow timing mismatches and reducing effective tax benefits.'
            },
          ],
        },
      });
    }
  }

  if (phase === '25-28') {
    // Add time-to-cash ladder for liquidity crisis
    visuals.push({
      type: 'timeToCashLadder',
      data: {
        buckets: [
          { range: '0–7 days', source: 'Checking', amount: profile.checking, friction: 'Immediate' },
          { range: '8–30 days', source: 'Savings', amount: profile.savings, friction: 'Transfer time' },
          { range: '31–90 days', source: 'Brokerage', amount: profile.brokerage, friction: 'Sell + settlement' },
          { range: '90+ days', source: 'Retirement', amount: profile.retirement, friction: 'Penalty/friction' },
        ],
      },
    });
  }

  return visuals;
}

function renderVisual(visual: any) {
  switch (visual.type) {
    case 'paperVsStress':
      return <Visuals.PaperVsStress left={visual.data.left} right={visual.data.right} />;
    case 'timeToCashLadder':
      return <Visuals.TimeToCashLadder buckets={visual.data.buckets} />;
    case 'baseBadUgly':
      return <Visuals.BaseBadUgly base={visual.data.base} bad={visual.data.bad} ugly={visual.data.ugly} />;
    case 'dependencyMap':
      return <Visuals.DependencyMap {...visual.data} />;
    case 'freedomTimeline':
      return <Visuals.FreedomTimeline {...visual.data} />;
    case 'survivalGrowth':
      return <Visuals.SurvivalGrowthBuckets {...visual.data} />;
    case 'assumptionTable':
      return <Visuals.AssumptionTable assumptions={visual.data.assumptions} />;
    case 'cashFlow':
      return <Visuals.CashFlowChart {...visual.data} />;
    case 'assetAllocation':
      return <Visuals.AssetAllocationChart {...visual.data} />;
    case 'incomeExpense':
      return <Visuals.IncomeExpenseChart {...visual.data} />;
    case 'runwayVisualization':
      return <Visuals.RunwayVisualization {...visual.data} />;
    case 'financialHealth':
      return <Visuals.FinancialHealthChart {...visual.data} />;
    case 'realizedVsUnrealized':
      return <Visuals.RealizedVsUnrealized data={visual.data} />;
    case 'holdingPeriodGauge':
      return <Visuals.HoldingPeriodGauge data={visual.data} />;
    case 'fundingSourceComparison':
      return <Visuals.FundingSourceComparison data={visual.data} />;
    case 'taxDragIndicators':
      return <Visuals.TaxDragIndicators data={visual.data} />;
    case 'netOfTaxDecisionDelta':
      return <Visuals.NetOfTaxDecisionDelta data={visual.data} />;
    default:
      return null;
  }
}
