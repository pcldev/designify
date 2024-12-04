import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import ErrorLog from "~/models/ErrorLog.server";
import { uuid } from "./uuid";

export const catchAsync = function (fn: Function) {
  return async function (...args: any[]) {
    try {
      return await fn.apply(this, args);
    } catch (err: any) {
      const { message: _message } = { message: "Something went wrong" };
      const message = err instanceof Error ? err.message : err || _message;

      console.error(`Catch async error at fn: ${fn.name} with err: ${err}`);

      // Create error logger
      ErrorLog.create({
        _id: uuid(),
        name: fn.name,
        description: message,
        status: 400,
      });

      return json({
        success: false,
        message,
      }); // Set the appropriate status code
    }
  };
};

export const catchAsyncActionLoader = function (fn: Function) {
  return (args: ActionFunctionArgs) => {
    try {
      return fn(args);
    } catch (err) {
      const { message: _message } = { message: "Something went wrong" };
      const message = err instanceof Error ? err.message : err || _message;

      console.error(
        `Catch async error at fn: ${fn.name} with message: ${message}`,
      );

      return json({
        success: false,
        message,
      });
    }
  };
};
