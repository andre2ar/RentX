import {inject, injectable} from "tsyringe";
import AppError from "@shared/errors/AppError";
import ISpecificationsRepository from "@modules/cars/repositories/contracts/ISpecificationsRepository";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpecification {
    name: string;
    description: string;
}

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({name, description}: ICreateSpecification): Promise<Specification> {
        const specificationExists = await this.specificationRepository.findByName(name);

        if(specificationExists) {
            throw new AppError("Specification already exists");
        }

        return this.specificationRepository.create({
            name,
            description
        });
    }
}
