import React from "react";

const Dash = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-content w-full flex items-center justify-center ">
      <div className="flex flex-col w-full h-full items-center justify-center px-3 border-gray-200 max-w-2xl gap-6">
        <h1 className="text-3xl text-base-100 pb-2  font-semibold text-center ">
          Manage Your Projects and Tasks{" "}
          <span className="text-primary">Effortlessly!</span>
        </h1>
        <p className="px-4 font-medium text-center text-neutral/70 ">
          Take full control of your projects today – start adding tasks, sorting
          your priorities, and tracking progress with ease. Stay organized and
          boost your productivity effortlessly!
        </p>
        <button className="btn border-none bg-primary text-primary-content p-4 rounded-2xl font-semibold">
          Let's get started!
        </button>
      </div>
    </div>
  );
};

export default Dash;
