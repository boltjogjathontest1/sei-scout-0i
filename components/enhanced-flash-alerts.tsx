"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Settings, Clock, Bell, Zap, ExternalLink } from "lucide-react"
import { seitraceTx } from "@/lib/sei-config"

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  type: string
  title: string
  description: string
  address: string
  transactionHash: string
  blockNumber: string
  detectedAt: string
  deliveredAt: string
  latency: number
  evidence: {
    contract: string
    topics: string[]
    blockHash: string
  }
}

interface AlertStats {
  total24h: number
  critical: number
  high: number
  avgLatency: number
}

export default function EnhancedFlashAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [alertStats, setAlertStats] = useState<AlertStats>({
    total24h: 0,
    critical: 0,
    high: 0,
    avgLatency: 0,
  })

  const fetchAlerts = useCallback(async () => {
    try {
      const response = await fetch("/api/alerts/recent?limit=10")
      if (response.ok) {
        const data = await response.json()
        setAlerts(data.alerts)
        setAlertStats({
          total24h: data.alerts.length,
          critical: data.alerts.filter((a: Alert) => a.severity === "critical").length,
          high: data.alerts.filter((a: Alert) => a.severity === "high").length,
          avgLatency: data.metadata.avgLatency,
        })
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error)
      setIsConnected(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()

    const interval = setInterval(() => {
      fetchAlerts()
    }, 3000) // Poll every 3 seconds for real-time updates

    return () => clearInterval(interval)
  }, [fetchAlerts])

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

  const getAlertIcon = (type: string) => {
    const icons = {
      large_transfer: "🔴",
      unusual_activity: "🟡",
      dex_interaction: "🔵",
      staking_withdrawal: "🟠",
      contract_interaction: "⚫",
    }
    return icons[type as keyof typeof icons] || "🔔"
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffMs = now.getTime() - alertTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return alertTime.toLocaleDateString()
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-[#22D3EE] text-xl">
            <AlertTriangle className="w-6 h-6 mr-3" />
            FlashAlert System
            <div className="flex items-center ml-3">
              <div
                className={`w-3 h-3 rounded-full ${isConnected ? "bg-[#22D3EE] animate-pulse" : "bg-red-500"}`}
              ></div>
              <span className="text-sm text-gray-400 ml-2">{isConnected ? "Live" : "Offline"}</span>
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
            <div className="text-2xl font-bold text-[#22D3EE]">{alertStats.avgLatency}ms</div>
            <div className="text-xs text-gray-400">Avg Latency</div>
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
                    <Label className="font-semibold">🟡 Unusual Activity</Label>
                    <div className="text-sm text-gray-400">Pattern anomaly detection</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🟠 Staking Withdrawals</Label>
                    <div className="text-sm text-gray-400">Large unstaking events</div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">🔵 DEX Interactions</Label>
                    <div className="text-sm text-gray-400">Swap and liquidity events</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1A202C] rounded-lg">
                  <div>
                    <Label className="font-semibold">⚫ Contract Interactions</Label>
                    <div className="text-sm text-gray-400">Smart contract calls</div>
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
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {isConnected ? "No recent alerts" : "Connecting to alert feed..."}
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-2 ${getSeverityColor(alert.severity)} hover:scale-[1.02] transition-all duration-200`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="outline"
                          className={`text-sm font-semibold ${getSeverityBadgeColor(alert.severity)}`}
                        >
                          {alert.title}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getSeverityBadgeColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#22D3EE] text-[#22D3EE]">
                          {alert.latency}ms
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(alert.detectedAt)}
                      </span>
                    </div>
                    <p className="text-base font-medium text-gray-200 mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-mono text-[#22D3EE]">
                          {alert.address.slice(0, 8)}...{alert.address.slice(-6)}
                        </span>
                        <span className="text-gray-400">Block: {alert.blockNumber}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                        onClick={() => window.open(seitraceTx(alert.transactionHash), "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Notification Methods */}
        <div className="mt-6 p-4 bg-[#0C101A] rounded-xl border border-[#2D3748]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#22D3EE]" />
              <span className="font-semibold text-lg">Notification Channels</span>
            </div>
            <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
              Real-time
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
              <div className="text-sm font-semibold">Telegram</div>
              <div className="text-xs text-gray-500">Disabled</div>
            </div>
            <div className="p-3 bg-[#1A202C] rounded-lg text-center">
              <div className="text-2xl mb-1">🎮</div>
              <div className="text-sm font-semibold text-purple-400">Discord</div>
              <div className="text-xs text-green-500">Active</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Alert verification available for auditors</div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 bg-transparent"
              onClick={() => window.open("/verify", "_blank")}
            >
              Download Logs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
