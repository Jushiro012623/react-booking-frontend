const AdminNavbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Admin Dashboard</div>
          <ul className="flex space-x-4">
            <li>
              <a className="text-white hover:text-gray-300" href="/admin">
                Home
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300" href="/admin/users">
                Users
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-gray-300"
                href="/admin/settings"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
