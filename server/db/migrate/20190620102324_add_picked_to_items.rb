class AddPickedToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :picked, :boolean, default: false
  end
end
