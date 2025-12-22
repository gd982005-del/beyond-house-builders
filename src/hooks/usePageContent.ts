import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PageContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_json: any;
}

export function usePageContent(page: string) {
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["page_content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page", page);
      if (error) throw error;
      return data as PageContentItem[];
    },
  });

  const getContentValue = (section: string, key: string, defaultValue: string = ""): string => {
    const item = content?.find(c => c.section === section && c.content_key === key);
    return item?.content_value || defaultValue;
  };

  const getContentJson = <T>(section: string, key: string, defaultValue: T): T => {
    const item = content?.find(c => c.section === section && c.content_key === key);
    return (item?.content_json as T) || defaultValue;
  };

  return {
    content: content ?? [],
    isLoading,
    error,
    getContentValue,
    getContentJson,
  };
}
