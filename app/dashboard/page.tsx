"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, Shield, Wallet, Target, Users, TrendingUp, Zap } from "lucide-react"
import Navigation from "@/components/navigation"
import WalletHeader from "@/components/wallet-header"
import EnhancedSpendingPatterns from "@/components/enhanced-spending-patterns"
import EnhancedInvestmentStrategy from "@/components/enhanced-investment-strategy"
import EnhancedSeiIntegration from "@/components/enhanced-sei-integration"
import EnhancedFlashAlerts from "@/components/enhanced-flash-alerts"
import { SampleWalletsDropdown } from "@/components/sample-wallets-dropdown"

function DashboardContent() {
  const searchParams = useSearchParams()
  const walletAddr = searchParams.get("addr")
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [selectedSampleWallet, setSelectedSampleWallet] = useState<any>(null)

  const currentAddress = connectedAddress || selectedSampleWallet?.address || walletAddr

  const [walletData, setWalletData] = useState({
    address: currentAddress || "Connect wallet to analyze",
    label: selectedSampleWallet?.label || "Wallet Analysis",
    lastActive: "2 minutes ago",
    totalBalance: selectedSampleWallet?.balance || "847.2K SEI",
    activity24h: selectedSampleWallet?.tx24h ? `${selectedSampleWallet.tx24h} Transactions` : "23 Transactions",
    behaviorScore: "8.7/10",
    riskLevel: "Low",
    balanceUSD: "$717,284",
  })

  const [metrics, setMetrics] = useState({
    totalBalance: 847200,
    activity24h: 23,
    behaviorScore: 8.7,
    riskLevel: "Low",
    portfolioValue: 717284,
    activePositions: 12,
    avgTransactionSize: 2340,
    holdingPeriod: 45,
  })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (connectedAddress || selectedSampleWallet) {
      setWalletData((prev) => ({
        ...prev,
        address: connectedAddress || selectedSampleWallet?.address || "Connect wallet to analyze",
        label: selectedSampleWallet?.label || (connectedAddress ? "Connected Wallet" : "Wallet Analysis"),
        totalBalance: selectedSampleWallet?.balance || prev.totalBalance,
        activity24h: selectedSampleWallet?.tx24h ? `${selectedSampleWallet.tx24h} Transactions` : prev.activity24h,
      }))
    }
  }, [connectedAddress, selectedSampleWallet])

  const handleAddToWatchlist = () => {
    setIsMonitoring(!isMonitoring)
  }

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC]">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#22D3EE]">SeiScout AI Wallet Radar</h1>
              <p className="text-gray-400">
                Insight {"< 3s"} • Alert {"< 1s"} • Real-time Sei Analytics
              </p>
            </div>
            {!isConnected && (
              <SampleWalletsDropdown onSelectWallet={setSelectedSampleWallet} selectedWallet={selectedSampleWallet} />
            )}
          </div>

          {/* Wallet Header */}
          <WalletHeader
            address={walletData.address}
            label={walletData.label}
            lastActive={walletData.lastActive}
            isMonitoring={isMonitoring}
            onToggleMonitoring={handleAddToWatchlist}
          />

          {/* Enhanced Key Metrics Grid with Varied Sizes */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            {/* Large Highlight Card - PulseScore */}
            <Card className="bg-[#1A202C] border-[#2D3748] col-span-12 md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-400 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  PulseScore
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-16 w-24 bg-[#2D3748]" />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#22D3EE] mb-2">{walletData.behaviorScore}</div>
                    <Badge variant="outline" className="border-green-500 text-green-500 text-lg px-4 py-1">
                      Excellent
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medium Cards */}
            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  24h Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-12 w-16 bg-[#2D3748]" />
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-[#22D3EE]">{walletData.activity24h}</div>
                    <div className="text-sm text-gray-400">Transactions</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-12 w-16 bg-[#2D3748]" />
                ) : (
                  <div>
                    <Badge variant="outline" className="border-green-500 text-green-500 text-2xl px-4 py-2 font-bold">
                      {walletData.riskLevel}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Small Cards */}
            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-20 bg-[#2D3748]" />
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-[#22D3EE]">{walletData.totalBalance}</div>
                    <div className="text-xs text-gray-400">{walletData.balanceUSD}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  DeFi Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16 bg-[#2D3748]" />
                ) : (
                  <div className="text-2xl font-bold text-[#22D3EE]">9.2</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-12 bg-[#2D3748]" />
                ) : (
                  <div className="text-2xl font-bold text-green-500">78%</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#1A202C] border-[#2D3748] col-span-6 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-12 bg-[#2D3748]" />
                ) : (
                  <div className="text-2xl font-bold text-yellow-500">3</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Main Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Spending Patterns */}
              <EnhancedSpendingPatterns />

              {/* Investment Strategy */}
              <EnhancedInvestmentStrategy />
            </div>

            {/* Right Panel - Alerts & Status */}
            <div className="space-y-6">
              {/* Flash Alert Feed */}
              <EnhancedFlashAlerts />

              {/* Sei Network Status */}
              <EnhancedSeiIntegration />

              {/* Related Wallets */}
              <Card className="bg-[#1A202C] border-[#2D3748]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#22D3EE]">
                    <Users className="w-5 h-5 mr-2" />
                    Related Wallets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div>
                      <div className="font-mono text-sm text-[#22D3EE]">sei1abc...def</div>
                      <div className="text-xs text-gray-400">Similar patterns</div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      92% match
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div>
                      <div className="font-mono text-sm text-[#22D3EE]">sei1ghi...jkl</div>
                      <div className="text-xs text-gray-400">Connected transactions</div>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                      78% match
                    </Badge>
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

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C101A] flex items-center justify-center">
          <div className="text-[#22D3EE]">Loading wallet analysis...</div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
