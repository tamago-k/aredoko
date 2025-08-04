class CreateBorrowHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :borrow_histories, id: :bigint do |t|
      t.references :item, null: false, foreign_key: true, type: :bigint
      t.references :user, null: false, foreign_key: true, type: :bigint
      t.datetime :borrowed_at, null: false
      t.datetime :due_at
      t.datetime :returned_at

      t.timestamps
    end
  end
end