class AddPickupToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :pickup, :boolean, default: false
  end
end
