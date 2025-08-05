"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserPlus, Copy, Check, Crown, Shield, User, MoreVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const mockFamilyMembers = [
  {
    id: 1,
    name: "田中太郎",
    email: "taro@example.com",
    role: "admin",
    joinDate: "2024-01-01",
    lastActive: "2024-02-16",
    itemCount: 8,
    avatar: "太",
  },
  {
    id: 2,
    name: "田中花子",
    email: "hanako@example.com",
    role: "member",
    joinDate: "2024-01-01",
    lastActive: "2024-02-15",
    itemCount: 12,
    avatar: "花",
  },
  {
    id: 3,
    name: "田中次郎",
    email: "jiro@example.com",
    role: "member",
    joinDate: "2024-01-15",
    lastActive: "2024-02-14",
    itemCount: 3,
    avatar: "次",
  },
  {
    id: 4,
    name: "田中三郎",
    email: "saburo@example.com",
    role: "guest",
    joinDate: "2024-02-12",
    lastActive: "2024-02-13",
    itemCount: 0,
    avatar: "三",
  },
]

const roleLabels = {
  admin: "管理者",
  member: "メンバー",
  guest: "ゲスト",
}

const roleColors = {
  admin: "bg-red-100 text-red-800",
  member: "bg-blue-100 text-blue-800",
  guest: "bg-gray-100 text-gray-800",
}

const roleIcons = {
  admin: Crown,
  member: Shield,
  guest: User,
}

export default function FamilyPage() {
  const [inviteCode] = useState("TANAKA2024")
  const [copied, setCopied] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      // 招待処理
      setInviteEmail("")
      setInviteRole("member")
      setIsInviteOpen(false)
    }
  }

  const currentUser = mockFamilyMembers[0] // 現在のユーザーは管理者と仮定

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage="family"
      />
      <div className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}>
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">家族設定</h1>
            <p className="text-slate-600">家族メンバーの管理と招待ができます</p>
          </div>

          {/* Family Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                田中家
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockFamilyMembers.length}</div>
                  <div className="text-sm text-gray-600">メンバー数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {mockFamilyMembers.reduce((sum, member) => sum + member.itemCount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">総アイテム数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2024-01-01</div>
                  <div className="text-sm text-gray-600">作成日</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invite Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>家族を招待</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>招待コード</Label>
                <div className="flex gap-2">
                  <Input value={inviteCode} readOnly className="font-mono bg-gray-50" />
                  <Button variant="outline" onClick={copyInviteCode} className="bg-transparent">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">このコードを家族に共有してください</p>
              </div>

              <div className="flex gap-2">
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <UserPlus className="w-4 h-4 mr-2" />
                      メールで招待
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>メールで招待</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="invite-email">メールアドレス</Label>
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="example@email.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="invite-role">権限</Label>
                        <Select value={inviteRole} onValueChange={setInviteRole}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">メンバー</SelectItem>
                            <SelectItem value="guest">ゲスト</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setIsInviteOpen(false)}
                        >
                          キャンセル
                        </Button>
                        <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={handleInvite}>
                          招待送信
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle>メンバー一覧</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFamilyMembers.map((member) => {
                  const RoleIcon = roleIcons[member.role]
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{member.name}</h3>
                            {member.id === currentUser.id && (
                              <Badge variant="outline" className="text-xs">
                                あなた
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>参加日: {member.joinDate}</span>
                            <span>最終ログイン: {member.lastActive}</span>
                            <span>アイテム: {member.itemCount}個</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={`${roleColors[member.role]} flex items-center gap-1`}>
                          <RoleIcon className="w-3 h-3" />
                          {roleLabels[member.role]}
                        </Badge>

                        {currentUser.role === "admin" && member.id !== currentUser.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>権限を変更</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                メンバーを削除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
