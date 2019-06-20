module Api
  class OperatorsController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      @operators = Operator.all
    end

    def show 
      sleep 1
      operator = Operator.find(params[:id])
      step_validated = operator.operators_postes
      score = step_validated.length
      response = { score: score, items: [] }
      items = []
      step_validated.each do |object|
        items.push({
            id: object.id,
            name: Item.find_by_id(object.item_id).product.name,
            poste: Poste.find_by_id(object.poste_id).category
        })
      end
      response[:items] = items
      render json: response
    end
  end
end
