"use client"

import { useState, useEffect } from "react"
import { Camera, QrCode, MapPin, User, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statusColors = {
  available: "bg-emerald-100 text-emerald-800",
  "in-use": "bg-blue-100 text-blue-800",
  borrowed: "bg-orange-100 text-orange-800",
  discarded: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  available: "利用可能",
  "in-use": "使用中",
  borrowed: "貸出中",
  discarded: "廃棄済み",
}

const locationLabels = {
  living: "リビング",
  kitchen: "キッチン",
  bedroom: "寝室",
  storage: "収納",
  garage: "ガレージ",
}

interface Item {
  id?: number
  name: string
  description: string
  image?: string
  status: keyof typeof statusLabels
  category: string
  location: keyof typeof locationLabels
  tags: string[]
  owner: string
  borrower?: string | null
}

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  item?: Item
  quickMode?: boolean
}

export function ItemModal({ isOpen, onClose, item, quickMode = false }: ItemModalProps) {
  const [activeTab, setActiveTab] = useState("detail")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState<keyof typeof locationLabels>("living")
  const [tags, setTags] = useState("")
  const [borrower, setBorrower] = useState("")
  const [dueDate, setDueDate] = useState("")
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    if (item) {
      setName(item.name)
      setDescription(item.description)
      setCategory(item.category)
      setLocation(item.location)
      setTags(item.tags ? item.tags.join(", ") : "")
      setBorrower(item.borrower || "")
      setDueDate("")
      setActiveTab("detail")
    } else {
      // 新規モード時は空に
      setName("")
      setDescription("")
      setCategory("")
      setLocation("living")
      setTags("")
      setBorrower("")
      setDueDate("")
      setActiveTab("detail")
    }
  }, [item, isOpen])

  const handleSave = async () => {
    if (!name.trim()) {
      alert("アイテム名は必須です")
      return
    }

    const payload = {
      name,
      description,
      category,
      location,
      tags: tagList,
    }
    const token = localStorage.getItem("token")
    try {
      if (item && item.id) {
        // 更新(編集)
        const res = await fetch(`${apiBaseUrl}/api/items/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("更新に失敗しました")
      } else {
        // 新規登録
        const res = await fetch(`${apiBaseUrl}/api/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("登録に失敗しました")
      }

      onClose()
    } catch (e) {
      alert(e instanceof Error ? e.message : "通信エラー")
    }
  }

  const handleLend = () => {
    // console.log("貸出開始", { borrower, dueDate })
    onClose()
  }

  const handleReturn = () => {
    // console.log("返却処理")
    onClose()
  }

  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean)

  // 新規登録モード
  if (!item) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{quickMode ? "写真でかんたん登録" : "新しいアイテムを追加"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {quickMode && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">写真を撮影してアイテムを登録</p>
                <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => alert("カメラ起動などの処理を実装してください")}>
                  <Camera className="h-4 w-4 mr-2" />
                  カメラを起動
                </Button>
              </div>
            )}

            <div>
              <Label htmlFor="name">アイテム名 *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="例: MacBook Pro" />
            </div>

            <div>
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="アイテムの詳細説明" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">電子機器</SelectItem>
                    <SelectItem value="2">書籍</SelectItem>
                    <SelectItem value="3">アウトドア</SelectItem>
                    <SelectItem value="4">工具</SelectItem>
                    <SelectItem value="5">キッチン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">保管場所</Label>
                <Select value={location} onValueChange={(v) => setLocation(v as keyof typeof locationLabels)}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">リビング</SelectItem>
                    <SelectItem value="2">キッチン</SelectItem>
                    <SelectItem value="3">寝室</SelectItem>
                    <SelectItem value="4">収納</SelectItem>
                    <SelectItem value="5">ガレージ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">タグ</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="例: 仕事, 個人 (カンマ区切り)" />
            </div>

            {!quickMode && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => alert("写真アップロード処理を実装してください")}>
                  <Camera className="h-4 w-4 mr-2" />
                  写真
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => alert("QRコード読み取り処理を実装してください")}>
                  <QrCode className="h-4 w-4 mr-2" />
                  QRコード
                </Button>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                キャンセル
              </Button>
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => {
                  if (!name.trim()) {
                    alert("アイテム名は必須です")
                    return
                  }
                  handleSave()
                }}
              >
                登録
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // アイテム詳細・編集モード
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detail">詳細</TabsTrigger>
            <TabsTrigger value="edit">編集</TabsTrigger>
            <TabsTrigger value="borrow">貸出管理</TabsTrigger>
          </TabsList>

          {/* 詳細タブ */}
          <TabsContent value="detail" className="space-y-4">
            <div className="flex justify-center">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-48 h-48 rounded-lg object-cover bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">状態</h4>
                <Badge className={statusColors[item.status]}>{statusLabels[item.status]}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">保管場所</h4>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {locationLabels[item.location]}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">説明</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">所有者</h4>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {item.owner}
                </div>
              </div>
              {item.borrower && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">現在の借用者</h4>
                  <div className="flex items-center text-orange-600">
                    <User className="h-4 w-4 mr-1" />
                    {item.borrower}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">タグ</h4>
              <div className="flex flex-wrap gap-1">
                {item.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 編集タブ */}
          <TabsContent value="edit" className="space-y-4">
            <div>
              <Label htmlFor="edit-name">アイテム名</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="edit-description">説明</Label>
              <Textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="edit-category">カテゴリ</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">電子機器</SelectItem>
                    <SelectItem value="2">書籍</SelectItem>
                    <SelectItem value="3">アウトドア</SelectItem>
                    <SelectItem value="4">工具</SelectItem>
                    <SelectItem value="5">キッチン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-location">保管場所</Label>
                <Select value={location} onValueChange={(v) => setLocation(v as keyof typeof locationLabels)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">リビング</SelectItem>
                    <SelectItem value="2">キッチン</SelectItem>
                    <SelectItem value="3">寝室</SelectItem>
                    <SelectItem value="4">収納</SelectItem>
                    <SelectItem value="5">ガレージ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-tags">タグ</Label>
              <Input id="edit-tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveTab("detail")}>
                キャンセル
              </Button>
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => {
                  if (!name.trim()) {
                    alert("アイテム名は必須です")
                    return
                  }
                  handleSave()
                }}
              >
                保存
              </Button>
            </div>
          </TabsContent>

          {/* 貸出管理タブ */}
          <TabsContent value="borrow" className="space-y-4">
            <div className="text-center">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover bg-gray-100 mx-auto mb-2"
              />
              <Badge className={statusColors[item.status]}>{statusLabels[item.status]}</Badge>
            </div>

            {item.status === "borrowed" ? (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">現在の借用者</span>
                  </div>
                  <p className="text-orange-700">{item.borrower}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
                    <Calendar className="h-4 w-4" />
                    <span>貸出日: 2024-02-10</span>
                  </div>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600" onClick={handleReturn}>
                  返却処理
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="borrower">借用者</Label>
                  <Select value={borrower} onValueChange={setBorrower}>
                    <SelectTrigger>
                      <SelectValue placeholder="借用者を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="田中太郎">田中太郎</SelectItem>
                      <SelectItem value="田中花子">田中花子</SelectItem>
                      <SelectItem value="田中次郎">田中次郎</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="due-date">返却予定日</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    if (!borrower) {
                      alert("借用者を選択してください")
                      return
                    }
                    handleLend()
                  }}
                >
                  貸出開始
                </Button>
              </div>
            )}

            <Separator />

            <div>
              <h4 className="font-medium text-gray-900 mb-3">貸出履歴</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">田中花子</span>
                  </div>
                  <span className="text-gray-500">2024-01-15 - 2024-01-20</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-orange-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-700">田中次郎</span>
                  </div>
                  <span className="text-orange-500">2024-02-01 - 貸出中</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
