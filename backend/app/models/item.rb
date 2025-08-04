class Item < ApplicationRecord
  belongs_to :owned_by_user, class_name: "User"
  belongs_to :borrowed_by_user, class_name: "User", optional: true

  belongs_to :category, optional: true
  belongs_to :location, optional: true
end
