"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Package, Clock, CheckCircle, AlertCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const mockBorrowHistory = [
  {
    id: 1,
    itemName: "MacBook Pro",
    itemImage: "/placeholder.svg?height=60&width=60",
    borrower: "田中次郎",
    owner: "田中太郎",
    startDate: "2024-02-01",
    dueDate: "2024-02-15",
    returnDate: null,
    status: "active",
    overdue: true,
  },
  {
    id: 2,
    itemName: "キャンプテント",
    itemImage: "/placeholder.svg?height=60&width=60",
    borrower: "田中次郎",
    owner: "田中花子",
    startDate: "2024-01-20",
    dueDate: "2024-01-25",
    returnDate: "2024-01-24",
    status: "returned",
    overdue: false,
  },
  {
    id: 3,
    itemName: "料理本セット",
    itemImage: "/placeholder.svg?height=60&width=60",
    borrower: "田中花子",
    owner: "共有",
    startDate: "2024-01-15",
    dueDate: "2024-01-30",
    returnDate: "2024-01-28",
    status: "returned",
    overdue: false,
  },
  {
    id: 4,
    itemName: "電動ドリル",
    itemImage: "/placeholder.svg?height=60&width=60",
    borrower: "田中太郎",
    owner: "共有",
    startDate: "2024-02-05",
    dueDate: "2024-02-12",
    returnDate: null,
    status: "active",
    overdue: false,
  },
]

const statusColors = {
  active: "bg-blue-100 text-blue-800",
  returned: "bg-emerald-100 text-emerald-800",
  overdue: "bg-red-100 text-red-800",
}

const statusLabels = {
  active: "貸出中",
  returned: "返却済み",
  overdue: "延滞中",
}

export default function BorrowHistoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredHistory = mockBorrowHistory.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchQuery.toLowerCase())

    const itemStatus = item.overdue ? "overdue" : item.status
    const matchesStatus = statusFilter === "all" || itemStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const activeCount = mockBorrowHistory.filter((item) => item.status === "active").length
  const overdueCount = mockBorrowHistory.filter((item) => item.overdue).length

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={cn("transition-all duration-300", "lg:pl-16", !sidebarCollapsed && "lg:pl-64")}>
        <Header sidebarCollapsed={sidebarCollapsed} onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">貸出履歴</h1>
            <p className="text-slate-600">アイテムの貸出状況と履歴を確認できます</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{activeCount}</div>
                <div className="text-sm text-gray-600">現在貸出中</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
                <div className="text-sm text-gray-600">延滞中</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {mockBorrowHistory.filter((item) => item.status === "returned").length}
                </div>
                <div className="text-sm text-gray-600">返却済み</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="アイテム名や借用者で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="active">貸出中</SelectItem>
                  <SelectItem value="overdue">延滞中</SelectItem>
                  <SelectItem value="returned">返却済み</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.map((item) => {
              const itemStatus = item.overdue ? "overdue" : item.status
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <img
                        src={item.itemImage || "/placeholder.svg"}
                        alt={item.itemName}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100 mx-auto sm:mx-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 text-center sm:text-left">{item.itemName}</h3>
                            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-600 mt-1">
                              <User className="w-4 h-4 mr-1" />
                              <span>{item.borrower}</span>
                              <span className="mx-2">←</span>
                              <span>{item.owner}</span>
                            </div>
                          </div>
                          <Badge className={`${statusColors[itemStatus]} mt-2 sm:mt-0 mx-auto sm:mx-0`}>
                            {item.overdue ? "延滞中" : statusLabels[item.status]}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center sm:justify-start">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>貸出: {item.startDate}</span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>期限: {item.dueDate}</span>
                          </div>
                          {item.returnDate ? (
                            <div className="flex items-center justify-center sm:justify-start">
                              <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
                              <span>返却: {item.returnDate}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center sm:justify-start">
                              {item.overdue ? (
                                <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                              ) : (
                                <Package className="w-4 h-4 mr-1 text-blue-500" />
                              )}
                              <span>{item.overdue ? "延滞中" : "貸出中"}</span>
                            </div>
                          )}
                        </div>

                        {item.status === "active" && (
                          <div className="mt-3 text-center sm:text-left">
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                              返却処理
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">履歴が見つかりません</h3>
              <p className="text-gray-600">検索条件を変更してお試しください</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
