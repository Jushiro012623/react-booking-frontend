import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Logo } from "./icons";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "./theme-switch";
import { useAuthContext } from "@/context/authContextProvider";

const AdminNavbar = () => {

    const {logoutUser, user} = useAuthContext()

  return (
    <Navbar className="shadow">
        <NavbarContent className="max-w-full basis-1/5 sm:basis-full" justify="end">
            <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">CARGO</p>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
            <ThemeSwitch />
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform"
                color="primary"
                name="ADMIN"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
