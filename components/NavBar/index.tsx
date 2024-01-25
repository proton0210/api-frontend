"use client";

import { handleSignOut } from "@/actions/auth.actions";
import { useUserStore } from "@/store/userStore";
import { Disclosure } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TodoForm from "../TodoForm";
export default function NavBar() {
  const { username, sub } = useUserStore();

  const [showTodoForm, setShowTodoForm] = useState(false);

  const signOut = async () => {
    try {
      await handleSignOut();
      window.history.pushState(null, "", "/");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {() => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href="#"
                      className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Todos
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setShowTodoForm(true)}
                    >
                      <PlusIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Create Todo
                    </button>
                    <p className="inline ml-4 text-sm font-medium text-gray-900">
                      {username}
                    </p>
                  </div>
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={signOut}
                    >
                      <span className="sr-only">View notifications</span>
                      <ArrowLeftEndOnRectangleIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      {showTodoForm && <TodoForm setShowTodoForm={setShowTodoForm} />}
    </>
  );
}
