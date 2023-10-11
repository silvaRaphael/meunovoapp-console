export function Topbar() {
  return (
    <div className="flex justify-between items-center py-2 px-4 border-b">
      <div className="nav flex items-center">
        <div className="logo pe-2 border-r">
          <a href="/" className="text-sm">
            LOGOTIPO
          </a>
        </div>
        <ul className="flex">
          <li className="mx-2 text-sm text-slate-600 hover:text-slate-900">
            <a href="/#">Dashboard</a>
          </li>
          <li className="mx-2 text-sm text-slate-600 hover:text-slate-900">
            <a href="/#">Dashboard</a>
          </li>
          <li className="mx-2 text-sm text-slate-600 hover:text-slate-900">
            <a href="/#">Dashboard</a>
          </li>
          <li className="mx-2 text-sm text-slate-600 hover:text-slate-900">
            <a href="/#">Dashboard</a>
          </li>
          <li className="mx-2 text-sm text-slate-600 hover:text-slate-900">
            <a href="/#">Dashboard</a>
          </li>
        </ul>
      </div>
      <div className="actions">
        <div className="ml-4 flex items-center">
          <div className="relative ml-3">
            <input
              type="checkbox"
              name="action-open"
              className="group"
              // checked
            />
            <div>
              <button
                type="button"
                className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>

            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-checked:hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <a
                href="/#"
                className="block px-4 py-1 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                id="user-menu-item-0"
              >
                Your Profile
              </a>
              <a
                href="/#"
                className="block px-4 py-1 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                id="user-menu-item-1"
              >
                Settings
              </a>
              <div className="border-b"></div>
              <a
                href="/#"
                className="block px-4 py-1 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                id="user-menu-item-2"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
