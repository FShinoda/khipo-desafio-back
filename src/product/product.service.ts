import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({where: {id}});
    }

    async create(product: CreateProductDto): Promise<Product> {
        return this.productRepository.save(product);
    }

    async update(product: UpdateProductDto): Promise<Product> {
        return this.productRepository.save(product);

    }

    async delete(id: number): Promise<void> {
        const product = await this.findOne(id);
        this.productRepository.remove(product);
    }
}