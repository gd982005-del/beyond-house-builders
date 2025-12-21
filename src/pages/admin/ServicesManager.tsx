import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil, Save, GripVertical } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Service = Database['public']['Tables']['services']['Row'];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [benefitsText, setBenefitsText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditor = (service: Service) => {
    setSelectedService(service);
    const benefits = Array.isArray(service.benefits) ? service.benefits : [];
    setBenefitsText(benefits.join('\n'));
  };

  const saveService = async () => {
    if (!selectedService) return;
    setIsSaving(true);

    try {
      const benefitsArray = benefitsText
        .split('\n')
        .map(b => b.trim())
        .filter(b => b.length > 0);

      const { error } = await supabase
        .from('services')
        .update({
          title: selectedService.title,
          description: selectedService.description,
          benefits: benefitsArray,
          image_url: selectedService.image_url,
          is_visible: selectedService.is_visible,
        })
        .eq('id', selectedService.id);

      if (error) throw error;

      setServices(prev =>
        prev.map(s =>
          s.id === selectedService.id
            ? { ...selectedService, benefits: benefitsArray }
            : s
        )
      );

      setSelectedService(null);
      toast({ title: 'Service updated successfully' });
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleVisibility = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_visible: !service.is_visible })
        .eq('id', service.id);

      if (error) throw error;

      setServices(prev =>
        prev.map(s =>
          s.id === service.id ? { ...s, is_visible: !s.is_visible } : s
        )
      );

      toast({ title: `Service ${service.is_visible ? 'hidden' : 'visible'}` });
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast({
        title: 'Error',
        description: 'Failed to update visibility',
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
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Services Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your service offerings
          </p>
        </div>

        <div className="grid gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-lg border border-border p-6 flex items-center gap-4"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
              
              {service.image_url && (
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  {!service.is_visible && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">Hidden</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`visibility-${service.id}`} className="text-sm">
                    Visible
                  </Label>
                  <Switch
                    id={`visibility-${service.id}`}
                    checked={service.is_visible}
                    onCheckedChange={() => toggleVisibility(service)}
                  />
                </div>
                <Button variant="outline" size="sm" onClick={() => openEditor(service)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            {selectedService && (
              <div className="space-y-4">
                <ImageUpload
                  value={selectedService.image_url || ''}
                  onChange={(url) =>
                    setSelectedService({ ...selectedService, image_url: url })
                  }
                  folder="services"
                  label="Service Image"
                />

                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={selectedService.title}
                    onChange={(e) =>
                      setSelectedService({ ...selectedService, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={selectedService.description || ''}
                    onChange={(e) =>
                      setSelectedService({ ...selectedService, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    rows={4}
                    placeholder="LED integrated lighting&#10;Gypsum board installations&#10;Modern architectural elements"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_visible"
                    checked={selectedService.is_visible}
                    onCheckedChange={(checked) =>
                      setSelectedService({ ...selectedService, is_visible: checked })
                    }
                  />
                  <Label htmlFor="is_visible">Visible on website</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveService} variant="gold" disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedService(null)}>
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
