import { REQUIRED_MAJOR_VERSION } from "./constants.js";
import { UnsupportedVersionError } from "./errors.js";
import type { HttpClient } from "./http.js";

/**
 * Response shape from the VergeOS `/version.json` endpoint.
 */
interface VersionResponse {
  version: string;
}

/**
 * Parse a VergeOS version string and extract the major version number.
 *
 * Handles formats: `"26.0.0"`, `"v26.0.0"`, `"26.0.0-beta1"`, `"4"`.
 * Returns `0` for unparseable input (empty string, non-numeric, etc.).
 *
 * @param v - Raw version string from the server
 * @returns The major version as an integer, or `0` if unparseable
 */
export const parseVersion = (v: string): number => {
  // Strip optional "v" prefix
  let cleaned = v.startsWith("v") ? v.slice(1) : v;

  // Strip dash-suffixed pre-release tags (e.g., "26.0.0-beta1" → "26.0.0")
  const dashIdx = cleaned.indexOf("-");
  if (dashIdx !== -1) {
    cleaned = cleaned.slice(0, dashIdx);
  }

  // Split on dot and parse first segment
  const parts = cleaned.split(".");
  const major = Number.parseInt(parts[0] as string, 10);
  return Number.isNaN(major) ? 0 : major;
};

/**
 * Fetch `/version.json` from the VergeOS server and validate that the
 * major version matches {@link REQUIRED_MAJOR_VERSION}.
 *
 * @param http - An authenticated {@link HttpClient} instance
 * @returns The raw version string from the server (e.g., `"26.1.0"`)
 * @throws {@link UnsupportedVersionError} if the major version is not 26
 */
export const checkServerVersion = async (http: HttpClient): Promise<string> => {
  const resp = await http.getAbsolute<VersionResponse>("/version.json");
  const rawVersion = resp.version;
  const major = parseVersion(rawVersion);

  if (major !== REQUIRED_MAJOR_VERSION) {
    throw new UnsupportedVersionError(
      rawVersion,
      `${REQUIRED_MAJOR_VERSION}.x`,
    );
  }

  return rawVersion;
};
