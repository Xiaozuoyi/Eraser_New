import { v } from 'convex/values';
import { query } from './_generated/server';

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query('teams')
      .filter((q) => q.eq(q.field('createdBy'), args.email))
      .collect();

    return result;
  }
});
