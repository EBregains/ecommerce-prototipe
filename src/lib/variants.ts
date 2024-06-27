export type Color = {
  id: string,
  name: string,
  colorCode: string,
  price: number
}

export const COLORS: Array<Color> = [
  {
    id: '1',
    name: "Negro",
    colorCode: "bg-black",
    price: 1
  },
  {
    id: '2',
    name: "Blanco",
    colorCode: "bg-white ",
    price: 1
  },
  {
    id: '3',
    name: "Rojo",
    colorCode: "bg-red-600 ",
    price: 1
  },
  {
    id: '4',
    name: "Azul",
    colorCode: "bg-blue-600 ",
    price: 1
  },
  {
    id: '5',
    name: "Amarillo",
    colorCode: "bg-yellow-500 ",
    price: 1
  },
  {
    id: '6',
    name: "Verde",
    colorCode: "bg-green-600 ",
    price: 1
  },
]

export const matchColors = (colors: Array<string>) => {
  return COLORS.filter((element) => (colors.includes(element.id) ?? element))
}

export const MATERIALS = [
  {
    id: '1',
    name: "PLA",
    cost: 1,
  },
  {
    id: '2',
    name: "ASA",
    cost: 1.1,
  },
  {
    id: '3',
    name: "PETG",
    cost: 1.15,
  },
]

export const matchMaterials = (materials: Array<string>) => {
  return MATERIALS.filter((element) => (materials.includes(element.id) ?? element))
}
