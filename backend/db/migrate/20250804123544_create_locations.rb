class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations, id: :bigint do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end