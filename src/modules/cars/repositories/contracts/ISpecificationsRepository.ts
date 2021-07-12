import Specification from "../../models/Specification";

export interface ICreationSpecificationDTO {
    name: string;
    description: string;
}

export default interface ISpecificationsRepository
{
    create({name, description}: ICreationSpecificationDTO): Specification;
    findByName(name: string): Specification;
}
