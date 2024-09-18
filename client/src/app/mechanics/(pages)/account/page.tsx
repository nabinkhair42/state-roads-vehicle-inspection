import MechanicDetails from "@/app/mechanics/(pages)/account/components/MechanicDetails";
import MechanicChangePassword from "@/app/mechanics/(pages)/account/components/ChangePassword";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <MechanicDetails />
      <MechanicChangePassword />
    </div>
  );
};

export default Page;
