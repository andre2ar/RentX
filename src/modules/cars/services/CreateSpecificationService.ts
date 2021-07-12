import Specification from "../models/Specification";
import ISpecificationsRepository from "../repositories/specifications/ISpecificationsRepository";

interface ICreateSpecification {
    name: string;
    description: string;
}

export class CreateSpecificationService {
    constructor(
        private specificationRepository: ISpecificationsRepository
    ) {}

    execute({name, description}: ICreateSpecification): Specification {
        const specificationExists = this.specificationRepository.findByName(name);

        if(specificationExists) {
            throw new Error("Specification already exists");
        }

        return this.specificationRepository.create({
            name,
            description
        });
    }
}
