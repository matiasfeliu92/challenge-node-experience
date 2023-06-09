import { getRequestContext } from '../../Presentation/Shared/RequestContext';
import { DependencyContainer } from 'tsyringe';
import ISeed from './ISeed';

abstract class BaseSeed implements ISeed
{
    protected container: DependencyContainer | undefined;

    constructor()
    {
        this.container = getRequestContext().container;
    }

    abstract init(): Promise<void>;
}

export default BaseSeed;
