"use client";

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
   CATEGORY = 0,
   LOCATION = 1,
   INFO = 2,
   IMAGES = 3,
   DESCRIPTION = 4,
   PRICE = 5,
}

const RentModal = () => {
   const rentModal = useRentModal();
   const [step, setStep] = useState(STEPS.CATEGORY);

   const onBack = () => {
      setStep((value) => value - 1);
   };

   const onNext = () => {
      setStep((value) => value + 1);
   };

   const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) {
         return "Create";
      }

      return "NEXT";
   }, [step]);

   const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) {
         return undefined;
      }

      return "BACK";
   }, [step]);

   let bodyContent = (
      <div className="flex flex-col gap-8">
         <Heading title="Which of these best describe your place?" subTitle="Pick a category" />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
               <div key={item.label} className="col-span-1">
                  <CategoryInput
                     onClick={() => {}}
                     selected={false}
                     label={item.label}
                     icon={item.icon}
                  />
               </div>
            ))}
         </div>
      </div>
   );

   return (
      <Modal
         onClose={rentModal.onClose}
         isOpen={rentModal.isOpen}
         onSubmit={rentModal.onOpen}
         actionLabel={actionLabel}
         secondaryActionLabel={secondaryActionLabel}
         secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
         title="Staycation your home"
         body={bodyContent}
      />
   );
};

export default RentModal;
