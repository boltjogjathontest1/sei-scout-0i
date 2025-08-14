"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Settings, Clock, Bell } from "lucide-react"

interface Alert {
  id: number
  severity: "high" | "medium" | "low"
  category: string
  message: string
  time: string
  icon: string
}

export default function FlashAlertFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      severity: "high",
      category: "Large Transfer",
      message: "Large transfer: 50,000 SEI to unknown wallet",
      time: "2 min ago",
      icon: "🔴",
    },
    {
      id: 2,
      severity: "medium",
      category: "New Token",
      message: "New token purchase: NEBULA (10K SEI)",
      time: "5 min ago",
      icon: "🟡",
    },
    {
      id: 3,
      severity: "low",
      category: "Smart Contract",
      message: "Smart contract interaction: Astroport Router",
      time: "12 min ago",
      icon: "🔵",
    },
    {
      id: 4,
      severity: "medium",
      category: "Unusual Time",
      message: "Off-hours activity: 3AM transfer detected",
      time: "18 min ago",
      icon: "🟠",
    },
    {
      id: 5,
      severity: "high",
      category: "MEV Activity",
      message: "Potential MEV bot activity detected",
      time: "25 min ago",
      icon: "⚫",
    },
  ])

  const [showConfig, setShowConfig] = useState(false)
  const [alertConfig, setAlertConfig] = useState({
    largeTransfer: { enabled: true, threshold: "10000" },
    newToken: { enabled: true, threshold: "" },
    offHours: { enabled: false, threshold: "" },
    smartContract: { enabled: true, threshold: "" },
    mevActivity: { enabled: true, threshold: "" },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now(),
        severity: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        category: ["Large Transfer", "New Token", "Smart Contract", "Unusual Time", "MEV Activity"][
          Math.floor(Math.random() * 5)
        ],
        message: `New activity detected in wallet sei1${Math.random().toString(36).substr(2, 6)}...`,
        time: "now",
        icon: ["🔴", "🟡", "🔵", "🟠", "⚫"][Math.floor(Math.random() * 5)],
      }
      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-500/10"
      case "medium":
        return "border-yellow-500 bg-yellow-500/10"
      case "low":
        return "border-green-500 bg-green-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-[#22D3EE]">
            <AlertTriangle className="w-5 h-5 mr-2" />
            FlashAlerts
            <div className="w-2 h-2 bg-[#22D3EE] rounded-full ml-2 animate-pulse"></div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfig(!showConfig)}
            className="text-gray-400 hover:text-[#22D3EE]"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Alert Configuration */}
        {showConfig && (
          <div className="mb-6 p-4 bg-[#0C101A] rounded-lg border border-[#2D3748]">
            <h4 className="font-semibold mb-4 flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Alert Configuration
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="large-transfer" className="text-sm">
                  Large Transfer Alerts
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="large-transfer-threshold"
                    placeholder="10,000 SEI"
                    value={alertConfig.largeTransfer.threshold}
                    onChange={(e) =>
                      setAlertConfig((prev) => ({
                        ...prev,
                        largeTransfer: { ...prev.largeTransfer, threshold: e.target.value },
                      }))
                    }
                    className="w-24 h-8 bg-[#1A202C] border-[#2D3748] text-xs"
                  />
                  <Switch
                    id="large-transfer"
                    checked={alertConfig.largeTransfer.enabled}
                    onCheckedChange={(checked) =>
                      setAlertConfig((prev) => ({
                        ...prev,
                        largeTransfer: { ...prev.largeTransfer, enabled: checked },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-token" className="text-sm">
                  New Token Purchase
                </Label>
                <Switch
                  id="new-token"
                  checked={alertConfig.newToken.enabled}
                  onCheckedChange={(checked) =>
                    setAlertConfig((prev) => ({
                      ...prev,
                      newToken: { ...prev.newToken, enabled: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="off-hours" className="text-sm">
                  Off-hours Activity
                </Label>
                <Switch
                  id="off-hours"
                  checked={alertConfig.offHours.enabled}
                  onCheckedChange={(checked) =>
                    setAlertConfig((prev) => ({
                      ...prev,
                      offHours: { ...prev.offHours, enabled: checked },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Alert Feed */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="text-lg">{alert.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      alert.severity === "high"
                        ? "border-red-500 text-red-500"
                        : alert.severity === "medium"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-green-500 text-green-500"
                    }`}
                  >
                    {alert.category}
                  </Badge>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notification Options */}
        <div className="mt-4 p-3 bg-[#0C101A] rounded-lg border border-[#2D3748]">
          <div className="text-sm font-semibold mb-2">Notification Methods</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE]">
              Push
            </Badge>
            <Badge variant="outline" className="border-gray-500 text-gray-500">
              Email
            </Badge>
            <Badge variant="outline" className="border-gray-500 text-gray-500">
              SMS
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-500">
              Discord
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
