class AddCheckupToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :checkup, :boolean, default: false
  end
end
