class Tag < ApplicationRecord
  has_many :item_tags
  has_many :items, through: :item_tags

  def item_count
    items.count
  end
end