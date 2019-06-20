class Poste < ApplicationRecord
  has_many :operators_postes, dependent: :destroy
  has_many :operators, through: :operators_postes

  enum category: %i(pickup checkup packup)
end
