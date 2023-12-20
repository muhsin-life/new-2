export default async function getPageData(locale: string, pageType: PageType) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/cms/page/${pageType}?lang=${locale}`
  );

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
