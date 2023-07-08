import { IconType } from "react-icons";

interface CategoryItemProps {
    label: string;
    description: string;
    icon: IconType;
    selected?: boolean
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon: Icon, label, selected }) => {
    return (
        <article className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`} >
            <Icon size={26} />
            <span className="font-medium text-sm" >{label}</span>
        </article>
    )
}

export default CategoryItem;