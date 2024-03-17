import {v} from 'convex/values';
import {mutation, query} from './_generated/server';

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
            .order('desc')
            .collect();
        return result;
    }
});

/**
 * 根据提供的文件ID检索文件。
 *
 * @param {string} fileId - 文件的ID。
 * @returns {Promise<Object>} - 解析为更新后的文件的Promise。
 */
export const updateDocument = mutation({
    args: {
        _id: v.id("files"),
        document: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {document: args.document});
        return result;
    }
});
/**
 * 该函数是一个通过 ID 检索文件的查询。
 *
 * @function getFileById
 * @param {Object} args - 查询的参数。
 * @param {string} args.fileId - 要检索的文件的ID。
 * @returns {Promise<Object>} - 解析为检索到的文件的Promise。
 */
export const getFileById = query({
    args: {
        fileId: v.id("files")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.fileId);
        return result;
    }
});
/**
 * 这个函数是一个变异，它通过文件的ID更新白板的内容。
 *
 * @function updateWhiteboard
 * @param {Object} args - 变异的参数。
 * @param {string} args.fileId - 要更新的文件的ID。
 * @param {string} args.whiteboard - 新的白板内容。
 * @returns {Promise<Object>} - 解析为更新后的文件的Promise。
 */
export const updateWhiteboard = mutation({
    args: {
        fileId: v.id("files"),
        whiteboard: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.fileId, {whiteboard: args.whiteboard});
        return result;
    }
});