class User < ApplicationRecord
  has_secure_password
  enum :role, [:parent, :child]
  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 6 }, if: :password_digest_changed?
end