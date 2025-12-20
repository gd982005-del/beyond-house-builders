import { useState } from "react";
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

interface DirectorContent {
  name: string;
  role: string;
  description1: string;
  description2: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

export default function HomePageManager() {
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["page_content", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page", "home");
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
  const [heroTagline, setHeroTagline] = useState("");
  const [heroCtaLabel, setHeroCtaLabel] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");
  const [directorContent, setDirectorContent] = useState<DirectorContent>({
    name: "Dancan Odhiambo",
    role: "Founder & Director",
    description1: "",
    description2: "",
  });
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [ctaHeading, setCtaHeading] = useState("");
  const [ctaText, setCtaText] = useState("");

  // Load content when data arrives
  useState(() => {
    if (content) {
      setHeroHeading(getContentValue("hero", "heading") || "Beyond House Interior Construction");
      setHeroTagline(getContentValue("hero", "tagline") || "Transforming Your Space Beyond Imagination");
      setHeroCtaLabel(getContentValue("hero", "cta_label") || "View Services");
      setHeroCtaLink(getContentValue("hero", "cta_link") || "/services");
      
      const directorData = getContentJson("director", "content");
      if (directorData) {
        setDirectorContent(directorData);
      }
      
      const featuresData = getContentJson("features", "items");
      if (featuresData) {
        setFeatures(featuresData);
      }
      
      setCtaHeading(getContentValue("cta", "heading") || "Ready to Transform Your Space?");
      setCtaText(getContentValue("cta", "text") || "Let's discuss your project and bring your vision to life.");
    }
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const items: { page: string; section: string; content_key: string; content_value?: string | null; content_json?: Json | null }[] = [
        { page: "home", section: "hero", content_key: "heading", content_value: heroHeading },
        { page: "home", section: "hero", content_key: "tagline", content_value: heroTagline },
        { page: "home", section: "hero", content_key: "cta_label", content_value: heroCtaLabel },
        { page: "home", section: "hero", content_key: "cta_link", content_value: heroCtaLink },
        { page: "home", section: "director", content_key: "content", content_json: JSON.parse(JSON.stringify(directorContent)) },
        { page: "home", section: "features", content_key: "items", content_json: JSON.parse(JSON.stringify(features)) },
        { page: "home", section: "cta", content_key: "heading", content_value: ctaHeading },
        { page: "home", section: "cta", content_key: "text", content_value: ctaText },
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
      queryClient.invalidateQueries({ queryKey: ["page_content", "home"] });
      toast.success("Home page content saved!");
    },
    onError: (error) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "" }]);
  };

  const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
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
            <h1 className="text-2xl font-bold">Home Page Manager</h1>
            <p className="text-muted-foreground">Edit content displayed on the home page</p>
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
                placeholder="Beyond House Interior Construction"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={heroTagline}
                onChange={(e) => setHeroTagline(e.target.value)}
                placeholder="Transforming Your Space Beyond Imagination"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CTA Button Label</Label>
                <Input
                  value={heroCtaLabel}
                  onChange={(e) => setHeroCtaLabel(e.target.value)}
                  placeholder="View Services"
                />
              </div>
              <div>
                <Label>CTA Button Link</Label>
                <Input
                  value={heroCtaLink}
                  onChange={(e) => setHeroCtaLink(e.target.value)}
                  placeholder="/services"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Director Section */}
        <Card>
          <CardHeader>
            <CardTitle>Director Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={directorContent.name}
                  onChange={(e) => setDirectorContent({ ...directorContent, name: e.target.value })}
                  placeholder="Dancan Odhiambo"
                />
              </div>
              <div>
                <Label>Role / Title</Label>
                <Input
                  value={directorContent.role}
                  onChange={(e) => setDirectorContent({ ...directorContent, role: e.target.value })}
                  placeholder="Founder & Director"
                />
              </div>
            </div>
            <div>
              <Label>Description (Paragraph 1)</Label>
              <Textarea
                value={directorContent.description1}
                onChange={(e) => setDirectorContent({ ...directorContent, description1: e.target.value })}
                placeholder="First paragraph about the director..."
              />
            </div>
            <div>
              <Label>Description (Paragraph 2)</Label>
              <Textarea
                value={directorContent.description2}
                onChange={(e) => setDirectorContent({ ...directorContent, description2: e.target.value })}
                placeholder="Second paragraph about achievements..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us Features */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Why Choose Us Features</CardTitle>
            <Button variant="outline" size="sm" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    placeholder="Feature title"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    placeholder="Feature description"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            {features.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No custom features. Default features will be used.
              </p>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Heading</Label>
              <Input
                value={ctaHeading}
                onChange={(e) => setCtaHeading(e.target.value)}
                placeholder="Ready to Transform Your Space?"
              />
            </div>
            <div>
              <Label>Text</Label>
              <Textarea
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Let's discuss your project..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
