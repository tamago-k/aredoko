class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items, id: :bigint do |t|
      t.string :name, null: false
      t.text :description
      t.references :category, null: false, foreign_key: true, type: :bigint
      t.references :location, null: false, foreign_key: true, type: :bigint
      t.references :owned_by_user, foreign_key: { to_table: :users }, type: :bigint
      t.integer :status, null: false, default: 0
      t.references :borrowed_by_user, foreign_key: { to_table: :users }, type: :bigint
      t.datetime :borrowed_at
      t.datetime :due_at
      t.datetime :discarded_at

      t.timestamps
    end
  end
end