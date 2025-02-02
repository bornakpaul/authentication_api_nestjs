import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from '../users/schema';
import * as postSchema from '../users/schema';

@Module({
     providers: [
          {
               provide: DATABASE_CONNECTION,
               useFactory: (configService: ConfigService) => {
                    const pool = new Pool({
                         connectionString: configService.getOrThrow('DATABASE_URL')
                    });
                    return drizzle(pool,{
                         schema: {
                              ...userSchema,
                              ...postSchema,
                         }
                    });
               },
               inject: [ConfigService,]
          }
     ],
     exports: [DATABASE_CONNECTION,]
})
export class DatabaseModule {}
