import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import React from "react";
import { Spacer } from "@heroui/spacer";
import { useLocation } from "react-router-dom";

import Typography from "./ui/Typography";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  FacebookIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { useAuthContext } from "@/context/authContextProvider";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useAuthContext();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">CARGO</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={currentPath === item.href}>
              <Link
                className={clsx(
                  linkStyles({
                    color: currentPath === item.href ? "primary" : "foreground",
                  }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
                isDisabled={item.label === "About"}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.facebook} title="Facebook">
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {isLoggedIn() ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    className="cursor-pointer uppercase"
                    name={user.username}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="system">Profile</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={logoutUser}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                href={siteConfig.booking}
                startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
              >
                Book now
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {isLoggedIn() && searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {isLoggedIn() &&
            siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={currentPath === item.href ? "primary" : "foreground"}
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          {isLoggedIn() && (
            <NavbarMenuItem>
              <Link color={"danger"} size="lg" onPress={logoutUser}>
                Logout
              </Link>
            </NavbarMenuItem>
          )}
          {!isLoggedIn() && (
            <React.Fragment>
              <Typography className="text-center" variant="h3">
                Welcome! Please sign in or sign up
              </Typography>
              <Spacer y={4} />
              <NavbarMenuItem>
                <Button
                  fullWidth
                  as={Link}
                  color={"primary"}
                  href={"/login"}
                  variant="light"
                >
                  Login
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  fullWidth
                  as={Link}
                  color={"primary"}
                  href={"/login"}
                  variant="flat"
                >
                  Signup
                </Button>
              </NavbarMenuItem>
            </React.Fragment>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
