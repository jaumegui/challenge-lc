require 'rails_helper'

RSpec.describe Item, type: :model do
  before do 
    @product = Product.create(name: "robe rouge")
    @item = Item.create(product_id: @product.id)
    @operator = Operator.create(first_name: "Guillaume", last_name: "Ecollan")
    @poste1 = Poste.create(category: "pickup")
    @poste2 = Poste.create(category: "packup")
    @operators_poste = OperatorsPoste.create(operator_id: @operator.id, poste_id: @poste1.id, item_id: @item.id)
    @operators_poste = OperatorsPoste.create(operator_id: @operator.id, poste_id: @poste2.id, item_id: @item.id)
  end

  it "has a valid product" do 
    item = Item.create(product_id: nil)
    expect(item).not_to be_valid
  end

  it 'can have many op' do
    expect(@item.operators_postes.size).not_to eq 0
  end
end
