"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Settings, Clock, Bell, Zap } from "lucide-react"

interface Alert {
  id: number
  severity: "critical" | "high" | "medium" | "low"
  category: string
  message: string
  time: string
  icon: string
  wallet?: string
  amount?: string
}

export default function EnhancedFlashAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      severity: "critical",
      category: "Large Transfer",
      message: "Massive transfer detected: 50,000 SEI to unknown wallet",
      time: "2 min ago",
      icon: "🔴",
      wallet: "sei1abc...def",
      amount: "50,000 SEI",
    },
    {
      id: 2,
      severity: "high",
      category: "New Token",
      message: "New token purchase: NEBULA token (10K SEI investment)",
      time: "5 min ago",
      icon: "🟡",
      wallet: "sei1ghi...jkl",
      amount: "10,000 SEI",
    },
    {
      id: 3,
      severity: "medium",
      category: "Smart Contract",
      message: "Complex smart contract interaction: Astroport Router",
      time: "12 min ago",
      icon: "🔵",
      wallet: "sei1mno...pqr",
    },
    {
      id: 4,
      severity: "high",
      category: "Unusual Time",
      message: "Suspicious off-hours activity: 3AM large transfer",
      time: "18 min ago",
      icon: "🟠",
      wallet: "sei1stu...vwx",
      amount: "25,000 SEI",
    },
    {
      id: 5,
      severity: "critical",
      category: "MEV Activity",
      message: "Potential MEV bot detected: High-frequency arbitrage",
      time: "25 min ago",
      icon: "⚫",
      wallet: "sei1xyz...abc",
    },
  ])

  const [showConfig, setShowConfig] = useState(false)
  const [alertStats, setAlertStats] = useState({
    total24h: 47,
    critical: 3,
    high: 12,
    avgResponseTime: "0.8s",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const alertTypes = [
        { category: "Large Transfer", icon: "🔴", severity: "critical" as const },
        { category: "New Token", icon: "🟡", severity: "high" as const },
        { category: "Smart Contract", icon: "🔵", severity: "medium" as const },
        { category: "Unusual Time", icon: "🟠", severity: "high" as const },
        { category: "MEV Activity", icon: "⚫", severity: "critical" as const },
      ]

      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      const newAlert: Alert = {
        id: Date.now(),
        severity: randomType.severity,
        category: randomType.category,
        message: `${randomType.category} detected in wallet sei1${Math.random().toString(36).substr(2, 6)}...`,
        time: "now",
        icon: randomType.icon,
        wallet: `sei1${Math.random().toString(36).substr(2, 6)}...`,
        amount:
          randomType.category === "Large Transfer" ? `${Math.floor(Math.random() * 50000 + 10000)} SEI` : undefined,
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
      setAlertStats((prev) => ({ ...prev, total24h: prev.total24h + 1 }))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-500/20 text-red-400"
      case "high":
        return "border-orange-500 bg-orange-500/20 text-orange-400"
      case "medium":
        return "border-yellow-500 bg-yellow-500/20 text-yellow-400"
      case "low":
        return "border-green-500 bg-green-500/20 text-green-400"
      default:
        return "border-gray-500 bg-gray-500/20 text-gray-400"
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 text-red-500"
      case "high":
        return "border-orange-500 text-orange-500"
      case "medium":
        return "border-yellow-500 text-yellow-500"
      case "low":
        return "border-green-500 text-green-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-[#22D3EE] text-xl">
            <AlertTriangle className="w-6 h-6 mr-3" />
            FlashAlert System
            <div className="flex items-center ml-3">
              <div className="w-3 h-3 bg-[#22D3EE] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400 ml-2">Live</span>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfig(!showConfig)}
            className="text-gray-400 hover:text-[#22D3EE]"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-[#0C101A] rounded-lg">
            <div className="text-2xl font-bold text-[#22D3EE]">{alertStats.total24h}</div>
            <div className="text-xs text-gray-400">24h Alerts</div>
          </div>
          <div className="text-center p-3 bg-[#0C101A] rounded-lg">
            <div className="text-2xl font-bold text-red-500">{alertStats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="text-center p-3 bg-[#0C101A] rounded-lg">
            <div className="text-2xl font-bold text-orange-500">{alertStats.high}</div>
            <div className="text-xs text-gray-400">High Priority</div>
          </div>
          <div className="text-center p-3 bg-[#0C101A] rounded-lg">
            <div className="text-2xl font-bold text-[#22D3EE]">{alertStats.avgResponseTime}</div>
            <div className="text-xs text-gray-400">Avg Response</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Alert Configuration */}
        {showConfig && (
          <div className="mb-6 p-6 bg-[#0C101A] rounded-xl border border-[#2D3748]">
            <h4 className="font-bold text-lg mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-[#22D3EE]" />
              Alert Configuration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🔴 Large Transfer Alerts</Label>
                    <div className="text-sm text-gray-400">Threshold: 10,000+ SEI</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🟡 New Token Purchase</Label>
                    <div className="text-sm text-gray-400">Any new token acquisition</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🟠 Off-hours Activity</Label>
                    <div className="text-sm text-gray-400">Activity between 12AM-6AM</div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🔵 Smart Contract Interaction</Label>
                    <div className="text-sm text-gray-400">Complex contract calls</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">⚫ MEV Bot Detection</Label>
                    <div className="text-sm text-gray-400">Potential MEV activity</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="p-3 bg-[#1A202C] rounded-lg">
                  <Label className="font-semibold mb-2 block">Custom Threshold</Label>
                  <Input placeholder="Enter SEI amount..." className="bg-[#0C101A] border-[#2D3748]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Alert Feed */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border-2 ${getSeverityColor(alert.severity)} hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{alert.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className={`text-sm font-semibold ${getSeverityBadgeColor(alert.severity)}`}
                      >
                        {alert.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getSeverityBadgeColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-400 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-base font-medium text-gray-200 mb-2">{alert.message}</p>
                  {(alert.wallet || alert.amount) && (
                    <div className="flex items-center space-x-4 text-sm">
                      {alert.wallet && <span className="font-mono text-[#22D3EE]">Wallet: {alert.wallet}</span>}
                      {alert.amount && <span className="font-semibold text-yellow-400">Amount: {alert.amount}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Notification Methods */}
        <div className="mt-6 p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#22D3EE]" />
              <span className="font-semibold text-lg">Notification Channels</span>
            </div>
            <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
              Multi-channel
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#1A202C] rounded-lg text-center">
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-semibold text-[#22D3EE]">Push</div>
              <div className="text-xs text-green-500">Active</div>
            </div>
            <div className="p-3 bg-[#1A202C] rounded-lg text-center">
              <div className="text-2xl mb-1">📧</div>
              <div className="text-sm font-semibold">Email</div>
              <div className="text-xs text-gray-500">Disabled</div>
            </div>
            <div className="p-3 bg-[#1A202C] rounded-lg text-center">
              <div className="text-2xl mb-1">💬</div>
              <div className="text-sm font-semibold">SMS</div>
              <div className="text-xs text-gray-500">Disabled</div>
            </div>
            <div className="p-3 bg-[#1A202C] rounded-lg text-center">
              <div className="text-2xl mb-1">🎮</div>
              <div className="text-sm font-semibold text-purple-400">Discord</div>
              <div className="text-xs text-green-500">Active</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
