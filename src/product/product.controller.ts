import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('produtos/')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() : Promise<Product[]> {
        try{
            return this.productService.findAll();
        } catch(err){
            throw new InternalServerErrorException(`Unexpected error when trying to reach all products: ${err}`);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number) : Promise<Product>{
        try{
            const productFound = await this.productService.findOne(id);
            if(!productFound) {
                throw new NotFoundException(`Product with id ${id} not found`);
            }

            return productFound;
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }
            
            throw new InternalServerErrorException(`Unexpected error when trying to find product with id ${id}: ${err}`);
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() product: CreateProductDto) : Promise<Product> {
        try {
            return await this.productService.create(product);
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw new BadRequestException('Invalid product data');
            }

            throw new InternalServerErrorException(`Unexpected error when trying to create new product: ${err}` )
        }
    }

    @Put()
    async update(@Body() product: UpdateProductDto) : Promise<Product> {
        try {
            var productToUpdate = await this.productService.findOne(product.id);
            if(!productToUpdate) {
                throw new NotFoundException(`Product with id ${product.id} not found`);
            }

            return await this.productService.update(product);

        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }

            throw new InternalServerErrorException(`Unexpected error when updating product with id ${product.id}: ${err}` )
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<void> {
        try {
            var productToDelete = await this.productService.findOne(id);
            if(!productToDelete) {
                throw new NotFoundException(`Product with id ${id} not found`);
            }
            return this.productService.delete(id);
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }

            throw new InternalServerErrorException(`Unexpected error when deleting product with id ${id}: ${err}` )
        }

    }
}