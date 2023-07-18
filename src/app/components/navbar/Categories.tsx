'use client';

import { categories } from "@/app/lib/categoryItemsProvider";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import { usePathname, useSearchParams } from "next/navigation";



const Categories = () => {

  const params = useSearchParams();
  const selectedCategory = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;


  return (
    <Container>
      <article className="pt-4 flex flex-row items-center justify-between overflow-x-auto" >
        {
          categories.map(category => (
            <CategoryItem
              key={category.label}
              label={category.label}
              icon={category.icon}
              selected={category.label === selectedCategory}
            />
          ))
        }
      </article>
    </Container>
  )
}

export default Categories;