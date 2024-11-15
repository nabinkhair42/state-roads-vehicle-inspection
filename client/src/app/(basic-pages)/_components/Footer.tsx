"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ContactsDetails,
  CarInspections,
  Links,
  SocialMediaLinks,
} from "@/constants/Footer";
import Logo from "@/assets/logo.svg";

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
              {SocialMediaLinks.map(({ icon: Icon, url }, index) => (
                <Link
                  key={index}
                  href={url}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Contact Us
            </h2>
            <ul className="space-y-3">
              {ContactsDetails.map((contact, index) => (
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
