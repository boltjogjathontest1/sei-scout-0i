"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function WalletConnectButton() {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="default" className="cursor-pointer">
        Sei EVM (Mock)
      </Badge>
      <Button variant="outline" size="sm">
        Mock Wallet
      </Button>
    </div>
  )
}
