# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_04_135400) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "barcodes", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.string "code_type", null: false
    t.string "code_value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_type", "code_value"], name: "index_barcodes_on_code_type_and_code_value", unique: true
    t.index ["item_id"], name: "index_barcodes_on_item_id"
  end

  create_table "borrow_histories", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "user_id", null: false
    t.datetime "borrowed_at", null: false
    t.datetime "due_at"
    t.datetime "returned_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_borrow_histories_on_item_id"
    t.index ["user_id"], name: "index_borrow_histories_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "item_tags", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id", "tag_id"], name: "index_item_tags_on_item_id_and_tag_id", unique: true
    t.index ["item_id"], name: "index_item_tags_on_item_id"
    t.index ["tag_id"], name: "index_item_tags_on_tag_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "category_id", null: false
    t.bigint "location_id", null: false
    t.bigint "owned_by_user_id"
    t.integer "status", default: 0, null: false
    t.bigint "borrowed_by_user_id"
    t.datetime "borrowed_at"
    t.datetime "due_at"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrowed_by_user_id"], name: "index_items_on_borrowed_by_user_id"
    t.index ["category_id"], name: "index_items_on_category_id"
    t.index ["location_id"], name: "index_items_on_location_id"
    t.index ["owned_by_user_id"], name: "index_items_on_owned_by_user_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "message", null: false
    t.boolean "read", default: false, null: false
    t.datetime "scheduled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest"
    t.string "avatar"
    t.string "theme"
    t.integer "role", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
  end

  add_foreign_key "barcodes", "items"
  add_foreign_key "borrow_histories", "items"
  add_foreign_key "borrow_histories", "users"
  add_foreign_key "item_tags", "items"
  add_foreign_key "item_tags", "tags"
  add_foreign_key "items", "categories"
  add_foreign_key "items", "locations"
  add_foreign_key "items", "users", column: "borrowed_by_user_id"
  add_foreign_key "items", "users", column: "owned_by_user_id"
  add_foreign_key "notifications", "users"
end
