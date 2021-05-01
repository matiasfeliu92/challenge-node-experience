import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class ListItemsUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;