class AddItemIdToOperatorsPostes < ActiveRecord::Migration[5.2]
  def change
    add_reference :operators_postes, :item, foreign_key: true
  end
end
