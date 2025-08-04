class CreateBarcodes < ActiveRecord::Migration[7.0]
  def change
    create_table :barcodes, id: :bigint do |t|
      t.references :item, null: false, foreign_key: true, type: :bigint
      t.string :code_type, null: false
      t.string :code_value, null: false

      t.timestamps
    end
    add_index :barcodes, [:code_type, :code_value], unique: true
  end
end