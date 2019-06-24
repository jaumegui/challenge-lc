class Api::OperatorsController < ApplicationController
  def index
    sleep 1 # Simulate loading time
    operators = Operator.all
    render json: operators
  end

  def show 
    sleep 1
    name = Operator.find_by_id(params[:id])
    items = []
    operator_postes = OperatorsPoste.where("operator_id = #{params[:id]}")
    operator_postes.each do |object|
      items.push({
        id: object.id,
        product_id: object.item_id, 
        name: Product.find_by_id(object.item_id).name,
        poste: Poste.find_by_id(object.poste_id).category,
        status: Item.all.select("#{Poste.find_by_id(object.poste_id).category}").where("id = #{object.item_id}")
      })
    end

    items.each do |item|
      key = item[:poste]
      p key
      item[key] = item[:status][0][key.to_sym]
      item.delete(:status)
    end
    render json: items
  end

  def destroy
    operator_poste = OperatorsPoste.find_by_id(params[:id])
    operator_poste.delete
  end
end
