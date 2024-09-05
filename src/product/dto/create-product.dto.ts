import { IsDecimal, IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    
    @IsEmpty({message: "The id must be empty. It is autogenerated."})
    id: number;

    @IsNotEmpty({message: 'The atribute name is mandatory'})
    @IsString()
    @MinLength(3, {message: "The product name must have at least 3 characters"})
    @MaxLength(255, {message: 'The product name must not exceed 255 characters'})
    name: string;

    @IsNotEmpty({message: 'The atribute price is mandatory.'})
    @IsNumber({maxDecimalPlaces: 2}, {message: "The price must be a number with two decimal places"})
    @Min(0.01, {message: "The price must be above zero"})
    price: number;

    @IsNotEmpty({message: 'The atribute brand is mandatory.'})
    @IsString()
    @MinLength(3, {message: "The product brand must have at least 3 characters"})
    @MaxLength(255, {message: 'The product brand must not exceed 255 characters'})
    brand: string;

    @IsNotEmpty({message: 'The atribute image is mandatory.'})
    image: string;

    @IsEmpty({message: "The createdAt must be empty. It is autogenerated."})
    createdAt: Date;
}