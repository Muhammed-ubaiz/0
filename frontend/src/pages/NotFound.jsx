import { PackageX } from 'lucide-react';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

export default function NotFound() {
  return (
    <EmptyState icon={PackageX} title="Page not found" text="The page you’re looking for has moved or no longer exists.">
      <Button to="/">Back to home</Button>
      <Button to="/shop" variant="outline">Shop products</Button>
    </EmptyState>
  );
}
