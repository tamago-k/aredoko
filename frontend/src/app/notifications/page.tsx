"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Clock, CheckCircle, AlertTriangle, Users, Package, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const mockNotifications = [
  {
    id: 1,
    type: "overdue",
    title: "返却期限を過ぎています",
    message: "MacBook Proの返却期限が過ぎています（借用者: 田中次郎）",
    timestamp: "2024-02-16 09:30",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "due_soon",
    title: "返却期限が近づいています",
    message: "電動ドリルの返却期限が明日です（借用者: 田中太郎）",
    timestamp: "2024-02-15 14:20",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "returned",
    title: "アイテムが返却されました",
    message: "キャンプテントが返却されました（借用者: 田中次郎）",
    timestamp: "2024-02-14 16:45",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "borrowed",
    title: "アイテムが貸し出されました",
    message: "料理本セットが貸し出されました（借用者: 田中花子）",
    timestamp: "2024-02-13 11:15",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    type: "family_joined",
    title: "新しい家族メンバーが参加しました",
    message: "田中三郎さんが家族に参加しました",
    timestamp: "2024-02-12 19:30",
    read: true,
    priority: "medium",
  },
  {
    id: 6,
    type: "item_added",
    title: "新しいアイテムが追加されました",
    message: "ヨガマットが追加されました（追加者: 田中花子）",
    timestamp: "2024-02-11 08:20",
    read: true,
    priority: "low",
  },
]

const notificationIcons = {
  overdue: AlertTriangle,
  due_soon: Clock,
  returned: CheckCircle,
  borrowed: Package,
  family_joined: Users,
  item_added: Package,
}

const notificationColors = {
  high: "border-l-red-500 bg-red-50",
  medium: "border-l-orange-500 bg-orange-50",
  low: "border-l-gray-500 bg-gray-50",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return !notif.read
    if (activeTab === "overdue") return notif.type === "overdue" || notif.type === "due_soon"
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length
  const overdueCount = notifications.filter((notif) => notif.type === "overdue" || notif.type === "due_soon").length

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage="notifications"
      />
      <div className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}>
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">通知</h1>
                <p className="text-slate-600">重要なお知らせや期限をお知らせします</p>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead} className="bg-transparent">
                  すべて既読にする
                </Button>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all" className="relative">
                すべて
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                未読
                {unreadCount > 0 && <Badge className="ml-2 text-xs bg-emerald-500">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="overdue" className="relative">
                期限関連
                {overdueCount > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {overdueCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const Icon = notificationIcons[notification.type]
                  return (
                    <Card
                      key={notification.id}
                      className={`border-l-4 ${notificationColors[notification.priority]} ${
                        !notification.read ? "shadow-md" : ""
                      } hover:shadow-lg transition-shadow cursor-pointer`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <Icon
                              className={`w-5 h-5 ${
                                notification.priority === "high"
                                  ? "text-red-500"
                                  : notification.priority === "medium"
                                    ? "text-orange-500"
                                    : "text-gray-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                                  {notification.title}
                                  {!notification.read && (
                                    <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                                  )}
                                </h3>
                                <p className={`mt-1 text-sm ${!notification.read ? "text-gray-700" : "text-gray-600"}`}>
                                  {notification.message}
                                </p>
                                <p className="mt-2 text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {notification.timestamp}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 text-gray-400 hover:text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === "unread"
                      ? "未読の通知はありません"
                      : activeTab === "overdue"
                        ? "期限関連の通知はありません"
                        : "通知はありません"}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === "unread"
                      ? "すべての通知を確認済みです"
                      : activeTab === "overdue"
                        ? "期限切れや期限が近いアイテムはありません"
                        : "新しい通知が届くとここに表示されます"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
