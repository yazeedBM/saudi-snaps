/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      const cf = request.cf || {};
      return Response.json({
        status: "ok",
        edge: {
          colo:    cf.colo    || "unknown",
          country: cf.country || "unknown",
          city:    cf.city    || "unknown",
        },
        timestamp: new Date().toISOString(),
      });
    }

    return env.ASSETS.fetch(request);
  },
};
