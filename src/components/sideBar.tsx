import {Accordion, AccordionItem} from "@heroui/accordion";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Spacer } from "@heroui/spacer";
import clsx from "clsx";
import { BsDot } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const SideBar = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const getExpandedKeys = () => {
        const keys = [];
    
        if (currentPath.includes("/admin/booking")) keys.push("bookings");
        if (currentPath.includes("/admin/schedule")) keys.push("schedules");
        if (currentPath.includes("/admin/user")) keys.push("users");
    
        return keys;
    };
    const linkClass = (href: string) =>
        clsx(
          "rounded-full px-2",
          currentPath.startsWith(href) ? "!text-blue-500 text-black !font-bold" : "hover:bg-gray-100 hover:text-black "
    );
  return (
    <div className="w-80">
        <div className="px-2 ">
            <Link color="foreground" className=" pb-4 font-semibold cursor-pointer w-full">Dashboard</Link>
            <Divider />
        </div>
        <Accordion selectionMode="multiple" defaultExpandedKeys={getExpandedKeys()}>
            <AccordionItem key="bookings" className={`font-semibold`} aria-label="Bookings" title="Bookings">
                <Link href="/admin/booking/" color="foreground" className={`${linkClass('/admin/booking/')} font-normal cursor-pointer w-full flex items-center gap-2 py-2`}><BsDot size={20} />List</Link>
                <Spacer y={1} />
                <Link color="foreground" className={`${linkClass('/admin/booking/view')} font-normal cursor-pointer w-full flex items-center gap-2 py-2`}><BsDot size={20} />View</Link>
                <Spacer y={1} />
                <Link color="foreground" className={`${linkClass('/admin/booking/create')} font-normal cursor-pointer w-full flex items-center gap-2 py-2`}><BsDot size={20} />Create</Link>
            </AccordionItem>
            <AccordionItem key="schedules" className="font-semibold" aria-label="Schedules" title="Schedules">
                <Link color="foreground" className={`${linkClass('/admin/schedules/')} font-normal cursor-pointer w-full flex items-center gap-2 py-2`}><BsDot size={20} />List</Link>
            </AccordionItem>
            <AccordionItem key="users" className="font-semibold" aria-label="Users" title="Users">
                <Link color="foreground" className={`${linkClass('/admin/users/')} font-normal cursor-pointer w-full flex items-center gap-2 py-2`}><BsDot size={20} />List</Link>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

export default SideBar