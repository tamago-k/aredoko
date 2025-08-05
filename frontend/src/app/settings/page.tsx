"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Shield, Download, Trash2, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifications, setNotifications] = useState({
    borrowReminders: true,
    overdueAlerts: true,
    familyUpdates: true,
    emailNotifications: false,
  })

  const [profile, setProfile] = useState({
    name: "田中太郎",
    email: "taro@example.com",
    language: "ja",
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage="settings"
      />
      <div className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}>
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">設定</h1>
            <p className="text-slate-600">アカウントとアプリの設定を管理できます</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  プロフィール
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">太</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="bg-transparent">
                    写真を変更
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">名前</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="language">言語</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-emerald-500 hover:bg-emerald-600">変更を保存</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  通知設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="borrow-reminders">貸出リマインダー</Label>
                    <p className="text-sm text-gray-600">返却期限が近づいたときに通知</p>
                  </div>
                  <Switch
                    id="borrow-reminders"
                    checked={notifications.borrowReminders}
                    onCheckedChange={(checked) => handleNotificationChange("borrowReminders", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="overdue-alerts">延滞アラート</Label>
                    <p className="text-sm text-gray-600">返却期限を過ぎたときに通知</p>
                  </div>
                  <Switch
                    id="overdue-alerts"
                    checked={notifications.overdueAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("overdueAlerts", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="family-updates">家族の更新情報</Label>
                    <p className="text-sm text-gray-600">新しいメンバーやアイテムの追加通知</p>
                  </div>
                  <Switch
                    id="family-updates"
                    checked={notifications.familyUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("familyUpdates", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">メール通知</Label>
                    <p className="text-sm text-gray-600">重要な通知をメールでも受信</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  セキュリティ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>パスワード</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="password" value="••••••••" readOnly className="bg-gray-50" />
                    <Button variant="outline" className="bg-transparent">
                      変更
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>二段階認証</Label>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">アカウントのセキュリティを強化</p>
                    <Button variant="outline" className="bg-transparent">
                      設定
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>ログイン履歴</Label>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">最近のログイン活動を確認</p>
                    <Button variant="outline" className="bg-transparent">
                      表示
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>データ管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>データのエクスポート</Label>
                    <p className="text-sm text-gray-600">すべてのデータをダウンロード</p>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-red-600">アカウント削除</Label>
                    <p className="text-sm text-gray-600">すべてのデータが削除されます</p>
                  </div>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                    <Trash2 className="w-4 h-4 mr-2" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  ログアウト
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
