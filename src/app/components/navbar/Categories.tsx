import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryItem from "./CategoryContainer";


const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'Amazing view to the beach!'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property has windmills!'
  },
]



const Categories = () => {
  return (
    <Container>
      <article className="pt-4 flex flex-row items-center justify-between overflow-x-auto" >
        {
          categories.map(category => (
            <CategoryItem
              key={category.label}
              label={category.label}
              icon={category.icon}
              description={category.description}
            />
          ))
        }
      </article>
    </Container>
  )
}

export default Categories;