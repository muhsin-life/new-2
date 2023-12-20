import { Content } from "@/types/page";

export const PersonalizedSlider = ({
  contentData,
}: {
  contentData: Content;
}) => {
  return <div>{contentData.section_title}</div>;
};
