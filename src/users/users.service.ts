import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { LoginUserRequest } from './dto/login-user-request';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
     constructor(
          @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
          private readonly jwtService: JwtService,
     ){}

     async getUsers() {
          try {
               return await this.database.query.users.findMany();
           } catch (error) {
               throw new NotFoundException('Failed to fetch users');
           }
     }

     async createUser(user: typeof schema.users.$inferInsert){
          try{
               const hashedPassword = await bcrypt.hash(user.password, 10);
               const result = await this.database.insert(schema.users).values({...user, password:hashedPassword}).returning();
               return result[0];
          }catch(error){
               throw new NotFoundException("Couldn't create user")
          }
     }

     async loginUser(loginData: LoginUserRequest){
          try{
               const user = await this.database.query.users.findFirst({
                    where: eq(schema.users.email, loginData.email),
                });

                if (!user) {
                    throw new UnauthorizedException('Invalid email or New User');
                }

                const isPasswordCorrect = await bcrypt.compare(loginData.password, user.password);

                if (!isPasswordCorrect) {
                    throw new UnauthorizedException('Invalid password');
                }

                const payload = {userId: user.id, email: user.email, role: user.role};

                const token = this.jwtService.sign(payload);

                return { token };
          }catch(error){
               throw new NotFoundException("Couldn't login" + error);
          }
     }
}
