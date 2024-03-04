import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

/**
 * 获取团队 - 根据用户邮箱获取团队
 * @param {string} email
 * @returns {Promise<unknown>}
 * @private {unknown}
 */
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

/**
 * 创建团队 - 创建团队
 * @param {string} name
 * @param {string} email
 * @returns {Promise<unknown>}
 * @private {unknown}
 */
export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('teams', args);
    return result;
  }
});
