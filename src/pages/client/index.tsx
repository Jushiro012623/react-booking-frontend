import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function IndexPage() {
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-lg text-center justify-center mt-20">
          <span className={title()}>Smart&nbsp;</span>
          <span className={title({ color: "violet" })}>Cargo Solutions&nbsp;</span>
          <br />
          <span className={title()}>
          for seamless travel regardless of your experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
          Elevate your travel journey.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.booking}
          >
            Book with us now
          </Link>
        </div>
      </section>
  );
}
