"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink, Settings, TrendingUp, AlertTriangle, DollarSign, Zap, Target, Shield } from "lucide-react"
import { seitraceAddr } from "@/lib/sei-config"

interface MirrorTradingModalProps {
  wallet: {
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
    confidence?: number
    estimatedGas?: string
    slippage?: string
  }
  children: React.ReactNode
}

export function MirrorTradingModal({ wallet, children }: MirrorTradingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mirrorAmount, setMirrorAmount] = useState(1000)
  const [slippage, setSlippage] = useState([0.5])
  const [autoMirror, setAutoMirror] = useState(true)
  const [riskLimit, setRiskLimit] = useState([10])
  const [selectedTokens, setSelectedTokens] = useState(new Set(wallet.topTokens))

  const handleStartMirroring = () => {
    // Generate DragonSwap URL with parameters
    const dragonSwapUrl = `https://dragonswap.app/swap?inputCurrency=SEI&outputCurrency=USDC&exactAmount=${wallet.avgTradeSize}&slippage=${slippage[0]}`
    window.open(dragonSwapUrl, "_blank")
    setIsOpen(false)
  }

  const estimatedReturns = {
    daily: (wallet.pnl.percentage / 30).toFixed(2),
    weekly: (wallet.pnl.percentage / 4.3).toFixed(2),
    monthly: wallet.pnl.percentage.toFixed(2),
  }

  const riskMetrics = {
    volatility: wallet.riskScore * 10,
    maxDrawdown: wallet.riskScore * 2,
    sharpe: wallet.sharpeRatio,
    winRate: wallet.winRate,
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#1A202C] border-[#2D3748] text-[#F7FAFC]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-[#22D3EE] text-xl">
            <Copy className="w-5 h-5 mr-2" />
            Mirror Trade Setup
            <Badge variant="outline" className="ml-3 border-green-500 text-green-500">
              {wallet.confidence || 85}% Confidence
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Wallet Info */}
          <div className="space-y-4">
            <Card className="bg-[#0C101A] border-[#2D3748]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400">Target Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-bold text-lg text-[#22D3EE]">{wallet.label}</div>
                  <div className="text-xs font-mono text-gray-400">
                    {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20 mt-1"
                    onClick={() => window.open(seitraceAddr(wallet.address), "_blank")}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Seitrace
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-400">PNL</div>
                    <div className="font-bold text-green-500">+{wallet.pnl.percentage.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Win Rate</div>
                    <div className="font-bold text-[#22D3EE]">{wallet.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Sharpe</div>
                    <div className="font-bold text-[#22D3EE]">{wallet.sharpeRatio.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Risk Score</div>
                    <div className="font-bold text-yellow-500">{wallet.riskScore.toFixed(1)}/10</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-2">Top Tokens</div>
                  <div className="flex flex-wrap gap-1">
                    {wallet.topTokens.map((token) => (
                      <Badge key={token} variant="outline" className="border-[#22D3EE] text-[#22D3EE] text-xs">
                        {token}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="bg-[#0C101A] border-[#2D3748]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Risk Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-400">Volatility</div>
                    <div className="font-bold text-yellow-500">{riskMetrics.volatility.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Max Drawdown</div>
                    <div className="font-bold text-red-500">-{riskMetrics.maxDrawdown.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="p-3 bg-[#1A202C] rounded-lg border border-[#2D3748]">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold">Risk Warning</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Mirror trading involves significant risk. Past performance does not guarantee future results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Configuration */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#0C101A]">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A]"
                >
                  Basic Setup
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A]"
                >
                  Advanced
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-[#22D3EE] data-[state=active]:text-[#0C101A]"
                >
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Mirror Amount (SEI)</Label>
                    <Input
                      type="number"
                      value={mirrorAmount}
                      onChange={(e) => setMirrorAmount(Number(e.target.value))}
                      className="bg-[#0C101A] border-[#2D3748] text-[#F7FAFC]"
                      placeholder="Enter amount in SEI"
                    />
                    <div className="text-xs text-gray-400 mt-1">≈ ${(mirrorAmount * 0.847).toFixed(2)} USD</div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Slippage Tolerance: {slippage[0]}%</Label>
                    <Slider
                      value={slippage}
                      onValueChange={setSlippage}
                      max={5}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.1%</span>
                      <span>5%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div>
                      <Label className="font-semibold">Auto-Mirror Trades</Label>
                      <div className="text-sm text-gray-400">Automatically copy new trades</div>
                    </div>
                    <Switch checked={autoMirror} onCheckedChange={setAutoMirror} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Risk Limit: {riskLimit[0]}% per trade</Label>
                    <Slider
                      value={riskLimit}
                      onValueChange={setRiskLimit}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Token Selection</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["SEI", "USDC", "ATOM", "WETH", "OSMO", "NEBULA"].map((token) => (
                        <div
                          key={token}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedTokens.has(token)
                              ? "border-[#22D3EE] bg-[#22D3EE]/10"
                              : "border-[#2D3748] bg-[#0C101A]"
                          }`}
                          onClick={() => {
                            const newSelected = new Set(selectedTokens)
                            if (newSelected.has(token)) {
                              newSelected.delete(token)
                            } else {
                              newSelected.add(token)
                            }
                            setSelectedTokens(newSelected)
                          }}
                        >
                          <div className="text-center">
                            <div className="font-semibold">{token}</div>
                            <div className="text-xs text-gray-400">
                              {selectedTokens.has(token) ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                      <Label className="font-semibold mb-2 block">Stop Loss</Label>
                      <Input type="number" placeholder="10" className="bg-[#1A202C] border-[#2D3748]" />
                      <div className="text-xs text-gray-400 mt-1">% loss to trigger stop</div>
                    </div>

                    <div className="p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                      <Label className="font-semibold mb-2 block">Take Profit</Label>
                      <Input type="number" placeholder="25" className="bg-[#1A202C] border-[#2D3748]" />
                      <div className="text-xs text-gray-400 mt-1">% gain to trigger sell</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                      <div>
                        <Label className="font-semibold">Copy Limit Orders</Label>
                        <div className="text-sm text-gray-400">Mirror limit order placements</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                      <div>
                        <Label className="font-semibold">Mirror DeFi Positions</Label>
                        <div className="text-sm text-gray-400">Copy LP and staking positions</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                      <div>
                        <Label className="font-semibold">Real-time Notifications</Label>
                        <div className="text-sm text-gray-400">Get alerts for new trades</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-6 space-y-6">
                <div className="space-y-4">
                  <Card className="bg-[#0C101A] border-[#2D3748]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-gray-400 flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        Estimated Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-500">+{estimatedReturns.daily}%</div>
                          <div className="text-xs text-gray-400">Daily</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-500">+{estimatedReturns.weekly}%</div>
                          <div className="text-xs text-gray-400">Weekly</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-500">+{estimatedReturns.monthly}%</div>
                          <div className="text-xs text-gray-400">Monthly</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0C101A] border-[#2D3748]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-gray-400 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Cost Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Mirror Amount</span>
                        <span className="font-semibold">{mirrorAmount.toLocaleString()} SEI</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Gas</span>
                        <span className="font-semibold">{wallet.estimatedGas || "0.001 SEI"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>DEX Fees (0.3%)</span>
                        <span className="font-semibold">{(mirrorAmount * 0.003).toFixed(3)} SEI</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Slippage ({slippage[0]}%)</span>
                        <span className="font-semibold">≤{((mirrorAmount * slippage[0]) / 100).toFixed(3)} SEI</span>
                      </div>
                      <div className="border-t border-[#2D3748] pt-2 flex justify-between font-semibold">
                        <span>Total Cost</span>
                        <span className="text-[#22D3EE]">
                          {(mirrorAmount + 0.001 + mirrorAmount * 0.003).toFixed(3)} SEI
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-[#22D3EE]" />
                      <span className="font-semibold">DEX Integration</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-3">
                      Trades will be executed on DragonSwap with optimized routing for best prices.
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        DragonSwap Ready
                      </Badge>
                      <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
                        Auto-routing
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2D3748]">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent"
              >
                Cancel
              </Button>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
                <Button onClick={handleStartMirroring} className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Mirror Trading
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
