class Item < ApplicationRecord
  belongs_to :product
  validates :product, presence: true

  has_many :operators_postes
end
