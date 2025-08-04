class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags, id: :bigint do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end