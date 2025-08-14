"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Download, Share, Clock, Wallet, ExternalLink } from "lucide-react"
import { seitraceAddr } from "@/lib/sei-config"

interface WalletHeaderProps {
  address: string
  label: string
  lastActive: string
  isMonitoring: boolean
  onToggleMonitoring: () => void
}

export default function WalletHeader({
  address,
  label,
  lastActive,
  isMonitoring,
  onToggleMonitoring,
}: WalletHeaderProps) {
  const handleViewOnExplorer = () => {
    if (address && address !== "Connect wallet to analyze") {
      window.open(seitraceAddr(address), "_blank")
    }
  }

  return (
    <Card className="bg-[#1A202C] border-[#2D3748] mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#22D3EE] rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-[#0C101A]" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-xl font-bold text-[#F7FAFC]">{label}</h2>
                <Badge
                  variant="outline"
                  className={`${
                    isMonitoring ? "border-[#22D3EE] text-[#22D3EE] animate-pulse" : "border-gray-500 text-gray-500"
                  }`}
                >
                  {isMonitoring ? "MONITORING" : "NOT MONITORING"}
                </Badge>
                <Badge variant="outline" className="border-[#22D3EE] text-[#22D3EE] text-xs">
                  Sei EVM (1329)
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="font-mono text-[#22D3EE] text-lg">{address}</div>
                {address && address !== "Connect wallet to analyze" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                    onClick={handleViewOnExplorer}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Seitrace
                  </Button>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                Last active: {lastActive}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onToggleMonitoring}
              className={`${
                isMonitoring ? "bg-green-500 hover:bg-green-600" : "bg-[#22D3EE] hover:bg-[#22D3EE]/90"
              } text-[#0C101A]`}
            >
              <Star className="w-4 h-4 mr-2" />
              {isMonitoring ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
            <Button variant="outline" className="border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-[#2D3748] text-[#F7FAFC] hover:bg-[#2D3748] bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
