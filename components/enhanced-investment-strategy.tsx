"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, Users, Coins, DollarSign, Brain, Zap, Shield } from "lucide-react"

export default function EnhancedInvestmentStrategy() {
  const portfolioComposition = [
    {
      token: "SEI",
      percentage: 60,
      amount: "508.3K SEI",
      value: "$430,284",
      change24h: "+5.2%",
      allocation: "Core Holding",
    },
    {
      token: "USDC",
      percentage: 25,
      amount: "212.0K USDC",
      value: "$212,000",
      change24h: "0%",
      allocation: "Stable Reserve",
    },
    {
      token: "ATOM",
      percentage: 10,
      amount: "8.5K ATOM",
      value: "$45,000",
      change24h: "+3.1%",
      allocation: "Cosmos Exposure",
    },
    {
      token: "Other Tokens",
      percentage: 5,
      amount: "Various",
      value: "$30,000",
      change24h: "+12.8%",
      allocation: "Speculative",
    },
  ]

  const defiPositions = [
    {
      protocol: "Astroport LP",
      amount: "45K SEI",
      apy: "12.5%",
      status: "Active",
      pnl: "+$2,340",
      risk: "Low",
    },
    {
      protocol: "Levana Perps",
      amount: "23K SEI",
      pnl: "+8.2%",
      status: "Open",
      value: "+$1,886",
      risk: "High",
    },
    {
      protocol: "White Whale Staking",
      amount: "78K SEI",
      apy: "15.8%",
      status: "Active",
      pnl: "+$4,567",
      risk: "Low",
    },
    {
      protocol: "Kujira BOW",
      amount: "12K SEI",
      apy: "9.3%",
      status: "Active",
      pnl: "+$892",
      risk: "Medium",
    },
  ]

  const tradingBehavior = {
    pattern: "Dollar Cost Averaging",
    frequency: "Daily small purchases",
    riskTolerance: "Moderate",
    avgHoldPeriod: "45 days",
    winRate: "72%",
    sharpeRatio: "1.84",
    maxDrawdown: "-12.3%",
    totalPnL: "+$47,892",
  }

  const smartMoneySignals = [
    {
      signal: "Whale Accumulation Pattern",
      confidence: 94,
      description: "Following top 10 whale wallets accumulation strategy",
      status: "Active",
    },
    {
      signal: "DeFi Yield Optimization",
      confidence: 87,
      description: "Mirrors highest APY farming strategies",
      status: "Active",
    },
    {
      signal: "Early Protocol Adoption",
      confidence: 76,
      description: "Quick to adopt new high-potential protocols",
      status: "Monitoring",
    },
  ]

  const riskProfile = {
    overall: "Moderate",
    score: 6.8,
    factors: [
      { name: "Diversification", score: 8.2, status: "Good" },
      { name: "Volatility Tolerance", score: 6.5, status: "Moderate" },
      { name: "Liquidity Management", score: 7.8, status: "Good" },
      { name: "Protocol Risk", score: 5.9, status: "Moderate" },
    ],
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <CardTitle className="flex items-center text-[#22D3EE] text-xl">
          <Target className="w-6 h-6 mr-3" />
          Investment Strategy Intelligence
          <Badge variant="outline" className="ml-3 border-purple-500 text-purple-500">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#0C101A] h-12">
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="defi"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              DeFi Positions
            </TabsTrigger>
            <TabsTrigger
              value="behavior"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              Trading Behavior
            </TabsTrigger>
            <TabsTrigger
              value="signals"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              Smart Signals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6 space-y-6">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Composition */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Coins className="w-5 h-5 mr-2 text-[#22D3EE]" />
                  Asset Allocation
                </h3>
                <div className="space-y-4">
                  {portfolioComposition.map((asset, index) => (
                    <div key={index} className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#22D3EE] rounded-full flex items-center justify-center text-[#0C101A] font-bold">
                            {asset.token.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-lg">{asset.token}</span>
                            <div className="text-sm text-gray-400">{asset.allocation}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#22D3EE]">{asset.percentage}%</span>
                          <Badge
                            variant="outline"
                            className={`ml-2 ${
                              asset.change24h.startsWith("+")
                                ? "border-green-500 text-green-500"
                                : asset.change24h === "0%"
                                  ? "border-gray-500 text-gray-500"
                                  : "border-red-500 text-red-500"
                            }`}
                          >
                            {asset.change24h}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>{asset.amount}</span>
                        <span className="font-semibold text-[#F7FAFC]">{asset.value}</span>
                      </div>
                      <Progress value={asset.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#22D3EE]" />
                  Risk Assessment
                </h3>
                <div className="p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#22D3EE] mb-2">{riskProfile.score}/10</div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-lg px-4 py-1">
                      {riskProfile.overall} Risk
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {riskProfile.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{factor.name}</span>
                        <div className="flex items-center space-x-3">
                          <Progress value={factor.score * 10} className="w-20 h-2" />
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              factor.status === "Good"
                                ? "border-green-500 text-green-500"
                                : factor.status === "Moderate"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-red-500 text-red-500"
                            }`}
                          >
                            {factor.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-[#22D3EE]" />
                Active DeFi Positions
              </h3>
              <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE] text-lg px-4 py-1">
                Total Value: $717K
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defiPositions.map((position, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#0C101A] rounded-xl border border-[#2D3748] hover:border-[#22D3EE] transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{position.protocol}</h4>
                      <div className="text-sm text-gray-400">{position.amount}</div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={`mb-2 ${
                          position.status === "Active"
                            ? "border-green-500 text-green-500"
                            : position.status === "Open"
                              ? "border-blue-500 text-blue-500"
                              : "border-yellow-500 text-yellow-500"
                        }`}
                      >
                        {position.status}
                      </Badge>
                      <div className="text-sm">
                        <Badge
                          variant="outline"
                          className={`${
                            position.risk === "Low"
                              ? "border-green-500 text-green-500"
                              : position.risk === "Medium"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-red-500 text-red-500"
                          }`}
                        >
                          {position.risk} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {position.apy && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">APY</span>
                        <span className="font-semibold text-green-500">{position.apy}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">P&L</span>
                      <span className="font-semibold text-green-500">{position.pnl}</span>
                    </div>
                    {position.value && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Value</span>
                        <span className="font-semibold text-[#22D3EE]">{position.value}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trading Statistics */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#22D3EE]" />
                  Trading Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Total P&L</div>
                    <div className="text-2xl font-bold text-green-500">{tradingBehavior.totalPnL}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Win Rate</div>
                    <div className="text-2xl font-bold text-[#22D3EE]">{tradingBehavior.winRate}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Sharpe Ratio</div>
                    <div className="text-2xl font-bold text-[#22D3EE]">{tradingBehavior.sharpeRatio}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Max Drawdown</div>
                    <div className="text-2xl font-bold text-red-500">{tradingBehavior.maxDrawdown}</div>
                  </div>
                </div>
              </div>

              {/* Behavior Analysis */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-[#22D3EE]" />
                  Behavior Profile
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Strategy Pattern</div>
                    <div className="font-bold text-lg text-[#22D3EE]">{tradingBehavior.pattern}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Trading Frequency</div>
                    <div className="font-semibold text-[#F7FAFC]">{tradingBehavior.frequency}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Average Hold Period</div>
                    <div className="font-semibold text-[#22D3EE]">{tradingBehavior.avgHoldPeriod}</div>
                  </div>
                  <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                    <div className="text-sm text-gray-400">Risk Tolerance</div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-lg px-4 py-1">
                      {tradingBehavior.riskTolerance}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signals" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#22D3EE]" />
                Smart Money Signals
              </h3>
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                AI Analysis
              </Badge>
            </div>

            <div className="space-y-4">
              {smartMoneySignals.map((signal, index) => (
                <div key={index} className="p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#22D3EE] mb-2">{signal.signal}</h4>
                      <p className="text-gray-300 mb-3">{signal.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-[#22D3EE]">{signal.confidence}%</div>
                      <div className="text-sm text-gray-400">confidence</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress value={signal.confidence} className="flex-1 mr-4 h-3" />
                    <Badge
                      variant="outline"
                      className={`${
                        signal.status === "Active"
                          ? "border-green-500 text-green-500"
                          : signal.status === "Monitoring"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-gray-500 text-gray-500"
                      }`}
                    >
                      {signal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Recommendations */}
            <div className="mt-8 p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-[#22D3EE]" />
                <h4 className="text-lg font-bold">AI Recommendations</h4>
                <Badge variant="outline" className="border-purple-500 text-purple-500">
                  Personalized
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-[#1A202C] rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">
                    Consider increasing DeFi allocation by 10-15% based on current market conditions
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#1A202C] rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">
                    Monitor NEBULA position - AI predicts potential exit opportunity in 5-7 days
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#1A202C] rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    Strong holder profile detected - consider long-term staking strategies
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
