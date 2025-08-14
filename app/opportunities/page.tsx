"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Star, BarChart3, ArrowUpRight } from "lucide-react"
import Navigation from "@/components/navigation"

export default function Opportunities() {
  const [followedWallets, setFollowedWallets] = useState(new Set())

  const topWallets = [
    {
      wallet: "sei1whale...abc",
      pnl: "+245.7%",
      sharpe: "2.34",
      volume: "$1.2M",
      trades: 156,
      winRate: "78%",
    },
    {
      wallet: "sei1alpha...def",
      pnl: "+189.3%",
      sharpe: "1.98",
      volume: "$890K",
      trades: 203,
      winRate: "72%",
    },
    {
      wallet: "sei1smart...ghi",
      pnl: "+167.8%",
      sharpe: "2.12",
      volume: "$2.1M",
      trades: 89,
      winRate: "85%",
    },
    {
      wallet: "sei1trader...jkl",
      pnl: "+134.5%",
      sharpe: "1.76",
      volume: "$650K",
      trades: 234,
      winRate: "69%",
    },
  ]

  const handleMirrorTrade = (wallet) => {
    setFollowedWallets((prev) => new Set([...prev, wallet]))
  }

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC]">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#22D3EE] mb-2">Trading Opportunities</h1>
            <p className="text-gray-400">Discover and follow top-performing wallets</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Wallets Leaderboard */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Star className="w-5 h-5 mr-2" />
                    Top Performing Wallets
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
                              <span className="font-mono text-[#22D3EE]">{wallet.wallet}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-green-500 font-semibold">{wallet.pnl}</span>
                          </TableCell>
                          <TableCell className="font-semibold">{wallet.sharpe}</TableCell>
                          <TableCell className="font-semibold">{wallet.volume}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${Number.parseFloat(wallet.winRate) > 75 ? "border-green-500 text-green-500" : ""}
                                ${Number.parseFloat(wallet.winRate) > 65 && Number.parseFloat(wallet.winRate) <= 75 ? "border-yellow-500 text-yellow-500" : ""}
                                ${Number.parseFloat(wallet.winRate) <= 65 ? "border-red-500 text-red-500" : ""}
                              `}
                            >
                              {wallet.winRate}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleMirrorTrade(wallet.wallet)}
                              disabled={followedWallets.has(wallet.wallet)}
                              className={`
                                ${
                                  followedWallets.has(wallet.wallet)
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-[#22D3EE] hover:bg-[#22D3EE]/90"
                                } text-[#0C101A]
                              `}
                            >
                              {followedWallets.has(wallet.wallet) ? (
                                <>
                                  <Star className="w-4 h-4 mr-1" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-1" />
                                  Mirror Trade
                                </>
                              )}
                            </Button>
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
                  <Button className="w-full bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </CardContent>
              </Card>

              {/* Cross-Chain Insights */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Cross-Chain Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sei Network</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-[#0C101A] rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-[#22D3EE]"></div>
                        </div>
                        <span className="text-sm font-semibold">$2.1M</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ethereum</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-[#0C101A] rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-semibold">$1.6M</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cosmos</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-[#0C101A] rounded-full overflow-hidden">
                          <div className="w-2/5 h-full bg-purple-500"></div>
                        </div>
                        <span className="text-sm font-semibold">$890K</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-4 bg-yellow-500/20 text-yellow-500">
                    Coming Soon: Multi-chain support
                  </Badge>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
