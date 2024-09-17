"use client";
import ErrorLine from "@/components/reusable/error-line";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCreateService } from "@/services/service";
import { IServiceSchema, ServiceSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SERVICE_TYPES = ["Comprehensive", "Mechanical", "Body and Chassis"];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabledServices: string[];
};

const CreateService: FC<Props> = ({ isOpen, setIsOpen, disabledServices }) => {
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IServiceSchema>({
    resolver: zodResolver(ServiceSchema),
  });

  const onSubmit: SubmitHandler<IServiceSchema> = (data) => {
    if (!thumbnail) {
      return toast.error("Please upload a thumbnail for your service");
    }
    Object.keys(data).forEach((key) => {
      // if the key is an array, the length should be greater than 0
      //@ts-ignore
      if (!data.features || data.features.length < 2) {
        return toast.error("Please add at least two feature for your service");
      }

      // if the key is a string, the length should be greater than 0
      //@ts-ignore
      if (typeof data[key] === "string" && data[key].length === 0) {
        return toast.error(`Please enter a valid ${key}`);
      }

      if (data.price < 1) {
        return toast.error("Please enter price greater than 0");
      }
    });
    mutate({ ...data, thumbnail });
  };

  const { mutate, isPending } = useCreateService({
    onSuccess() {
      setIsOpen(false);
    },
  });

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(val) => {
        reset();
        setIsOpen(val);
      }}
    >
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Create a New Service</SheetTitle>
          <SheetDescription>
            Fill out the details below to list your service.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="service-type">Service</Label>
            <Select
              value={watch("serviceType")}
              onValueChange={(value) => setValue("serviceType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {SERVICE_TYPES.map((type, index) => (
                  <SelectItem
                    disabled={disabledServices.includes(type)}
                    key={index}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorLine message={errors.serviceType?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              placeholder="Enter a price for your service"
              type="number"
              {...register("price")}
            />
            <ErrorLine message={errors.price?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              rows={5}
              placeholder="Describe your service"
              {...register("description")}
            />
            <ErrorLine message={errors.description?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setThumbnail(e.target.files && e.target.files[0])
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="features">Features</Label>
            <div className="grid gap-2">
              {watch("features")?.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    id={`feature-${index}`}
                    type="text"
                    placeholder="Enter a feature"
                    {...register(`features.${index}`)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setValue(
                        "features",
                        watch("features")?.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <ErrorLine message={errors.features?.message} />
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  setValue("features", [...(watch("features") || []), ""])
                }
              >
                Add Feature
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button isLoading={isPending} type="submit">
              Create Service
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateService;
