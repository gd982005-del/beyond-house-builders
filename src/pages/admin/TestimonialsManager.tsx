import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Star } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditor = (testimonial?: Testimonial) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial);
      setIsCreating(false);
    } else {
      setSelectedTestimonial({
        client_name: '',
        client_role: '',
        content: '',
        rating: 5,
        is_visible: true,
        display_order: testimonials.length,
      });
      setIsCreating(true);
    }
  };

  const saveTestimonial = async () => {
    if (!selectedTestimonial) return;
    setIsSaving(true);

    try {
      if (isCreating) {
        const { data, error } = await supabase
          .from('testimonials')
          .insert({
            client_name: selectedTestimonial.client_name!,
            client_role: selectedTestimonial.client_role,
            content: selectedTestimonial.content!,
            rating: selectedTestimonial.rating || 5,
            is_visible: selectedTestimonial.is_visible ?? true,
            display_order: selectedTestimonial.display_order || 0,
          })
          .select()
          .single();

        if (error) throw error;
        setTestimonials(prev => [...prev, data]);
        toast({ title: 'Testimonial added' });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .update({
            client_name: selectedTestimonial.client_name,
            client_role: selectedTestimonial.client_role,
            content: selectedTestimonial.content,
            rating: selectedTestimonial.rating,
            is_visible: selectedTestimonial.is_visible,
          })
          .eq('id', selectedTestimonial.id!);

        if (error) throw error;

        setTestimonials(prev =>
          prev.map(t => (t.id === selectedTestimonial.id ? { ...t, ...selectedTestimonial } as Testimonial : t))
        );
        toast({ title: 'Testimonial updated' });
      }

      setSelectedTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to save testimonial',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;

      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast({ title: 'Testimonial deleted' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial',
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
              Testimonials
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage client testimonials
            </p>
          </div>
          <Button onClick={() => openEditor()} variant="gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-lg border border-border p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {testimonial.client_name}
                    </h3>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    {!testimonial.is_visible && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Hidden</span>
                    )}
                  </div>
                  {testimonial.client_role && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.client_role}
                    </p>
                  )}
                  <p className="text-foreground line-clamp-2">{testimonial.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditor(testimonial)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Add Testimonial' : 'Edit Testimonial'}
              </DialogTitle>
            </DialogHeader>
            {selectedTestimonial && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={selectedTestimonial.client_name || ''}
                    onChange={(e) =>
                      setSelectedTestimonial({ ...selectedTestimonial, client_name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="client_role">Role / Location</Label>
                  <Input
                    id="client_role"
                    value={selectedTestimonial.client_role || ''}
                    onChange={(e) =>
                      setSelectedTestimonial({ ...selectedTestimonial, client_role: e.target.value })
                    }
                    placeholder="e.g., Homeowner, Karen"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    value={selectedTestimonial.content || ''}
                    onChange={(e) =>
                      setSelectedTestimonial({ ...selectedTestimonial, content: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setSelectedTestimonial({ ...selectedTestimonial, rating })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= (selectedTestimonial.rating || 5)
                              ? 'fill-gold text-gold'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_visible"
                    checked={selectedTestimonial.is_visible ?? true}
                    onCheckedChange={(checked) =>
                      setSelectedTestimonial({ ...selectedTestimonial, is_visible: checked })
                    }
                  />
                  <Label htmlFor="is_visible">Visible on website</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveTestimonial} variant="gold" disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedTestimonial(null)}>
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
