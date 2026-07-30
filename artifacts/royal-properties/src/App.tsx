import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/Home';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Properties from '@/pages/admin/Properties';
import PropertyForm from '@/pages/admin/PropertyForm';
import Blogs from '@/pages/admin/Blogs';
import BlogForm from '@/pages/admin/BlogForm';
import Testimonials from '@/pages/admin/Testimonials';
import Messages from '@/pages/admin/Messages';
import Settings from '@/pages/admin/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Admin Auth */}
      <Route path="/admin" component={AdminLogin} />

      {/* Admin Dashboard */}
      <Route path="/admin/dashboard">
        <AdminLayout><Dashboard /></AdminLayout>
      </Route>

      <Route path="/admin/properties">
        <AdminLayout><Properties /></AdminLayout>
      </Route>
      <Route path="/admin/properties/new">
        <AdminLayout><PropertyForm /></AdminLayout>
      </Route>
      <Route path="/admin/properties/:id">
        {(params) => <AdminLayout><PropertyForm id={params.id} /></AdminLayout>}
      </Route>

      <Route path="/admin/blogs">
        <AdminLayout><Blogs /></AdminLayout>
      </Route>
      <Route path="/admin/blogs/new">
        <AdminLayout><BlogForm /></AdminLayout>
      </Route>
      <Route path="/admin/blogs/:id">
        {(params) => <AdminLayout><BlogForm id={params.id} /></AdminLayout>}
      </Route>

      <Route path="/admin/testimonials">
        <AdminLayout><Testimonials /></AdminLayout>
      </Route>

      <Route path="/admin/messages">
        <AdminLayout><Messages /></AdminLayout>
      </Route>

      <Route path="/admin/settings">
        <AdminLayout><Settings /></AdminLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider> <WouterRouter> <Router /> </WouterRouter> <Toaster /> </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
