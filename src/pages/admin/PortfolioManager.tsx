import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Save, ImageIcon } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Portfolio = Database['public']['Tables']['portfolio']['Row'];

const categories = ['Ceiling', 'Cabinetry', 'Walls', 'Flooring', 'Kitchen', 'Bedroom', 'Living Room'];

export default function PortfolioManager() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [selectedItem, setSelectedItem] = useState<Partial<Portfolio> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditor = (item?: Portfolio) => {
    if (item) {
      setSelectedItem(item);
      setIsCreating(false);
    } else {
      setSelectedItem({
        title: '',
        category: '',
        image_url: '',
        hover_caption: '',
        is_visible: true,
        is_before_after: false,
        display_order: portfolio.length,
      });
      setIsCreating(true);
    }
  };

  const saveItem = async () => {
    if (!selectedItem || !selectedItem.image_url) {
      toast({
        title: 'Error',
        description: 'Image is required',
        variant: 'destructive',
      });
      return;
    }
    setIsSaving(true);

    try {
      if (isCreating) {
        const { data, error } = await supabase
          .from('portfolio')
          .insert({
            title: selectedItem.title,
            category: selectedItem.category,
            image_url: selectedItem.image_url,
            hover_caption: selectedItem.hover_caption,
            is_visible: selectedItem.is_visible ?? true,
            is_before_after: selectedItem.is_before_after ?? false,
            before_image_url: selectedItem.before_image_url,
            display_order: selectedItem.display_order || 0,
          })
          .select()
          .single();

        if (error) throw error;
        setPortfolio(prev => [...prev, data]);
        toast({ title: 'Portfolio item added' });
      } else {
        const { error } = await supabase
          .from('portfolio')
          .update({
            title: selectedItem.title,
            category: selectedItem.category,
            image_url: selectedItem.image_url,
            hover_caption: selectedItem.hover_caption,
            is_visible: selectedItem.is_visible,
            is_before_after: selectedItem.is_before_after,
            before_image_url: selectedItem.before_image_url,
          })
          .eq('id', selectedItem.id!);

        if (error) throw error;

        setPortfolio(prev =>
          prev.map(p => (p.id === selectedItem.id ? { ...p, ...selectedItem } as Portfolio : p))
        );
        toast({ title: 'Portfolio item updated' });
      }

      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      toast({
        title: 'Error',
        description: 'Failed to save portfolio item',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;

    try {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;

      setPortfolio(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Portfolio item deleted' });
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete portfolio item',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Portfolio
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage project gallery images
            </p>
          </div>
          <Button onClick={() => openEditor()} variant="gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-lg border border-border overflow-hidden group"
            >
              <div className="aspect-square relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title || 'Portfolio image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                {!item.is_visible && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Hidden
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => openEditor(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-foreground truncate">
                  {item.title || 'Untitled'}
                </p>
                <p className="text-sm text-muted-foreground">{item.category || 'No category'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Add Portfolio Item' : 'Edit Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <ImageUpload
                  value={selectedItem.image_url || ''}
                  onChange={(url) => setSelectedItem({ ...selectedItem, image_url: url })}
                  folder="portfolio"
                  label="Project Image"
                />

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedItem.title || ''}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedItem.category || ''}
                    onValueChange={(value) =>
                      setSelectedItem({ ...selectedItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hover_caption">Hover Caption</Label>
                  <Input
                    id="hover_caption"
                    value={selectedItem.hover_caption || ''}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, hover_caption: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_visible"
                      checked={selectedItem.is_visible ?? true}
                      onCheckedChange={(checked) =>
                        setSelectedItem({ ...selectedItem, is_visible: checked })
                      }
                    />
                    <Label htmlFor="is_visible">Visible</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_before_after"
                      checked={selectedItem.is_before_after ?? false}
                      onCheckedChange={(checked) =>
                        setSelectedItem({ ...selectedItem, is_before_after: checked })
                      }
                    />
                    <Label htmlFor="is_before_after">Before/After</Label>
                  </div>
                </div>

                {selectedItem.is_before_after && (
                  <ImageUpload
                    value={selectedItem.before_image_url || ''}
                    onChange={(url) => setSelectedItem({ ...selectedItem, before_image_url: url })}
                    folder="portfolio"
                    label="Before Image"
                  />
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveItem} variant="gold" disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedItem(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
