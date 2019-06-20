module Api
  class PostesController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      postes = Poste.all
      render json: postes
    end

    def show
      sleep 1
      poste = OperatorsPoste.where(poste_id: Poste.find_by_id(params[:id]).id)
      postes = []
      poste.each do |x|
        postes.push({
          id: x.id,
          item: Item.find_by_id(x.item_id).product.name,
          category: Poste.find_by_id(x.poste.id).category,
          status: Item.find_by_id(x.item_id),
          operator: Operator.find_by_id(x.operator_id).name,
          date: OperatorsPoste.find_by_id(x.id).created_at.strftime("%A %e of %B at %I:%M%p") 
        })
      end
      render json: postes
    end

    def status
      sleep 1
      poste = OperatorsPoste.find_by(item_id: Item.find_by(params[:item]).id)
      item = Item.find_by_id(params[:id])
      response = { op: poste, item: item }
      render json: response
    end
  end
end