import Specification from "../../entities/Specification";

export interface ICreationSpecificationDTO {
    name: string;
    description: string;
}

export default interface ISpecificationsRepository
{
    create({name, description}: ICreationSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
}
