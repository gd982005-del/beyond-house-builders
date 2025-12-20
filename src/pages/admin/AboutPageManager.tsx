import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface PageContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_json: any;
}

interface ValueItem {
  title: string;
  description: string;
}

export default function AboutPageManager() {
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["page_content", "about"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page", "about");
      if (error) throw error;
      return data as PageContentItem[];
    },
  });

  const getContentValue = (section: string, key: string): string => {
    const item = content?.find(c => c.section === section && c.content_key === key);
    return item?.content_value || "";
  };

  const getContentJson = (section: string, key: string): any => {
    const item = content?.find(c => c.section === section && c.content_key === key);
    return item?.content_json || null;
  };

  const [heroHeading, setHeroHeading] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [storyHeading, setStoryHeading] = useState("");
  const [storyParagraph1, setStoryParagraph1] = useState("");
  const [storyParagraph2, setStoryParagraph2] = useState("");
  const [storyParagraph3, setStoryParagraph3] = useState("");
  const [missionText, setMissionText] = useState("");
  const [visionText, setVisionText] = useState("");
  const [values, setValues] = useState<ValueItem[]>([]);

  useEffect(() => {
    if (content) {
      setHeroHeading(getContentValue("hero", "heading") || "Crafting Beautiful Spaces Since Day One");
      setHeroDescription(getContentValue("hero", "description") || "");
      setStoryHeading(getContentValue("story", "heading") || "Building Dreams, One Space at a Time");
      setStoryParagraph1(getContentValue("story", "paragraph1") || "");
      setStoryParagraph2(getContentValue("story", "paragraph2") || "");
      setStoryParagraph3(getContentValue("story", "paragraph3") || "");
      setMissionText(getContentValue("mission", "text") || "");
      setVisionText(getContentValue("vision", "text") || "");
      
      const valuesData = getContentJson("values", "items");
      if (valuesData) {
        setValues(valuesData);
      }
    }
  }, [content]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const items: { page: string; section: string; content_key: string; content_value?: string | null; content_json?: Json | null }[] = [
        { page: "about", section: "hero", content_key: "heading", content_value: heroHeading },
        { page: "about", section: "hero", content_key: "description", content_value: heroDescription },
        { page: "about", section: "story", content_key: "heading", content_value: storyHeading },
        { page: "about", section: "story", content_key: "paragraph1", content_value: storyParagraph1 },
        { page: "about", section: "story", content_key: "paragraph2", content_value: storyParagraph2 },
        { page: "about", section: "story", content_key: "paragraph3", content_value: storyParagraph3 },
        { page: "about", section: "mission", content_key: "text", content_value: missionText },
        { page: "about", section: "vision", content_key: "text", content_value: visionText },
        { page: "about", section: "values", content_key: "items", content_json: JSON.parse(JSON.stringify(values)) },
      ];

      for (const item of items) {
        const existing = content?.find(
          c => c.section === item.section && c.content_key === item.content_key
        );

        if (existing) {
          const { error } = await supabase
            .from("page_content")
            .update({
              content_value: item.content_value || null,
              content_json: item.content_json || null,
            })
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("page_content")
            .insert({
              page: item.page,
              section: item.section,
              content_key: item.content_key,
              content_value: item.content_value || null,
              content_json: item.content_json || null,
            });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_content", "about"] });
      toast.success("About page content saved!");
    },
    onError: (error) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  const addValue = () => {
    setValues([...values, { title: "", description: "" }]);
  };

  const updateValue = (index: number, field: keyof ValueItem, value: string) => {
    const updated = [...values];
    updated[index][field] = value;
    setValues(updated);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">About Page Manager</h1>
            <p className="text-muted-foreground">Edit content displayed on the about page</p>
          </div>
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Heading</Label>
              <Input
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                placeholder="Crafting Beautiful Spaces Since Day One"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                placeholder="Company introduction text..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Story Section */}
        <Card>
          <CardHeader>
            <CardTitle>Our Story Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Heading</Label>
              <Input
                value={storyHeading}
                onChange={(e) => setStoryHeading(e.target.value)}
                placeholder="Building Dreams, One Space at a Time"
              />
            </div>
            <div>
              <Label>Paragraph 1</Label>
              <Textarea
                value={storyParagraph1}
                onChange={(e) => setStoryParagraph1(e.target.value)}
                placeholder="First paragraph of story..."
              />
            </div>
            <div>
              <Label>Paragraph 2</Label>
              <Textarea
                value={storyParagraph2}
                onChange={(e) => setStoryParagraph2(e.target.value)}
                placeholder="Second paragraph..."
              />
            </div>
            <div>
              <Label>Paragraph 3</Label>
              <Textarea
                value={storyParagraph3}
                onChange={(e) => setStoryParagraph3(e.target.value)}
                placeholder="Third paragraph..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <Card>
          <CardHeader>
            <CardTitle>Mission & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mission Statement</Label>
              <Textarea
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
                placeholder="Our mission statement..."
              />
            </div>
            <div>
              <Label>Vision Statement</Label>
              <Textarea
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                placeholder="Our vision statement..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Core Values</CardTitle>
            <Button variant="outline" size="sm" onClick={addValue}>
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input
                    value={value.title}
                    onChange={(e) => updateValue(index, "title", e.target.value)}
                    placeholder="Value title (e.g., Excellence)"
                  />
                  <Textarea
                    value={value.description}
                    onChange={(e) => updateValue(index, "description", e.target.value)}
                    placeholder="Value description"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeValue(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            {values.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No custom values. Default values will be used.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
