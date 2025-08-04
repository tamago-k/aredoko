class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :bigint do |t|
      t.string :name, null: false
      t.string :email
      t.string :password_digest 
      t.string :avatar
      t.string :theme
      t.integer :role, null: false, default: 1

      t.timestamps
    end
  end
end