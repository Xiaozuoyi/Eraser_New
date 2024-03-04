import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

/**
 * 获取用户 - 根据用户邮箱获取用户
 * @param {string} email
 * @returns {Promise<unknown>}
 * @private {unknown}
 */
export const getUser = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    return result;
  }
});

/**
 * 创建用户
 * @param {string} name
 * @param {string} email
 * @param {string} image
 * @returns {Promise<unknown>}
 * @private {unknown}
 */
export const createUser = mutation({
  args: { name: v.string(), email: v.string(), image: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert('user', args);
  }
});
