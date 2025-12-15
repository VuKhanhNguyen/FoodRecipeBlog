/* eslint-disable max-len */
import HTTP_STATUS_CODES from "@src/common/constants/HTTP_STATUS_CODES";
import { RouteError } from "@src/common/util/route-errors";
import { ICommentRepo, CommentRepo } from "@src/repos/CommentRepo";
import { IComment } from "@src/models/Comment";

export const COMMENT_NOT_FOUND_ERR = "Comment not found";

export class CommentService {
  private commentRepo: ICommentRepo = new CommentRepo();

  public async getAll(): Promise<IComment[]> {
    return this.commentRepo.getAll();
  }

  public async getOne(id: string): Promise<IComment | null> {
    const comment = await this.commentRepo.getById(id);
    if (!comment) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, COMMENT_NOT_FOUND_ERR);
    }
    return comment;
  }

  public async getByAuthor(author: string): Promise<IComment[]> {
    return this.commentRepo.getByAuthor(author);
  }

  public async getByRecipeId(recipeId: string): Promise<IComment[]> {
    return this.commentRepo.getByRecipeId(recipeId);
  }

  public async createComment(
    commentData: Omit<IComment, "_id" | "createdAt" | "updatedAt">
  ): Promise<IComment> {
    return this.commentRepo.add(commentData);
  }

  public async updateComment(
    id: string,
    commentData: Partial<IComment>
  ): Promise<IComment | null> {
    const comment = await this.commentRepo.getById(id);
    if (!comment) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, COMMENT_NOT_FOUND_ERR);
    }
    return this.commentRepo.update(id, commentData);
  }

  public async deleteComment(id: string): Promise<void> {
    const comment = await this.commentRepo.getById(id);
    if (!comment) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, COMMENT_NOT_FOUND_ERR);
    }
    await this.commentRepo.delete(id);
  }
}

export default new CommentService();
