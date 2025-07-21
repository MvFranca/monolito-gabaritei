import { Field, InputType, } from "@nestjs/graphql";
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ModuleByIdInput {
    
    @Field()
    @IsNotEmpty()
    moduleId!: string;

    @Field()
    @IsNotEmpty()
    userId!: string;
}