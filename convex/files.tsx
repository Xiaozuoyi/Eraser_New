import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

/**
 * 创建新文件。
 *
 * @param fileName - 文件名.
 * @param teamId - 文件所属团队的ID.
 * @param createdBy - 创建文件的用户 ID。
 * @param archive - 表示文件是否应归档。
 * @param document - 与文件相关的文档。
 * @param whiteboard - 与文件相关的白板。
 * @returns 解析为创建文件的Promise。
 */
export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('files', args);
    return result;
  }
});

/**
 * 根据提供的团队ID检索文件。
 *
 * @param {string} teamId - 团队的ID。
 * @returns {Promise<Array<Object>>} - 解析为文件数组的Promise。
 */
export const getFiles = query({
  args: {
    teamId: v.string()
  },
  handler: async (ctx, args) => {
    const result = ctx.db
      .query('files')
      .filter((q) => q.eq(q.field('teamId'), args.teamId))
      .collect();
    return result;
  }
});
