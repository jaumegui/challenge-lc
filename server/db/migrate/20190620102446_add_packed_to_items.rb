class AddPackedToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :packed, :boolean, default: false
  end
end
