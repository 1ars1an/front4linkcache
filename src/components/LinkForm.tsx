import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import { TagMultiSelect } from './TagMultiSelect';

const formSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== '', {
      message: 'Name cannot be empty if provided',
    }),
  description: z.string().optional(),
  url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .refine((val) => val === undefined || val.trim() !== '', {
      message: 'URL cannot be empty if provided',
    }),
  tags: z.array(z.number()).optional(), // assuming you're sending an array of tag IDs
});

export function LinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '', // prefill if editing
      description: '',
      url: '',
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting PATCH:', values);

    // Send a PATCH request to your API
    fetch('/api/link/17', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Link name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Optional description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagMultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={['hi', 'bye']}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
