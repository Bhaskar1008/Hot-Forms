import React from 'react';
import UserLayout from './Layout/UserLayout';
import { UserTable } from './components/UserTable';
import { UserTableSkeleton } from './components/UserTableSkeleton';
import { useUsers } from './hooks/useUsers';

const UserManagement: React.FC = () => {
  const { users, loading, error } = useUsers();

  if (error) {
    return (
      <UserLayout title="User Management">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="User Management">
      {loading ? (
        <UserTableSkeleton />
      ) : (
        <UserTable 
          users={users}
          onEdit={(user) => console.log('Edit user:', user)}
          onDelete={(userId) => console.log('Delete user:', userId)}
        />
      )}
    </UserLayout>
  );
};

export default UserManagement;