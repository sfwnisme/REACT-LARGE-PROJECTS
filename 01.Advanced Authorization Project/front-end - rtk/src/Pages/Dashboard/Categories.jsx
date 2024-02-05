import TableShow from "../../Components/TableShow.jsx";
import { categoriesSelector, deleteCategory, deleteCategorySelector, getCategories } from "../../rtk/features/categories/categoriesSlice.jsx";

const Categories = () => {
    //:::
    let header = [
        {
            key: 'id',
            name: 'id'
        },
        {
            key: 'title',
            name: 'title'
        },
        {
            key: 'image',
            name: 'image'
        }
    ]
    //:::

    return (
        <div>
            <TableShow
                header={header}
                DISPATCHER={getCategories}
                SELECTOR={categoriesSelector}
                DELETEACTION={deleteCategory}
                DELETESELECTOR={deleteCategorySelector}
                title='Categories'
                addTitle='Add Category'
                addLink='/dashboard/category/add'
            />
        </div>
    )
}

export default Categories