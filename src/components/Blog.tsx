import { Content } from "@/types/page";

export const Blog = ({
  contentData,
}: {
  contentData: Content;
}) => {
  return <div>{contentData.section_title}</div>;
};
