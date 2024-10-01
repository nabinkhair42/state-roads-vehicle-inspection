import {
  CheckCircle,
  Car,
  FileText,
  Shield,
  Hammer,
  ShipWheel,
  CircleGauge,
  Cog,
  Briefcase,
} from "lucide-react";



/// First Part OF HeroSection: DynamicHero

export const MainContent = [
  {
    title: "Expert Car Inspections",
    subtitle: "You Can Trust",
    description:
      "Make confident decisions with our comprehensive inspections, detailed reports, and unmatched expertise.",
  },
];

export const DynamicHeroFeatures = [
  { icon: CheckCircle, text: "250+ Point Inspection" },
  { icon: Car, text: "Certified Mechanics" },
  { icon: FileText, text: "Detailed Reports" },
  { icon: Shield, text: "30-Day Guarantee" },
];

// Second Part OF HeroSection: AlternativeHero

export const Points = [
  "250+ Point Inspection",
  "Certified Mechanics",
  "Detailed Reports",
  "24 Hour Turnaround",
];

export const AlternativeContent = [
  {
    title: "Most Trusted Inspection Service",
    description:
      "Our certified mechanics will provide you with a detailed report within 24 hours of your inspection.",
  },
];




// Features Section

export const FeaturesDemoSection = [
  {
    title: "Qualified Mechanics",
    description:
      "Our hand-picked team of mechanics brings years of industry experience, ensuring you're in capable hands.",
    icon: Hammer,
  },
  {
    title: "Peace of Mind",
    description:
      "We eliminate the risk of expensive mistakes, ensuring no nasty surprises when purchasing a car.",
    icon: ShipWheel,
  },
  {
    title: "Detailed Reports",
    description:
      "Our comprehensive 250+ point inspection report includes a one-on-one review with an expert mechanic.",
    icon: CircleGauge,
  },
  {
    title: "30-Day Guarantee",
    description:
      "We offer a 30-day Stateroads vehicle protection guarantee, backing our commitment to excellence.",
    icon: Cog,
  },
];




// Inspection Points Section

export const inspectionCategories = [
  {
    name: "Engine",
    icon: Car,
    points: [
      "Oil levels and quality",
      "Coolant system integrity",
      "Belts and hoses condition",
      "Engine mounts stability",
      "Exhaust system check",
      "Fuel system inspection",
    ],
  },
  {
    name: "Interior",
    icon: Briefcase,
    points: [
      "Seats and upholstery condition",
      "Dashboard controls functionality",
      "Air conditioning performance",
      "Audio system quality",
      "Safety features test",
      "Interior lighting check",
    ],
  },
  {
    name: "Exterior",
    icon: Car,
    points: [
      "Body condition assessment",
      "Paint quality and finish",
      "Lights and signals operation",
      "Tires tread and pressure",
      "Windshield and wipers check",
      "Suspension system inspection",
    ],
  },
];
