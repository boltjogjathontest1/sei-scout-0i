"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Star, BarChart3, ArrowUpRight, ExternalLink, Loader2, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"
import { seitraceAddr } from "@/lib/sei-config"
import { MirrorTradingModal } from "@/components/mirror-trading-modal"

interface TopWallet {
  address: string
  label: string
  pnl: {
    absolute: number
    percentage: number
    period: string
  }
  sharpeRatio: number
  volume: number
  winRate: number
  trades: number
  avgTradeSize: number
  topTokens: string[]
  riskScore: number
  evidence: {
    profitableTrades: string[]
    totalSwaps: number
  }
  mirrorTradeUrl?: string
  confidence?: number
  estimatedGas?: string
  slippage?: string
}

export default function Opportunities() {
  const [followedWallets, setFollowedWallets] = useState(new Set())
  const [topWallets, setTopWallets] = useState<TopWallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities/top?limit=10")
        if (response.ok) {
          const data = await response.json()
          setTopWallets(data.topWallets)
        }
      } catch (error) {
        console.error("Failed to fetch opportunities:", error)
        // Fallback to static data
        setTopWallets([
          {
            address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
            label: "DeFi Whale",
            pnl: { absolute: 245700, percentage: 245.7, period: "24h" },
            sharpeRatio: 2.34,
            volume: 1200000,
            winRate: 78,
            trades: 156,
            avgTradeSize: 15000,
            topTokens: ["SEI", "USDC", "WETH"],
            riskScore: 3.2,
            evidence: { profitableTrades: [], totalSwaps: 0 },
            confidence: 94,
            estimatedGas: "0.001 SEI",
            slippage: "0.5%",
          },
          {
            address: "0x8ba1f109551bD432803012645Hac136c22C177e9",
            label: "Active Trader",
            pnl: { absolute: 189300, percentage: 189.3, period: "24h" },
            sharpeRatio: 1.98,
            volume: 890000,
            winRate: 72,
            trades: 203,
            avgTradeSize: 8070,
            topTokens: ["SEI", "USDC", "ATOM"],
            riskScore: 4.1,
            evidence: { profitableTrades: [], totalSwaps: 0 },
            confidence: 87,
            estimatedGas: "0.001 SEI",
            slippage: "0.5%",
          },
          {
            address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
            label: "DeFi Power User",
            pnl: { absolute: 167800, percentage: 167.8, period: "24h" },
            sharpeRatio: 2.12,
            volume: 2100000,
            winRate: 85,
            trades: 89,
            avgTradeSize: 8254,
            topTokens: ["SEI", "USDC", "OSMO"],
            riskScore: 3.8,
            evidence: { profitableTrades: [], totalSwaps: 0 },
            confidence: 91,
            estimatedGas: "0.001 SEI",
            slippage: "0.3%",
          },
          {
            address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
            label: "Yield Farmer",
            pnl: { absolute: 134500, percentage: 134.5, period: "24h" },
            sharpeRatio: 1.76,
            volume: 650000,
            winRate: 69,
            trades: 234,
            avgTradeSize: 2777,
            topTokens: ["SEI", "USDC", "ATOM"],
            riskScore: 4.5,
            evidence: { profitableTrades: [], totalSwaps: 0 },
            confidence: 78,
            estimatedGas: "0.002 SEI",
            slippage: "0.8%",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const handleFollowWallet = (wallet: TopWallet) => {
    setFollowedWallets((prev) => new Set([...prev, wallet.address]))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C101A] flex items-center justify-center">
        <div className="flex items-center text-[#22D3EE]">
          <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          Loading opportunities...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC]">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#22D3EE] mb-2">Trading Opportunities</h1>
            <p className="text-gray-400">Discover and mirror top-performing wallets on Sei Network</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Wallets Leaderboard */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Star className="w-5 h-5 mr-2" />
                    Top Performing Wallets
                    <Badge variant="outline" className="ml-3 border-green-500 text-green-500">
                      Live Data
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2D3748]">
                        <TableHead className="text-gray-400">Wallet</TableHead>
                        <TableHead className="text-gray-400">PNL</TableHead>
                        <TableHead className="text-gray-400">Sharpe</TableHead>
                        <TableHead className="text-gray-400">Volume</TableHead>
                        <TableHead className="text-gray-400">Win Rate</TableHead>
                        <TableHead className="text-gray-400">Explorer</TableHead>
                        <TableHead className="text-gray-400">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topWallets.map((wallet, index) => (
                        <TableRow key={index} className="border-[#2D3748] hover:bg-[#0C101A]">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-[#22D3EE] rounded-full flex items-center justify-center text-[#0C101A] font-bold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-mono text-[#22D3EE]">
                                  {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                                </div>
                                <div className="text-xs text-gray-400">{wallet.label}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-green-500 font-semibold">+{wallet.pnl.percentage.toFixed(1)}%</span>
                            <div className="text-xs text-gray-400">${wallet.pnl.absolute.toLocaleString()}</div>
                          </TableCell>
                          <TableCell className="font-semibold">{wallet.sharpeRatio.toFixed(2)}</TableCell>
                          <TableCell className="font-semibold">${(wallet.volume / 1000).toFixed(0)}K</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${wallet.winRate > 75 ? "border-green-500 text-green-500" : ""}
                                ${wallet.winRate > 65 && wallet.winRate <= 75 ? "border-yellow-500 text-yellow-500" : ""}
                                ${wallet.winRate <= 65 ? "border-red-500 text-red-500" : ""}
                              `}
                            >
                              {wallet.winRate}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                              onClick={() => window.open(seitraceAddr(wallet.address), "_blank")}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {followedWallets.has(wallet.address) ? (
                                <Button size="sm" disabled className="bg-green-500 hover:bg-green-600 text-[#0C101A]">
                                  <Star className="w-4 h-4 mr-1" />
                                  Following
                                </Button>
                              ) : (
                                <MirrorTradingModal wallet={wallet}>
                                  <Button
                                    size="sm"
                                    className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]"
                                    onClick={() => handleFollowWallet(wallet)}
                                  >
                                    <Copy className="w-4 h-4 mr-1" />
                                    Mirror Trade
                                  </Button>
                                </MirrorTradingModal>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Portfolio Stats */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="text-[#22D3EE]">Your Mirror Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Following</span>
                    <span className="font-semibold text-[#22D3EE]">{followedWallets.size} wallets</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Est. PNL</span>
                    <span className="font-semibold text-green-500">+12.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Trades</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Value</span>
                    <span className="font-semibold text-[#22D3EE]">$24,567</span>
                  </div>
                  <Button className="w-full bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </CardContent>
              </Card>

              {/* DEX Integration */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    DEX Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#0C101A] rounded-lg">
                      <div>
                        <div className="font-semibold">DragonSwap</div>
                        <div className="text-xs text-gray-400">Primary DEX for mirror trades</div>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#0C101A] rounded-lg">
                      <div>
                        <div className="font-semibold">Astroport</div>
                        <div className="text-xs text-gray-400">Advanced trading features</div>
                      </div>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]"
                    onClick={() => window.open("https://dragonswap.app", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open DragonSwap
                  </Button>
                </CardContent>
              </Card>

              {/* Mirror Trading Stats */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Mirror Trading Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-[#0C101A] rounded-lg">
                      <div className="text-2xl font-bold text-[#22D3EE]">156</div>
                      <div className="text-xs text-gray-400">Total Mirrors</div>
                    </div>
                    <div className="text-center p-3 bg-[#0C101A] rounded-lg">
                      <div className="text-2xl font-bold text-green-500">78%</div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-[#0C101A] rounded-lg">
                      <div className="text-2xl font-bold text-[#22D3EE]">0.8s</div>
                      <div className="text-xs text-gray-400">Avg Latency</div>
                    </div>
                    <div className="text-center p-3 bg-[#0C101A] rounded-lg">
                      <div className="text-2xl font-bold text-green-500">+23%</div>
                      <div className="text-xs text-gray-400">Avg Return</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Insights */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="text-[#22D3EE]">Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold">Bullish Signal</span>
                    </div>
                    <p className="text-xs text-gray-400">Large accumulation detected in top 10 wallets</p>
                  </div>
                  <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-semibold">Volume Spike</span>
                    </div>
                    <p className="text-xs text-gray-400">24h volume increased by 340%</p>
                  </div>
                  <div className="p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-semibold">Mirror Trend</span>
                    </div>
                    <p className="text-xs text-gray-400">DeFi strategies showing 85% success rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
