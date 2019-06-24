class Api::ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items
  end

  def create
    op = OperatorsPoste.create(item_id: params[:item_id], poste_id: params[:poste_id], operator_id: params[:id])
    render json: op
  end

  def show
    item = Item.find_by_id(params[:id])
    render json: item
  end

  def destroy
    item = Item.find_by_id(params[:id])
    item.destroy
  end

  def checkup
    item = Item.find_by_id(params[:id])
    item.checkup = !item.checkup
    item.save
    render json: item
  end

  def packup
    item = Item.find_by_id(params[:id])
    item.packup = !item.packup
    item.save
    render json: item
  end

  def pickup
    item = Item.find_by_id(params[:id])
    item.pickup = !item.pickup
    item.save
    render json: item
  end
end
