// This file catches all routes under /admin that are not specifically defined
// It will render the same page as the main admin page, which handles routing on the client side

import AdminDashboard from '../page';

export default function CatchAllAdminPage() {
  return <AdminDashboard />;
}