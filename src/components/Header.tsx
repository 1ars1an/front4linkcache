import { Link, useRouter } from '@tanstack/react-router';
import React from 'react';

import { Button } from './ui/button';
import { useAuth } from '../services/auth';
import { Link as LinkIcon } from 'lucide-react';

import { LinkCreateDialog } from './LinkCreateDialog';

export default function Header() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.navigate({ to: '/login' });
    } catch (error) {
      console.error('Error logging out:', error);
      router.navigate({ to: '/login' });
    }
  };

  return (
    <header className="w-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-md border-b border-gray-600 rounded-xl">
      <div className="px-4 py-4 flex text-gray-900">
        <nav className="flex items-center w-full">
          <div className="flex items-center gap-8 mr-auto font-semibold text-sm">
            <Link
              to="/app"
              className="hover:text-gray-700 transition-colors rounded-md px-2 py-1"
            >
              Home
            </Link>
            <Link
              to="/app/profile"
              className="hover:text-gray-700 transition-colors rounded-md px-2 py-1"
            >
              Profile
            </Link>
            {user && (
              <LinkCreateDialog>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent focus-visible:ring-0 ml-5"
                  asChild
                >
                  <LinkIcon size={20} />
                </Button>
              </LinkCreateDialog>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            {user ? (
              <Button
                variant="default"
                onClick={handleLogout}
                className="rounded-md"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  asChild
                  className="rounded-md"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
