class ChangeCategoryAndLocationNullOnItems < ActiveRecord::Migration[7.0]
  def change
    change_column_null :items, :category_id, true
    change_column_null :items, :location_id, true
  end
end