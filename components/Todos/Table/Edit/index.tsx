"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  deleteTodoAppsync,
  updateTodoAppsync,
} from "@/actions/appsync.actions";
import { useUserStore } from "@/store/userStore";
import { deleteTodo, putTodo } from "@/actions/apigateway.actions";

interface EditProps {
  title: string;
  todoId: string;
}

export default function Edit({ title, todoId }: EditProps) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const sub = useUserStore((state) => state.sub) as any;
  const handleCancel = () => {
    window.location.reload();
    setOpen(false);
  };

  // log userId and todoId
  const handleDelete = async () => {
    const todoData = {
      UserID: sub as string,
      title,
    };
    const response = await deleteTodoAppsync(todoData);
    // const response = await deleteTodo(sub as string, title as string);
    handleCancel();
  };

  const handleComplete = async () => {
    const todoData = {
      UserID: sub as string,
      title,
    };
    const response = await updateTodoAppsync(todoData);
    // const response = await putTodo(sub as string, title);
    handleCancel();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    ></Dialog.Title>
                    <div className="mt-2 inline-block">
                      <h4 className="inline-block">{title}</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse inline-block">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500 sm:mt-0 sm:w-auto"
                    onClick={handleComplete}
                  >
                    Complete
                  </button>
                  <button
                    type="button"
                    className=" mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
