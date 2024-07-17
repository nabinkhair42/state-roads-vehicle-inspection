import { NextFunction, Request, Response } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

export const parseFile = (fieldName: string) => {
  return multer({ storage: storage }).single(fieldName);
};

export const parseMultipleFile = (fieldName: string) => {
  return multer({ storage: storage }).array(fieldName);
};
