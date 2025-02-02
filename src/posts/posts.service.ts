import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { share } from 'rxjs';

@Injectable()
export class PostsService {
     constructor(
          @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase <typeof schema>,
     ){}

     async getPosts(){
          return this.database.query.posts.findMany();
     }

     async createPost(post: typeof schema.posts.$inferInsert){
          await this.database.insert(schema.posts).values(post);
     }
}
