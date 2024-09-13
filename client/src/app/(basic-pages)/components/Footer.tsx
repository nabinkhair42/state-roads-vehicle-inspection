"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Logo from "@/assets/logo.png";

const ContactUs = [
  { place: "Melbourne", contact: "03 98508000", icon: Phone },
  { place: "NSW", contact: "02 96551411", icon: Phone },
  { place: "Bris/Gold Coast", contact: "07 33678000", icon: Phone },
  { place: "Perth", contact: "08 63232069", icon: Phone },
];

const CarInspections = [
  { name: "Body & Chassis Car Inspections", url: "#" },
  { name: "Comprehensive Vehicle Inspections", url: "#" },
  { name: "Mechanical Inspections", url: "#" },
  { name: "Testimonials - customers love us!", url: "#" },
];

const Links = [
  { name: "Car Checks Melbourne", url: "#" },
  { name: "Mobile Vehicle Inspections Melbourne", url: "#" },
  { name: "Car Inspections Melbourne", url: "#" },
  { name: "Vehicle Inspections Australia Wide", url: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Image
              src={Logo}
              className="h-16 w-auto object-contain"
              alt="Just Car Inspections Logo"
            />
            <p className="text-sm text-muted-foreground">
              Just Car Inspections operates in several states around Australia
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Contact Us
            </h2>
            <ul className="space-y-3">
              {ContactUs.map((contact, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <contact.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {contact.place}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contact.contact}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Car Inspections
            </h2>
            <ul className="space-y-2">
              {CarInspections.map((inspection, index) => (
                <li key={index}>
                  <Link
                    href={inspection.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {inspection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {Links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col items-center justify-between space-y-4 text-center sm:flex-row sm:space-y-0 sm:text-left">
          <p className="text-sm text-muted-foreground">
            © 2024 Vehicle Testing Pty Ltd T/A Stateroads Inspections ABN
            86123807447. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
