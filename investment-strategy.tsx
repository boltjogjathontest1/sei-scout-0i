"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Users, Coins, DollarSign } from "lucide-react"

export default function InvestmentStrategy() {
  const portfolioComposition = [
    { token: "SEI", percentage: 60, amount: "508.3K SEI", value: "$430,284" },
    { token: "USDC", percentage: 25, amount: "212.0K USDC", value: "$212,000" },
    { token: "Other Tokens", percentage: 15, amount: "Various", value: "$75,000" },
  ]

  const defiPositions = [
    { protocol: "Astroport LP", amount: "45K SEI", apy: "12.5%", status: "Active" },
    { protocol: "Levana Perps", amount: "23K SEI", pnl: "+8.2%", status: "Open" },
    { protocol: "White Whale Staking", amount: "78K SEI", apy: "15.8%", status: "Active" },
    { protocol: "Kujira BOW", amount: "12K SEI", apy: "9.3%", status: "Active" },
  ]

  const tradingBehavior = {
    pattern: "Dollar Cost Averaging",
    frequency: "Daily small purchases",
    riskTolerance: "Moderate",
    avgHoldPeriod: "45 days",
    winRate: "72%",
    sharpeRatio: "1.84",
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <CardTitle className="flex items-center text-[#22D3EE]">
          <Target className="w-5 h-5 mr-2" />
          Investment Strategy Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Composition */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Coins className="w-5 h-5 mr-2 text-[#22D3EE]" />
            Portfolio Composition
          </h3>
          <div className="space-y-3">
            {portfolioComposition.map((asset, index) => (
              <div key={index} className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{asset.token}</span>
                  <span className="text-[#22D3EE] font-bold">{asset.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>{asset.amount}</span>
                  <span>{asset.value}</span>
                </div>
                <Progress value={asset.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* DeFi Positions */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-[#22D3EE]" />
            Active DeFi Positions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defiPositions.map((position, index) => (
              <div key={index} className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{position.protocol}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      position.status === "Active" ? "border-green-500 text-green-500" : "border-blue-500 text-blue-500"
                    }`}
                  >
                    {position.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-400 mb-1">{position.amount}</div>
                <div className="text-sm text-[#22D3EE] font-semibold">{position.apy || position.pnl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Behavior */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#22D3EE]" />
            Trading Behavior Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Pattern</div>
                <div className="font-semibold text-[#22D3EE]">{tradingBehavior.pattern}</div>
              </div>
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Frequency</div>
                <div className="font-semibold">{tradingBehavior.frequency}</div>
              </div>
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Risk Tolerance</div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                  {tradingBehavior.riskTolerance}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Avg Hold Period</div>
                <div className="font-semibold text-[#22D3EE]">{tradingBehavior.avgHoldPeriod}</div>
              </div>
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="font-semibold text-green-500">{tradingBehavior.winRate}</div>
              </div>
              <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                <div className="text-sm text-gray-400">Sharpe Ratio</div>
                <div className="font-semibold text-[#22D3EE]">{tradingBehavior.sharpeRatio}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Money Signals */}
        <div className="p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-[#22D3EE]" />
            <span className="font-semibold">Smart Money Signals</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Following whale accumulation patterns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Mirrors top DeFi strategies</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Early adopter of new protocols</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
