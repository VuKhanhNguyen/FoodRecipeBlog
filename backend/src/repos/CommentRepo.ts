/* eslint-disable max-len */
import { IBaseRepo } from './BaseRepo';
import { IComment, CommentModel } from '@src/models/Comment';

export interface ICommentRepo extends IBaseRepo<IComment> {
  getByRecipeId: (recipeId: string) => Promise<IComment[]>;
  getByAuthor: (author: string) => Promise<IComment[]>;
}

export class CommentRepo implements ICommentRepo {
  private model = CommentModel;

  public async getAll(): Promise<IComment[]> {
    return this.model.find({}).exec() as Promise<IComment[]>;
  }

  public async getById(id: string): Promise<IComment | null> {
    return this.model.findById(id).exec() as Promise<IComment | null>;
  }

  public async add(data: Omit<IComment, '_id' | 'createdAt' | 'updatedAt'>): Promise<IComment> {
    const newComment = new this.model(data);
    return newComment.save() as Promise<IComment>;
  }

  public async update(id: string, data: Partial<IComment>): Promise<IComment | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec() as Promise<IComment | null>;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async getByRecipeId(recipeId: string): Promise<IComment[]> {
    return this.model.find({ recipeId }).exec() as Promise<IComment[]>;
  }
  public async getByAuthor(author: string): Promise<IComment[]> {
    return this.model.find({ author }).exec() as Promise<IComment[]>;
  }

}
