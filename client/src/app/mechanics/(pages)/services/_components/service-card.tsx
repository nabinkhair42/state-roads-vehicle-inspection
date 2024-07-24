import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IService } from "@/types/service.type";
import { CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  service: IService;
};

const ServiceCard = ({ service }: Props) => {
  return (
    <Card
      className={`flex flex-col gap-6 w-80 md:w-96 border border-gray-300 shadow-lg`}
    >
      <CardHeader className="flex flex-col items-center p-6 bg-card rounded-lg">
        <CardTitle className="text-xl font-semibold text-center">
          {service.serviceType}
        </CardTitle>
        <CardTitle className="text-3xl font-bold text-center mt-2 text-primary">
          ${service.price}
        </CardTitle>
        <CardDescription className="text-center mt-2 flex flex-col gap-2">
          <p>{service.description}</p>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-lg font-semibold mb-4">
          Service Included:
        </CardTitle>
        <ul className="ml-4">
          {service.features?.map((item, i) => (
            <li key={i} className="flex items-center mb-2 text-sm">
              <CircleCheck className="mr-2 w-4 h-4 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
