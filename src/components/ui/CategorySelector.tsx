'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryWithParent } from '@/types';

type CategoryNode = CategoryWithParent & { children: CategoryNode[] };

function buildCategoryTree(categories: CategoryWithParent[]): CategoryNode[] {
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  for (const cat of categories) {
    map.set(cat.id, { ...cat, children: [] });
  }

  for (const cat of map.values()) {
    if (cat.parent?.id && map.has(cat.parent.id)) {
      map.get(cat.parent.id)!.children.push(cat);
    } else {
      roots.push(cat);
    }
  }

  return roots;
}

function RecursiveCategoryItem({
  category,
  onSelect,
}: {
  category: CategoryNode;
  onSelect: (id: string) => void;
}) {
  if (category.children.length === 0) {
    return (
      <DropdownMenuItem onClick={() => onSelect(category.id)} className="cursor-pointer">
        {category.name}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="cursor-pointer">{category.name}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {category.children.map((child) => (
          <RecursiveCategoryItem key={child.id} category={child} onSelect={onSelect} />
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

export function CategorySelector(props: {
  categories: CategoryWithParent[] | null;
  onSelect: (categoryId: string) => void;
  selectedCategory: string | null;
}) {
  const { categories, onSelect, selectedCategory } = props;

  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  const categoryTree = buildCategoryTree(categories);

  // نام دسته انتخاب‌شده (برای نمایش دکمه)
  const selectedName = categories.find(cat => cat.id === selectedCategory)?.name || 'Select Category';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedName}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuGroup>
          {categoryTree.map((category) => (
            <RecursiveCategoryItem key={category.id} category={category} onSelect={onSelect} />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { CategoryWithParent } from '@/types';

// export function CategorySelector(props: {
//   categories: CategoryWithParent[] | null;
//   onSelect: (categoryId: string) => void;
//   selectedCategory: string | null;
// }) {
//   const { categories, onSelect, selectedCategory } = props;

//   const parents =
//     categories?.filter((cat) => cat.parent?.id === undefined) || [];
//   const childrenMap = new Map<string, CategoryWithParent[]>();

//   categories?.forEach((cat) => {
//     if (cat.parent?.id) {
//       if (!childrenMap.has(cat.parent?.id)) {
//         childrenMap.set(cat.parent?.id, []);
//       }
//       childrenMap.get(cat.parent?.id)?.push(cat);
//     }
//   });
//   const selectedCategoryName =
//     categories?.find((cat) => cat.id === selectedCategory)?.name ||
//     'Select Category';

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline"> {selectedCategoryName}</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-64" align="start">
//         <DropdownMenuLabel>Select Category</DropdownMenuLabel>
//         <DropdownMenuGroup>
//           {parents.map((parent) => {
//             const children = childrenMap.get(parent.id) || [];
//             if (children.length > 0) {
//               return (
//                 <DropdownMenuSub key={parent.id}>
//                   <DropdownMenuSubTrigger className="cursor-pointer">
//                     {parent.name}
//                   </DropdownMenuSubTrigger>
//                   <DropdownMenuPortal>
//                     <DropdownMenuSubContent>
//                       {children.map((child) => (
//                         <DropdownMenuItem
//                           className="cursor-pointer"
//                           key={child.id}
//                           onClick={() => onSelect(child.id)}
//                         >
//                           {child.name}
//                         </DropdownMenuItem>
//                       ))}
//                     </DropdownMenuSubContent>
//                   </DropdownMenuPortal>
//                 </DropdownMenuSub>
//               );
//             }
//             return (
//               <DropdownMenuItem
//                 key={parent.id}
//                 onClick={() => onSelect(parent.id)}
//                 className="cursor-pointer"
//               >
//                 {parent.name}
//               </DropdownMenuItem>
//             );
//           })}
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
