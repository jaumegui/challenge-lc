class Api::ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items
  end

  def show
    item = Item.find_by_id(params[:id])
    render json: item
  end

  def destroy
    item = Item.find_by_id(params[:id])
    item.destroy
    index
  end

  def check
    item = Item.find_by_id(params[:id])
    item.checked = true
    item.save
    render json: item
  end

  def pack
    item = Item.find_by_id(params[:id])
    item.packed = true
    item.save
    render json: item
  end

  def pick
    item = Item.find_by_id(params[:id])
    item.picked = true
    item.save
    render json: item
  end
end
