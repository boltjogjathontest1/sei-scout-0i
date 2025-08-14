"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Activity, DollarSign, Zap, Wallet, ExternalLink, TrendingUp, Shield } from "lucide-react"

export default function EnhancedSeiIntegration() {
  const [networkData, setNetworkData] = useState({
    seiPrice: 0.847,
    priceChange24h: 5.2,
    blockHeight: 4567890,
    tps: 1247,
    validators: 125,
    stakingApr: 15.8,
    totalStaked: 68.5,
    networkHealth: 98.7,
  })

  const defiProtocols = [
    {
      name: "Astroport DEX",
      tvl: "$45.2M",
      change24h: "+12.5%",
      status: "Active",
      category: "DEX",
      userPositions: "3 LP Positions",
    },
    {
      name: "White Whale",
      tvl: "$23.8M",
      change24h: "+8.3%",
      status: "Active",
      category: "Lending",
      userPositions: "Staking Active",
    },
    {
      name: "Levana Protocol",
      tvl: "$18.5M",
      change24h: "-2.1%",
      status: "Active",
      category: "Perps",
      userPositions: "2 Open Positions",
    },
    {
      name: "Kujira",
      tvl: "$12.3M",
      change24h: "+15.7%",
      status: "Active",
      category: "DeFi Suite",
      userPositions: "BOW Staking",
    },
  ]

  const walletOptions = [
    { name: "Compass", status: "Connected", icon: "🧭", users: "45K+" },
    { name: "Keplr", status: "Available", icon: "🔑", users: "120K+" },
    { name: "Leap", status: "Available", icon: "🦘", users: "30K+" },
  ]

  const seiMetrics = [
    { label: "Market Cap", value: "$2.1B", change: "+5.2%" },
    { label: "24h Volume", value: "$89.5M", change: "+23.1%" },
    { label: "Circulating Supply", value: "2.8B SEI", change: "0%" },
    { label: "Total Supply", value: "10B SEI", change: "0%" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkData((prev) => ({
        ...prev,
        seiPrice: prev.seiPrice + (Math.random() - 0.5) * 0.02,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        tps: Math.max(800, prev.tps + Math.floor(Math.random() * 200) - 100),
        networkHealth: Math.min(100, Math.max(95, prev.networkHealth + (Math.random() - 0.5) * 2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <CardTitle className="flex items-center text-[#22D3EE] text-xl">
          <Network className="w-6 h-6 mr-3" />
          Sei Network Integration
          <Badge variant="outline" className="ml-3 border-green-500 text-green-500 animate-pulse">
            Live Data
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="network" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#0C101A] h-12">
            <TabsTrigger
              value="network"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              Network
            </TabsTrigger>
            <TabsTrigger
              value="defi"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              DeFi Ecosystem
            </TabsTrigger>
            <TabsTrigger
              value="wallets"
              className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A] font-semibold"
            >
              Wallets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="mt-6 space-y-6">
            {/* SEI Price & Network Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-[#22D3EE]" />
                    <span className="text-sm text-gray-400">SEI Price</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${networkData.priceChange24h > 0 ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}
                  >
                    {networkData.priceChange24h > 0 ? "+" : ""}
                    {networkData.priceChange24h.toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-[#22D3EE]">${networkData.seiPrice.toFixed(3)}</div>
              </div>

              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-sm text-gray-400">Network Health</span>
                </div>
                <div className="text-3xl font-bold text-green-500">{networkData.networkHealth.toFixed(1)}%</div>
              </div>
            </div>

            {/* Network Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-sm text-gray-400">Block Height</span>
                </div>
                <div className="text-2xl font-bold text-[#22D3EE]">{networkData.blockHeight.toLocaleString()}</div>
              </div>

              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-sm text-gray-400">TPS</span>
                </div>
                <div className="text-2xl font-bold text-[#22D3EE]">{networkData.tps.toLocaleString()}</div>
              </div>

              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center space-x-2 mb-2">
                  <Network className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-sm text-gray-400">Validators</span>
                </div>
                <div className="text-2xl font-bold text-[#22D3EE]">{networkData.validators}</div>
              </div>

              <div className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-sm text-gray-400">Staking APR</span>
                </div>
                <div className="text-2xl font-bold text-green-500">{networkData.stakingApr}%</div>
              </div>
            </div>

            {/* SEI Token Metrics */}
            <div className="p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-[#22D3EE]" />
                SEI Token Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {seiMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                    <div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      <div className="text-lg font-bold text-[#F7FAFC]">{metric.value}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        metric.change.startsWith("+")
                          ? "border-green-500 text-green-500"
                          : metric.change === "0%"
                            ? "border-gray-500 text-gray-500"
                            : "border-red-500 text-red-500"
                      }`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Staking Information */}
            <div className="p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Staking Overview</h4>
                <Badge variant="outline" className="border-green-500 text-green-500 text-lg px-4 py-1">
                  {networkData.stakingApr}% APR
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Staked</span>
                  <span className="text-[#22D3EE] font-semibold">{networkData.totalStaked}%</span>
                </div>
                <Progress value={networkData.totalStaked} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#22D3EE]">1.9B</div>
                    <div className="text-xs text-gray-400">SEI Staked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#22D3EE]">125</div>
                    <div className="text-xs text-gray-400">Validators</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">21d</div>
                    <div className="text-xs text-gray-400">Unbonding</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="mt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">Sei DeFi Ecosystem</h4>
              <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
                Total TVL: $99.8M
              </Badge>
            </div>

            {defiProtocols.map((protocol, index) => (
              <div
                key={index}
                className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748] hover:border-[#22D3EE] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#22D3EE] rounded-full flex items-center justify-center text-[#0C101A] font-bold">
                      {protocol.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{protocol.name}</div>
                      <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                        {protocol.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#22D3EE]">{protocol.tvl}</div>
                    <Badge
                      variant="outline"
                      className={`${protocol.change24h.startsWith("+") ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}
                    >
                      {protocol.change24h}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      {protocol.status}
                    </Badge>
                    <span className="text-sm text-gray-400">{protocol.userPositions}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#22D3EE] hover:bg-[#22D3EE]/10">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="wallets" className="mt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-[#22D3EE]" />
                Wallet Integration
              </h4>
              <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
                Multi-wallet Support
              </Badge>
            </div>

            {walletOptions.map((wallet, index) => (
              <div
                key={index}
                className="p-4 bg-[#0C101A] rounded-xl border border-[#2D3748] hover:border-[#22D3EE] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{wallet.icon}</div>
                    <div>
                      <div className="font-bold text-lg">{wallet.name}</div>
                      <div className="text-sm text-gray-400">{wallet.users} users</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="outline"
                      className={`${wallet.status === "Connected" ? "border-green-500 text-green-500" : "border-blue-500 text-blue-500"}`}
                    >
                      {wallet.status}
                    </Badge>
                    <Button
                      className={`${wallet.status === "Connected" ? "bg-green-500 hover:bg-green-600" : "bg-[#22D3EE] hover:bg-[#22D3EE]/90"} text-[#0C101A]`}
                    >
                      {wallet.status === "Connected" ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Block Explorer Integration */}
            <div className="mt-6 p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Sei Block Explorer</h4>
                <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
                  Direct Integration
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A] h-12">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Sei Explorer
                </Button>
                <Button
                  variant="outline"
                  className="border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent h-12"
                >
                  <Activity className="w-5 h-5 mr-2" />
                  View Transactions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
