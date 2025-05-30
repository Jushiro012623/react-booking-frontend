import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Logo } from "./icons";
import {User} from "@heroui/user";
import { ThemeSwitch } from "./theme-switch";
import { useAuthContext } from "@/context/authContextProvider";
import { Link } from "@heroui/link";

const AdminNavbar = () => {
  const { logoutUser, user } = useAuthContext();

  return (
    <Navbar className="shadow">
      <NavbarContent
        className="max-w-full basis-1/5 sm:basis-full"
        justify="end">
        <NavbarBrand>
        <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/admin"
          >
            <Logo />
            <p className="font-bold text-inherit">CARGO</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <ThemeSwitch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
          <User
            avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
            classNames={{
                base: 'cursor-pointer'
            }}
            isFocusable={true}
            description={user.email}
            name={user.username.toLocaleUpperCase()}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logoutUser}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default AdminNavbar;
