import Specification from "../../entities/Specification";
import ISpecificationsRepository from "../../repositories/contracts/ISpecificationsRepository";
import {inject, injectable} from "tsyringe";

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
            throw new Error("Specification already exists");
        }

        return this.specificationRepository.create({
            name,
            description
        });
    }
}
