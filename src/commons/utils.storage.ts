import { IStorageProperties } from "@mantine/hooks/lib/use-local-storage/create-storage";
import { ToolId } from "./types";

export const sp = <T>(args: IStorageProperties<T> & { tid: ToolId }): IStorageProperties<T> => ({
  ...args,
  key: `${args.tid}-${args.key}`
});
