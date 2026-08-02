declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SECRET_KEY?: string;
    SEGMENT_FORMS_WRITE_KEY?: string;
    GITHUB_TOKEN?: string;
    GITHUB_API_TOKEN?: string;
  }
}

declare module "cloudflare:workers" {
  export const env: Cloudflare.Env;
}
