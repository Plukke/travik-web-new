import CategoryDetailComponent from "@/components/CategoryDetailComponent";
import { cookiesClient } from "@/utils/amplify-utils";

const getCategory = async ({ categoryId }) => {
  if (!categoryId) {
    return null;
  }

  const { data: category, errors } = await cookiesClient.models.Category.get({
    id: categoryId,
  });

  if (!errors) {
    return category;
  }
};

export default async function CategoryDetailPage({ params }) {
  const { categoryId } = params || {};

  const categoryDetail = await getCategory({
    categoryId,
  });
  console.log("categoryDetail", categoryDetail);

  // if (!categoryDetail) {
  //     return notFound()
  // }

  return <CategoryDetailComponent />;
}
