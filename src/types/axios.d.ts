import { Api } from "@/app/app-types";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosResponse<T = any> extends Promise<Api.Response<T>> {}
}
