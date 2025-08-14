"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Wallet, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (walletAddress.trim()) {
      router.push(`/dashboard?addr=${walletAddress}`)
    }
  }

  const handleDemo = () => {
    router.push("/dashboard?addr=sei1demo...")
  }

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0C101A]/80 backdrop-blur-md border-b border-[#1A202C]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#22D3EE] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0C101A]" />
              </div>
              <span className="text-xl font-bold text-[#22D3EE]">SeiScout</span>
              <span className="text-sm text-gray-400 ml-2">AI Wallet Radar</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="hover:text-[#22D3EE] transition-colors">
                Dashboard
              </Link>
              <Link href="/analysis" className="hover:text-[#22D3EE] transition-colors">
                Analysis
              </Link>
              <Link href="/opportunities" className="hover:text-[#22D3EE] transition-colors">
                Opportunities
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          {/* Connect Wallet CTA */}
          <div className="mb-8">
            <Button
              size="lg"
              className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A] font-semibold px-8 py-3 text-lg"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Updated Main Hero */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-[#22D3EE]">SeiScout:</span> AI Wallet Radar
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Insight {"< 3s"} • Alert {"< 1s"} • Sei Network Native Analytics
            </p>
          </div>

          {/* Updated Search Bar with more prominence */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  placeholder="Enter Sei wallet address..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="pl-12 py-6 text-xl bg-[#1A202C] border-[#2D3748] focus:border-[#22D3EE] text-[#F7FAFC] rounded-xl"
                  autoFocus
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                size="lg"
                className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A] px-10 py-6 text-xl font-semibold rounded-xl"
              >
                Analyze Wallet
              </Button>
            </div>

            {/* Enhanced Demo Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_whale")}
                className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE] hover:text-[#0C101A] bg-transparent px-6 py-3"
              >
                🐋 Demo Whale
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_defi")}
                className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE] hover:text-[#0C101A] bg-transparent px-6 py-3"
              >
                ⚡ DeFi Trader
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_nft")}
                className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE] hover:text-[#0C101A] bg-transparent px-6 py-3"
              >
                🎨 NFT Collector
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-[#1A202C] border-[#2D3748]">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-[#22D3EE] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-gray-400">Monitor wallet activities and patterns in real-time</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A202C] border-[#2D3748]">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-[#22D3EE] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
                <p className="text-gray-400">Advanced risk scoring and anomaly detection</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A202C] border-[#2D3748]">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-[#22D3EE] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
                <p className="text-gray-400">Get notified of suspicious activities instantly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1A202C] py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 SeiScout. Built for Sei Network hackathon.</p>
        </div>
      </footer>
    </div>
  )
}
