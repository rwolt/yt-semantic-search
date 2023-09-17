/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.2.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as collection from "../collection";
import type * as message from "../message";
import type * as openai from "../openai";
import type * as prompts from "../prompts";
import type * as text from "../text";
import type * as transcripts from "../transcripts";
import type * as video from "../video";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  collection: typeof collection;
  message: typeof message;
  openai: typeof openai;
  prompts: typeof prompts;
  text: typeof text;
  transcripts: typeof transcripts;
  video: typeof video;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
