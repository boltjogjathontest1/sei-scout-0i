"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Shield,
  Network,
  AlertCircle,
  Brain,
  Target,
  Users,
  Activity,
  ExternalLink,
  Loader2,
} from "lucide-react"
import Navigation from "@/components/navigation"
import { seitraceAddr, seitraceTx } from "@/lib/sei-config"

interface WalletAnalysis {
  address: string
  behaviorScore: string
  riskAssessment: {
    overall: string
    identity: string
    contract: string
    liquidity: string
    behavior: string
  }
  predictiveInsights: Array<{
    prediction: string
    confidence: number
    evidence: string[]
    reasoning: string
  }>
  evidence: {
    recentTransactions: Array<{
      hash: string
      block: string
      type: string
    }>
  }
}

export default function Analysis() {
  const [selectedWallet, setSelectedWallet] = useState("0x742d35Cc6634C0532925a3b8D4C9db96590c6C87")
  const [analysisData, setAnalysisData] = useState<WalletAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const behaviorMatrix = {
    transactionPatterns: "Regular, predictable",
    riskBehavior: "Conservative with occasional high-risk",
    networkUsage: "Heavy DeFi participant",
    socialSignals: "Follows smart money movements",
  }

  const transactionPatterns = [
    {
      time: "2024-01-15 14:30",
      wallet: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
      pattern: "DCA",
      confidence: "95%",
    },
    {
      time: "2024-01-15 14:25",
      wallet: "0x8ba1f109551bD432803012645Hac136c22C177e9",
      pattern: "Whale",
      confidence: "87%",
    },
    {
      time: "2024-01-15 14:20",
      wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      pattern: "MEV",
      confidence: "92%",
    },
    {
      time: "2024-01-15 14:15",
      wallet: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      pattern: "DCA",
      confidence: "78%",
    },
  ]

  const riskMetrics = [
    { label: "Identity Risk", value: 25, color: "bg-green-500" },
    { label: "Contract Risk", value: 60, color: "bg-yellow-500" },
    { label: "Liquidity Risk", value: 80, color: "bg-red-500" },
    { label: "Behavior Risk", value: 40, color: "bg-yellow-500" },
  ]

  const loadNetworkData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/wallet/${selectedWallet}/analysis`)
      if (response.ok) {
        const data = await response.json()
        setAnalysisData(data)
      }
    } catch (error) {
      console.error("Failed to load network data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNetworkData()
  }, [selectedWallet])

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC]">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Dashboard &gt; Analysis &gt; {selectedWallet.slice(0, 8)}...{selectedWallet.slice(-6)}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#22D3EE] mb-2">Advanced Wallet Analysis</h1>
                <p className="text-gray-400">Deep behavioral insights and predictive analytics</p>
              </div>
              <Button
                variant="outline"
                className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 bg-transparent"
                onClick={() => window.open(seitraceAddr(selectedWallet), "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Seitrace
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Analysis Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Behavior Matrix */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Brain className="w-5 h-5 mr-2" />
                    Behavioral Matrix Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(behaviorMatrix).map(([key, value], index) => (
                      <div key={index} className="p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                        <div className="text-sm text-gray-400 mb-1">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </div>
                        <div className="font-semibold text-[#F7FAFC]">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Graph */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Network className="w-5 h-5 mr-2" />
                    Network Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-[#0C101A] rounded-lg border-2 border-dashed border-[#2D3748] flex items-center justify-center">
                    <div className="text-center">
                      <Network className="w-16 h-16 text-[#22D3EE] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Interactive Network Graph</h3>
                      <p className="text-gray-400 mb-4">Wallet connections and transaction flows</p>
                      <div className="space-y-2">
                        <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE] mr-2">
                          Wallet Connections
                        </Badge>
                        <Badge variant="outline" className="border-purple-500 text-purple-500 mr-2">
                          Transaction Flow
                        </Badge>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Cluster Analysis
                        </Badge>
                      </div>
                      <Button
                        className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A] mt-4"
                        onClick={loadNetworkData}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load Network Data"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Insights */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Target className="w-5 h-5 mr-2" />
                    Predictive Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData?.predictiveInsights?.length > 0
                      ? analysisData.predictiveInsights.map((insight, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]"
                          >
                            <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300 mb-2">{insight.prediction}</p>
                              <div className="flex items-center space-x-2 mb-2">
                                <Progress value={insight.confidence} className="w-20 h-2" />
                                <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE] text-xs">
                                  {insight.confidence}% confidence
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-400 mb-2">{insight.reasoning}</div>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs text-gray-500">Evidence:</span>
                                {insight.evidence.slice(0, 3).map((txHash, i) => (
                                  <Button
                                    key={i}
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 px-1 text-xs text-[#22D3EE] hover:bg-[#22D3EE]/20"
                                    onClick={() => window.open(seitraceTx(txHash), "_blank")}
                                  >
                                    {txHash.slice(0, 6)}...
                                    <ExternalLink className="w-2 h-2 ml-1" />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                      : // Fallback to static data
                        [
                          "Likely to increase DeFi allocation by 15%",
                          "May exit NEBULA position within 7 days",
                          "Strong holder profile (avg hold: 45 days)",
                          "High probability of staking rewards claim",
                        ].map((insight, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]"
                          >
                            <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm text-gray-300">{insight}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Progress value={Math.floor(Math.random() * 40) + 60} className="w-20 h-2" />
                                <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE] text-xs">
                                  {Math.floor(Math.random() * 40) + 60}% confidence
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Transaction Patterns */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactionPatterns.slice(0, 3).map((pattern, index) => (
                      <div key={index} className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              pattern.pattern === "DCA"
                                ? "border-green-500 text-green-500"
                                : pattern.pattern === "Whale"
                                  ? "border-blue-500 text-blue-500"
                                  : "border-red-500 text-red-500"
                            }`}
                          >
                            {pattern.pattern}
                          </Badge>
                          <span className="text-xs text-[#22D3EE]">{pattern.confidence}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-400 font-mono">
                            {pattern.wallet.slice(0, 8)}...{pattern.wallet.slice(-6)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 px-1 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                            onClick={() => window.open(seitraceAddr(pattern.wallet), "_blank")}
                          >
                            <ExternalLink className="w-2 h-2" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">{pattern.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Shield className="w-5 h-5 mr-2" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {analysisData?.riskAssessment
                      ? [
                          {
                            label: "Identity Risk",
                            value: Math.round(Number(analysisData.riskAssessment.identity)),
                            color: "bg-green-500",
                          },
                          {
                            label: "Contract Risk",
                            value: Math.round(Number(analysisData.riskAssessment.contract)),
                            color: "bg-yellow-500",
                          },
                          {
                            label: "Liquidity Risk",
                            value: Math.round(Number(analysisData.riskAssessment.liquidity)),
                            color: "bg-red-500",
                          },
                          {
                            label: "Behavior Risk",
                            value: Math.round(Number(analysisData.riskAssessment.behavior)),
                            color: "bg-yellow-500",
                          },
                        ].map((metric, index) => (
                          <div key={index} className="text-center">
                            <div
                              className={`w-12 h-12 rounded-full ${metric.color} mx-auto mb-2 flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-sm">{metric.value}</span>
                            </div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </div>
                        ))
                      : riskMetrics.map((metric, index) => (
                          <div key={index} className="text-center">
                            <div
                              className={`w-12 h-12 rounded-full ${metric.color} mx-auto mb-2 flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-sm">{metric.value}</span>
                            </div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </div>
                        ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="text-[#22D3EE]">Analysis Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Compare Wallets
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Set Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Analysis Accordion */}
          <div className="mt-8">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="patterns" className="border border-[#2D3748] rounded-lg bg-[#1A202C]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-[#22D3EE]" />
                    <span className="text-lg font-semibold">Transaction Pattern Analysis</span>
                    <Badge variant="secondary" className="bg-[#22D3EE]/20 text-[#22D3EE]">
                      Live Data
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2D3748]">
                        <TableHead className="text-gray-400">Time</TableHead>
                        <TableHead className="text-gray-400">Wallet</TableHead>
                        <TableHead className="text-gray-400">Pattern</TableHead>
                        <TableHead className="text-gray-400">Confidence</TableHead>
                        <TableHead className="text-gray-400">Explorer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionPatterns.map((pattern, index) => (
                        <TableRow key={index} className="border-[#2D3748] hover:bg-[#0C101A]">
                          <TableCell className="font-mono text-sm">{pattern.time}</TableCell>
                          <TableCell className="font-mono text-[#22D3EE]">
                            {pattern.wallet.slice(0, 8)}...{pattern.wallet.slice(-6)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${pattern.pattern === "DCA" ? "border-green-500 text-green-500" : ""}
                                ${pattern.pattern === "Whale" ? "border-blue-500 text-blue-500" : ""}
                                ${pattern.pattern === "MEV" ? "border-red-500 text-red-500" : ""}
                              `}
                            >
                              {pattern.pattern}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[#22D3EE] font-semibold">{pattern.confidence}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                              onClick={() => window.open(seitraceAddr(pattern.wallet), "_blank")}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
