import React from "react";
import Link from "next/link";
import { 
  ContactsDetails, 
  SocialMediaLinks, 
  CarInspections, 
  Links 
} from "@/constants/Footer";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import Logo from "@/assets/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-background flex mx-auto items-center justify-center">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <Image 
                src={Logo} 
                alt="Just Car Inspections Logo" 
                className="h-16 w-auto object-contain" 
              />
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <p className="text-sm text-muted-foreground">
                Providing trusted car inspection services across Australia
              </p>
              
              {/* Social Media Links with Tooltips */}
              <TooltipProvider>
                <div className="flex space-x-4">
                  {SocialMediaLinks.map(({ icon: Icon, url, name }) => (
                    <Tooltip key={url}>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="hover:bg-primary/10"
                          asChild
                        >
                          <Link href={url} target="_blank">
                            <Icon className="h-5 w-5" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Contact Details Section */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {ContactsDetails.map(({ icon: Icon, place, contact }) => (
                <div 
                  key={place} 
                  className="flex items-center space-x-3 group"
                >
                  <Icon 
                    className="h-5 w-5 text-primary 
                    transition-transform group-hover:scale-110" 
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {place}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contact}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Car Inspections Section */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg">Inspections</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              {CarInspections.map(({ name, url }) => (
                <Button 
                  key={name} 
                  variant="link" 
                  className="p-0 text-muted-foreground" 
                  asChild
                >
                  <Link href={url}>{name}</Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links Section */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              {Links.map(({ name, url }) => (
                <Button 
                  key={name} 
                  variant="link" 
                  className="p-0 text-muted-foreground" 
                  asChild
                >
                  <Link href={url}>{name}</Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2024 Vehicle Testing Pty Ltd T/A Stateroads Inspections 
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span> 
            ABN 86123807447. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="link" size="sm" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;