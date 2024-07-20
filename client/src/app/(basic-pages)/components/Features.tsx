"use client";
import { cn } from "@/lib/utils";
import { Cog, ShipWheel, CircleGauge, Hammer } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Qualified Mechanics",
      description:
        "Our mechanics are a hand picked team that come from many years of experience in the industry - so you're in good hands!",
      icon: Hammer,
    },
    {
      title: "Peace of Mind",
      description:
        "Purchasing the wrong car can be a very expensive mistake.  We remove the risk so there are no nasty surprises",
      icon: ShipWheel,
    },
    {
      title: "Detailed Reports",
      description:
        "Our 250+ point inspection report is the most comprehensive in the industry  includes a one on one telephone review by our expert mechanic to discuss the results and answer questions",
      icon: CircleGauge,
    },
    {
      title: "Guarantee",
      description:
        "We provide a 30 day Stateroads vehicle protection guarantee, so you'll know we're serious when we say we really are the best in the business!  Call us anytime for bookings and enquiries",
      icon: Cog,
    },
  ];

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-center md:text-4xl text-3xl font-Semibold ">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature ",
        (index === 0 || index === 3) && "border",
        index < 4 && "border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full pointer-events-none" />
      )}
      <div className="mb-4 relative px-10 text-primary ">
        <Icon className="h-8 w-8" />
      </div>
      <div className="text-lg font-bold mb-2 relative px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block ">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground dark:text-neutral-300 max-w-xs relative px-10">
        {description}
      </p>
    </div>
  );
};
export default Features;