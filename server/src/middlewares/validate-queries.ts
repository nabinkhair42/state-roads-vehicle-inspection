import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

import { fromError } from "zod-validation-error";

import { nestDotNotationObject } from "@/utils/nest-dot-notation-object";
import { devLog } from "@/utils/dev-log";
import { sendRes } from "./send-response";

export const validateQueries = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        search = {},
        exact = {},
        ...rest
      } = nestDotNotationObject(req.query);

      const parsed = schema.parse({
        exactSearch: exact,
        regexSearch: search,
        ...rest,
      });
      // @ts-expect-error: Type 'T' is not assignable to type 'ParsedQs'
      req.query = parsed;
      next();
    } catch (e) {
      devLog(req.query);
      devLog(e);
      const message = fromError(e).toString();
      return sendRes(res, {
        status: 400,
        message,
        error: e.errors,
        forceError: true,
      });
    }
  };
};
