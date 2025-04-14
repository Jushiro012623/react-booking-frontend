
const AdminNavbar = () => {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">Admin Dashboard</div>
            <ul className="flex space-x-4">
                <li>
                <a href="/admin" className="text-white hover:text-gray-300">Home</a>
                </li>
                <li>
                <a href="/admin/users" className="text-white hover:text-gray-300">Users</a>
                </li>
                <li>
                <a href="/admin/settings" className="text-white hover:text-gray-300">Settings</a>
                </li>
            </ul>
            </div>
        </nav>
    </div>
  )
}

export default AdminNavbar