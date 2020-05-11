export const getCleanCategories = (categories) => categories.map((category) => ({
    id: category.id,
    name: category.name,
    imageId: category.imageId,
    children: getCleanCategories(category.children || []),
}));
