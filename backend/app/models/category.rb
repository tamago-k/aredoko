class Category < ApplicationRecord
    validates :name, presence: true

    has_many :items

    def item_count
        items.count
    end
end