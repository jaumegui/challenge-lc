Item.destroy_all
Product.destroy_all
OperatorsPoste.destroy_all
Operator.destroy_all
Poste.destroy_all

Poste.categories.keys.each { |cat| Poste.create!(category: cat) }

Operator.create!([
  { first_name: "Hubert", last_name: "Bonisseur De La Bath" },
  { first_name: "Noël", last_name: "Flantier" },
  { first_name: "Jack", last_name: "Jefferson" },
  { first_name: "Von", last_name: "Zimmel" },
  { first_name: "Larmina", last_name: "Betouche" }
])

Product.create!([
  { name: "Robe rouge" },
  { name: "Robe jaune" },
  { name: "Robe bleue" },
  { name: "Robe verte" }
])

Item.create!([
  { product_id: 1 },
  { product_id: 1 },
  { product_id: 2 }
])

OperatorsPoste.create!([
  { operator_id: 1, poste_id: 1, item_id: 1},
  { operator_id: 1, poste_id: 2, item_id: 1},
  { operator_id: 1, poste_id: 3, item_id: 1},
  { operator_id: 2, poste_id: 3, item_id: 4},
  { operator_id: 2, poste_id: 1, item_id: 3},
  { operator_id: 3, poste_id: 1, item_id: 2},
  { operator_id: 3, poste_id: 2, item_id: 5}
])