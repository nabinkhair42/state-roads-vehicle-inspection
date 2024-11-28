"use client";
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Mail, Phone, MapPin } from "lucide-react";



const PrivacyPolicy = () => {
  const [isConsentDialogOpen, setIsConsentDialogOpen] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Privacy Commitment
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            Privacy Policy
          </CardTitle>
          <p className="text-muted-foreground">
            Last Updated: November 2024
          </p>
        </CardHeader>
        
        <Separator className="mb-6" />
        
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="introduction">
              <AccordionTrigger className="text-lg font-semibold">
                1. Introduction
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  At Auto Inspector, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in the context of our car inspection services.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-collect">
              <AccordionTrigger className="text-lg font-semibold">
                2. Information We Collect
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Vehicle details (make, model, year, VIN)</li>
                  <li>Location and address information</li>
                  <li>Payment and transaction details</li>
                  <li>Communication records</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-use">
              <AccordionTrigger className="text-lg font-semibold">
                3. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Providing car inspection services</li>
                  <li>Communicating about your vehicle inspection</li>
                  <li>Processing payments</li>
                  <li>Sending service updates and promotional materials</li>
                  <li>Improving our services and customer experience</li>
                  <li>Compliance with legal obligations</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-sharing">
              <AccordionTrigger className="text-lg font-semibold">
                4. Information Sharing
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your data with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Service providers and contractors</li>
                  <li>Payment processing partners</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-security">
              <AccordionTrigger className="text-lg font-semibold">
                5. Data Security
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-4 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your personal information.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Encrypted data transmission</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication measures</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-rights">
              <AccordionTrigger className="text-lg font-semibold">
                6. Your Rights
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with relevant data protection authorities</li>
                </ul>
                {/* <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsConsentDialogOpen(true)}
                >
                  Manage Consent Preferences
                </Button> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* <AlertDialog open={isConsentDialogOpen} onOpenChange={setIsConsentDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Manage Consent Preferences</AlertDialogTitle>
            <AlertDialogDescription>
              Choose your data privacy and communication preferences.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label>Marketing Communications</label>
              <Button variant="outline" size="sm">Opt-Out</Button>
            </div>
            <div className="flex items-center justify-between">
              <label>Performance Tracking</label>
              <Button variant="outline" size="sm">Disable</Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Save Preferences</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};

export default PrivacyPolicy;