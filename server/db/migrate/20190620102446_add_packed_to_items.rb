class AddPackupToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :packup, :boolean, default: false
  end
end
