export const shipments = [
  {
    id: 1,
    title: "Santa Fe",
    description: "",
    price: 850,
  },
  {
    id: 2,
    title: "Zona Countrys",
    description: "",
    price: 1250,
  },
  {
    id: 3,
    title: "Colastine Norte",
    description: "",
    price: 400,
  },
  {
    id: 4,
    title: "Santo Tomé",
    description: "",
    price: 850,
  }
]

export function matchShipments(id_to_match: number) {
  return shipments.find((element) => element.id == id_to_match)
} 