module Api
  class OperatorsController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      operators = Operator.all
      render json: operators
    end

    def show 
      sleep 1
      operator_postes = Operator.find(params[:id]).operators_postes
      score = operator_postes.length
      op_name = Operator.find(params[:id]).name
      response = { name: op_name, score: score, items: []}
      items = []
      operator_postes.each do |object|
        items.push({
          id: object.id,
          name: Item.find_by_id(object.item_id).product.name,
          poste: Poste.find_by_id(object.poste_id).category
        })
      end
      response[:items] = items
      render json: response
    end

    def destroy
      operator_poste = OperatorsPoste.find_by_id(params[:id])
      operator_poste.delete
    end
  end
end