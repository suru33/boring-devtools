import { IStorageProperties } from "@mantine/hooks/lib/use-local-storage/create-storage";
import { useLocalStorage } from "@mantine/hooks";
import { ToolId } from "./types";
import { deserializeDate, serializeDate } from "./utils.datetime";
import { numVals } from "../app-sx";
import __ from "./constants";

export const useToolPropsStorage = <T>(args: IStorageProperties<T> & { tid: ToolId }) =>
  useLocalStorage({
    ...args,
    key: `${args.tid}-${args.key}`,
    getInitialValueInEffect: args.getInitialValueInEffect === undefined ? true : args.getInitialValueInEffect
  });

export const useToolPropEmptyStringStorage = (args: IStorageProperties<string> & { tid: ToolId }) =>
  useToolPropsStorage<string>({ ...args, defaultValue: "" });

export const useToolPropHowManyStorage = (args: Partial<IStorageProperties<number>> & { tid: ToolId }) =>
  useToolPropsStorage<number>({
    ...args,
    key: __.sk.howMany,
    defaultValue: args.defaultValue || numVals.defaultOutputItems
  });

export const useToolPropDateStorage = (args: IStorageProperties<Date> & { tid: ToolId }) =>
  useToolPropsStorage<Date>({ ...args, serialize: serializeDate, deserialize: deserializeDate });
