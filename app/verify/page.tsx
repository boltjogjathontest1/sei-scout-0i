"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Clock, ExternalLink, Shield } from "lucide-react"
import { seitraceTx } from "@/lib/sei-config"

interface VerificationAlert {
  id: string
  type: string
  title: string
  address: string
  transactionHash: string
  blockNumber: string
  detectedAt: string
  deliveredAt: string
  latency: number
  severity: string
}

export default function VerifyPage() {
  const [alerts, setAlerts] = useState<VerificationAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAlerts: 0,
    avgLatency: 0,
    sub1sAlerts: 0,
    verificationRate: 0,
  })

  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        const response = await fetch("/api/alerts/recent?limit=100")
        if (response.ok) {
          const data = await response.json()
          setAlerts(data.alerts)

          const sub1s = data.alerts.filter((a: VerificationAlert) => a.latency < 1000).length
          setStats({
            totalAlerts: data.alerts.length,
            avgLatency: data.metadata.avgLatency,
            sub1sAlerts: sub1s,
            verificationRate: Math.round((sub1s / data.alerts.length) * 100),
          })
        }
      } catch (error) {
        console.error("Failed to fetch verification data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVerificationData()
  }, [])

  const downloadCSV = () => {
    const csvContent = [
      "ID,Type,Title,Address,Transaction Hash,Block Number,Detected At,Delivered At,Latency (ms),Severity",
      ...alerts.map(
        (alert) =>
          `${alert.id},${alert.type},${alert.title},${alert.address},${alert.transactionHash},${alert.blockNumber},${alert.detectedAt},${alert.deliveredAt},${alert.latency},${alert.severity}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `seiscout-alerts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(
      {
        metadata: {
          exportDate: new Date().toISOString(),
          totalAlerts: alerts.length,
          avgLatency: stats.avgLatency,
          sub1sAlerts: stats.sub1sAlerts,
          verificationNote: "All timestamps are verifiable on Sei blockchain via Seitrace explorer",
        },
        alerts,
      },
      null,
      2,
    )

    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `seiscout-alerts-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C101A] flex items-center justify-center">
        <div className="text-[#22D3EE]">Loading verification data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C101A] text-[#F7FAFC] p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#22D3EE] mb-2">Alert Verification Dashboard</h1>
          <p className="text-gray-400">Verifiable alert performance data for auditors and compliance</p>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1A202C] border-[#2D3748]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#22D3EE] mb-2">{stats.totalAlerts}</div>
              <div className="text-sm text-gray-400">Total Alerts (24h)</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A202C] border-[#2D3748]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{stats.avgLatency}ms</div>
              <div className="text-sm text-gray-400">Average Latency</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A202C] border-[#2D3748]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#22D3EE] mb-2">{stats.sub1sAlerts}</div>
              <div className="text-sm text-gray-400">Sub-1s Alerts</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A202C] border-[#2D3748]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{stats.verificationRate}%</div>
              <div className="text-sm text-gray-400">Sub-1s Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Download Section */}
        <Card className="bg-[#1A202C] border-[#2D3748] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-[#22D3EE]">
              <Shield className="w-5 h-5 mr-2" />
              Export Verification Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={downloadCSV} className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#0C101A]">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
              <Button
                onClick={downloadJSON}
                variant="outline"
                className="border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download JSON
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              All alert timestamps are verifiable on the Sei blockchain. Transaction hashes can be verified on Seitrace
              explorer.
            </p>
          </CardContent>
        </Card>

        {/* Alert Log Table */}
        <Card className="bg-[#1A202C] border-[#2D3748]">
          <CardHeader>
            <CardTitle className="text-[#22D3EE]">Recent Alert Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2D3748]">
                    <th className="text-left p-3 text-gray-400">Time</th>
                    <th className="text-left p-3 text-gray-400">Type</th>
                    <th className="text-left p-3 text-gray-400">Address</th>
                    <th className="text-left p-3 text-gray-400">Latency</th>
                    <th className="text-left p-3 text-gray-400">Severity</th>
                    <th className="text-left p-3 text-gray-400">Verify</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.slice(0, 20).map((alert) => (
                    <tr key={alert.id} className="border-b border-[#2D3748]/50 hover:bg-[#2D3748]/30">
                      <td className="p-3">
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(alert.detectedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {alert.type.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="p-3 font-mono text-[#22D3EE]">
                        {alert.address.slice(0, 8)}...{alert.address.slice(-6)}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            alert.latency < 1000
                              ? "border-green-500 text-green-500"
                              : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {alert.latency}ms
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            alert.severity === "critical"
                              ? "border-red-500 text-red-500"
                              : alert.severity === "high"
                                ? "border-orange-500 text-orange-500"
                                : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                          onClick={() => window.open(seitraceTx(alert.transactionHash), "_blank")}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
