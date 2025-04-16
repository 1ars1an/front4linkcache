import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { LinkCreateForm } from './LinkCreateForm';

export function LinkCreateDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new link.
          </DialogDescription>
        </DialogHeader>
        <LinkCreateForm />
      </DialogContent>
    </Dialog>
  );
}
