import { auth } from "@/lib/auth";
// import { polarClient } from "@/lib/polar"; // uncomment when Polar is set up
// import {
//   MAX_FREE_AGENTS,
//   MAX_FREE_MEETINGS,
// } from "@/modules/premium/constants"; // uncomment when premium module is set up
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return { session };
});

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({ ctx: { ...ctx, auth: ctx.session } });
});

// premiumProcedure — uncomment when Polar and premium module are set up
// export const premiumProcedure = (entity: "meetings" | "agents") =>
//   protectedProcedure.use(async ({ ctx, next }) => {
//     const customer = await polarClient.customers.getStateExternal({
//       externalId: ctx.auth.user.id,
//     });
//
//     const [userMeetings] = await db
//       .select({
//         count: count(meetings.id),
//       })
//       .from(meetings)
//       .where(eq(meetings.userId, ctx.auth.user.id));
//
//     const [userAgents] = await db
//       .select({
//         count: count(agents.id),
//       })
//       .from(agents)
//       .where(eq(agents.userId, ctx.auth.user.id));
//
//     const isPremium = customer.activeSubscriptions.length > 0;
//     const isFreeAgentLimitReached = userAgents.count >= MAX_FREE_AGENTS;
//     const isFreeMeetingLimitReached = userMeetings.count >= MAX_FREE_MEETINGS;
//
//     const shouldThrowMeetingError =
//       entity === "meetings" && isFreeMeetingLimitReached && !isPremium;
//     const shouldThrowAgentError =
//       entity === "agents" && isFreeAgentLimitReached && !isPremium;
//
//     if (shouldThrowMeetingError) {
//       throw new TRPCError({
//         code: "FORBIDDEN",
//         message: "You have reached the maximum number of free meetings",
//       });
//     }
//
//     if (shouldThrowAgentError) {
//       throw new TRPCError({
//         code: "FORBIDDEN",
//         message: "You have reached the maximum number of free agents",
//       });
//     }
//
//     return next({ ctx: { ...ctx, customer } });
//   });
