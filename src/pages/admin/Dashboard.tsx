import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  Inbox, 
  Eye, 
  Wrench, 
  Calendar, 
  Image, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Stats {
  totalSubmissions: number;
  unreadSubmissions: number;
  serviceRequests: number;
  consultationBookings: number;
  portfolioCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSubmissions: 0,
    unreadSubmissions: 0,
    serviceRequests: 0,
    consultationBookings: 0,
    portfolioCount: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentSubmissions();
  }, []);

  const fetchStats = async () => {
    try {
      // Total submissions
      const { count: totalSubmissions } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true });

      // Unread submissions
      const { count: unreadSubmissions } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread');

      // Service requests (quote)
      const { count: serviceRequests } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('form_source', 'quote');

      // Consultation bookings
      const { count: consultationBookings } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('form_source', 'consultation');

      // Portfolio count
      const { count: portfolioCount } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalSubmissions: totalSubmissions || 0,
        unreadSubmissions: unreadSubmissions || 0,
        serviceRequests: serviceRequests || 0,
        consultationBookings: consultationBookings || 0,
        portfolioCount: portfolioCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentSubmissions = async () => {
    try {
      const { data } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching recent submissions:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: Inbox,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Unread Inquiries',
      value: stats.unreadSubmissions,
      icon: Eye,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Service Requests',
      value: stats.serviceRequests,
      icon: Wrench,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Consultations',
      value: stats.consultationBookings,
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Portfolio Projects',
      value: stats.portfolioCount,
      icon: Image,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
    },
  ];

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
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to Beyond House Admin Panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-semibold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bg} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="bg-card rounded-lg shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Submissions
            </h2>
          </div>
          <div className="divide-y divide-border">
            {recentSubmissions.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No submissions yet
              </div>
            ) : (
              recentSubmissions.map((submission) => (
                <div key={submission.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        submission.status === 'unread' 
                          ? 'bg-amber-500/10' 
                          : submission.status === 'contacted'
                          ? 'bg-green-500/10'
                          : 'bg-muted'
                      }`}>
                        {submission.status === 'unread' ? (
                          <Clock className="h-4 w-4 text-amber-500" />
                        ) : submission.status === 'contacted' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{submission.full_name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        submission.form_source === 'contact' 
                          ? 'bg-blue-500/10 text-blue-500'
                          : submission.form_source === 'consultation'
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {submission.form_source}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
