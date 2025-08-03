"use client"

import { useState } from "react"
import { Home, Package, History, Tag, Bell, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "ホーム", href: "#", icon: Home, current: false },
  { name: "すべてのモノ", href: "#", icon: Package, current: true },
  { name: "貸出履歴", href: "#", icon: History, current: false },
  { name: "カテゴリ・タグ", href: "#", icon: Tag, current: false },
  { name: "通知", href: "#", icon: Bell, current: false },
  { name: "家族設定", href: "#", icon: Users, current: false },
  { name: "設定", href: "#", icon: Settings, current: false },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">aredoko</h1>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Button
                  variant={item.current ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    item.current && "bg-emerald-500 hover:bg-emerald-600",
                    collapsed && "px-2",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
