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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-accent font-[family-name:var(--font-space-grotesk)]">
                SeiScout
              </span>
              <span className="text-sm text-white/70 ml-2">AI Wallet Radar</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="hover:text-accent transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/analysis" className="hover:text-accent transition-colors font-medium">
                Analysis
              </Link>
              <Link href="/opportunities" className="hover:text-accent transition-colors font-medium">
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
              className="bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Champion Hero */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-[family-name:var(--font-space-grotesk)]">
              <span className="text-accent">SeiScout</span>
              <br />
              <span className="text-white">AI Wallet Radar</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">Advanced Sei Network Analytics</p>
            <p className="text-lg text-white/70">Real-time insights, behavioral analysis, and opportunity detection</p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-6 h-6" />
                <Input
                  placeholder="Enter Sei wallet address to analyze..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="pl-12 py-6 text-xl bg-white/95 border-0 focus:ring-2 focus:ring-accent text-primary rounded-xl shadow-lg"
                  autoFocus
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary px-10 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Analyze
              </Button>
            </div>

            {/* Champion Demo Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_whale")}
                className="border-accent text-accent hover:bg-accent hover:text-primary bg-white/10 backdrop-blur-sm px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                Whale Investor
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_defi")}
                className="border-accent text-accent hover:bg-accent hover:text-primary bg-white/10 backdrop-blur-sm px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                DeFi Trader
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWalletAddress("sei1demo_nft")}
                className="border-accent text-accent hover:bg-accent hover:text-primary bg-white/10 backdrop-blur-sm px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                NFT Collector
              </Button>
            </div>
          </div>

          {/* Champion Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Advanced Analytics
                </h3>
                <p className="text-white/80">Real-time behavioral analysis and performance metrics</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">Risk Assessment</h3>
                <p className="text-white/80">Comprehensive risk scoring and portfolio protection</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">Flash Alerts</h3>
                <p className="text-white/80">Sub-second notifications for market opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8 bg-primary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-white/70">
          <p>&copy; 2024 SeiScout. Advanced Sei Network Analytics Platform.</p>
        </div>
      </footer>
    </div>
  )
}
