export const SITE_URL = "https://pixel-perfect-polish-550.lovable.app";

/** Absolute URL for a route path, e.g. absoluteUrl("/about"). */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}
