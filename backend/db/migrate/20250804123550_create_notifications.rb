class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications, id: :bigint do |t|
      t.references :user, null: false, foreign_key: true, type: :bigint
      t.text :message, null: false
      t.boolean :read, null: false, default: false
      t.datetime :scheduled_at

      t.timestamps
    end
  end
end