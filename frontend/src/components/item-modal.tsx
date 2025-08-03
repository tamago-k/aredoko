"use client"

import { useState } from "react"
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

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  item?: any
  quickMode?: boolean
}

export function ItemModal({ isOpen, onClose, item, quickMode = false }: ItemModalProps) {
  const [activeTab, setActiveTab] = useState("detail")

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
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <Camera className="h-4 w-4 mr-2" />
                  カメラを起動
                </Button>
              </div>
            )}

            <div>
              <Label htmlFor="name">アイテム名 *</Label>
              <Input id="name" placeholder="例: MacBook Pro" />
            </div>

            <div>
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" placeholder="アイテムの詳細説明" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">電子機器</SelectItem>
                    <SelectItem value="books">書籍</SelectItem>
                    <SelectItem value="outdoor">アウトドア</SelectItem>
                    <SelectItem value="tools">工具</SelectItem>
                    <SelectItem value="kitchen">キッチン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">保管場所</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living">リビング</SelectItem>
                    <SelectItem value="kitchen">キッチン</SelectItem>
                    <SelectItem value="bedroom">寝室</SelectItem>
                    <SelectItem value="storage">収納</SelectItem>
                    <SelectItem value="garage">ガレージ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">タグ</Label>
              <Input id="tags" placeholder="例: 仕事, 個人 (カンマ区切り)" />
            </div>

            {!quickMode && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  写真
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <QrCode className="h-4 w-4 mr-2" />
                  QRコード
                </Button>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                キャンセル
              </Button>
              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={onClose}>
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
                {item.tags.map((tag) => (
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
              <Input id="edit-name" defaultValue={item.name} />
            </div>

            <div>
              <Label htmlFor="edit-description">説明</Label>
              <Textarea id="edit-description" defaultValue={item.description} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="edit-category">カテゴリ</Label>
                <Select defaultValue={item.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">電子機器</SelectItem>
                    <SelectItem value="books">書籍</SelectItem>
                    <SelectItem value="outdoor">アウトドア</SelectItem>
                    <SelectItem value="tools">工具</SelectItem>
                    <SelectItem value="kitchen">キッチン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-location">保管場所</Label>
                <Select defaultValue={item.location}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living">リビング</SelectItem>
                    <SelectItem value="kitchen">キッチン</SelectItem>
                    <SelectItem value="bedroom">寝室</SelectItem>
                    <SelectItem value="storage">収納</SelectItem>
                    <SelectItem value="garage">ガレージ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-tags">タグ</Label>
              <Input id="edit-tags" defaultValue={item.tags.join(", ")} />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveTab("detail")}>
                キャンセル
              </Button>
              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">保存</Button>
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
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">返却処理</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="borrower">借用者</Label>
                  <Select>
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
                  <Input id="due-date" type="date" />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">貸出開始</Button>
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
