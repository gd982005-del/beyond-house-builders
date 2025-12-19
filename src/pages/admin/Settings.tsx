import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          company_name: settings.company_name,
          location: settings.location,
          phone: settings.phone,
          email: settings.email,
          whatsapp: settings.whatsapp,
          seo_title: settings.seo_title,
          seo_description: settings.seo_description,
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast({ title: 'Settings saved successfully' });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => prev ? { ...prev, [field]: value } : null);
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

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No settings found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Site Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage global website settings
            </p>
          </div>
          <Button onClick={handleSave} variant="gold" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Company Information */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Company Information
          </h2>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={settings.company_name}
                onChange={(e) => updateField('company_name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => updateField('location', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="whatsapp">WhatsApp Number (with country code, no +)</Label>
              <Input
                id="whatsapp"
                value={settings.whatsapp}
                onChange={(e) => updateField('whatsapp', e.target.value)}
                placeholder="254791996448"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            SEO Settings
          </h2>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="seo_title">SEO Title (max 60 characters)</Label>
              <Input
                id="seo_title"
                value={settings.seo_title || ''}
                onChange={(e) => updateField('seo_title', e.target.value)}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(settings.seo_title || '').length}/60 characters
              </p>
            </div>
            
            <div>
              <Label htmlFor="seo_description">SEO Description (max 160 characters)</Label>
              <Textarea
                id="seo_description"
                value={settings.seo_description || ''}
                onChange={(e) => updateField('seo_description', e.target.value)}
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(settings.seo_description || '').length}/160 characters
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Footer credit "Developed by JavaLab" is fixed and cannot be edited.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
