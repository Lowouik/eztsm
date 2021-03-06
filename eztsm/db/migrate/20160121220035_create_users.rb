class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :login, null: false
      t.text :description
      t.string :email
      t.boolean :is_admin

      t.timestamps null: false
    end
  end
end
