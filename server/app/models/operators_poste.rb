class OperatorsPoste < ApplicationRecord
  has_and_belongs_to_many :operators
  belongs_to :poste
  has_one :items
end
