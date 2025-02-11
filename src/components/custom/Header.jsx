import React from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function Header() {
  const users = JSON.parse(localStorage.getItem('user'));
  const userPicture = users?.picture || '/placeholder.jpg';

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 bg-white">
      {/* Logo */}
      <img src="/logo.svg" alt="Logo" className="h-8" />

      {/* User Section */}
      <div>
        {users ? (
          <div className="flex items-center gap-3">
            {/* My Trips Button */}
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>

            {/* User Avatar and Logout */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={userPicture}
                  className="h-[35px] w-[35px] rounded-full object-cover "
                  alt="User Avatar"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = '/placeholder.jpg'; // Fallback image
                  }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <button variant='destructive' 
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload(); // Reload to update state
                  }}
                        >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button>Sign in</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
