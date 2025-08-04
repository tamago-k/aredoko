class CreateItemTags < ActiveRecord::Migration[7.0]
  def change
    create_table :item_tags, id: :bigint do |t|
      t.references :item, null: false, foreign_key: true, type: :bigint
      t.references :tag, null: false, foreign_key: true, type: :bigint

      t.timestamps
    end
    add_index :item_tags, [:item_id, :tag_id], unique: true
  end
end