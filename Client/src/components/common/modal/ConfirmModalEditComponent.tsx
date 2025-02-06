import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface ConfirmModalProp {
  title: string;
  children: React.ReactNode;
  btn1Text?: string;
  btn2Text?: string;
}

const ConfirmModelEditComponent = (props: ConfirmModalProp) => {
  const { title, children } = props;
  const [open, setOpen] = useState(true);

  const defaultTitle = title ? title : "Recipe";

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="md:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex sm:items-start md:items-center">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                  <PencilSquareIcon
                    aria-hidden="true"
                    className="size-6 text-blue-600"
                  />
                </div>

                <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Update <span className="italic">{defaultTitle}</span>
                  </DialogTitle>
                </div>
              </div>
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModelEditComponent;
