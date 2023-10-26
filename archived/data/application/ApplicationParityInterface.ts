import {Nullable} from "@/lib/utils";
import {Application, BaseParityInterface} from "@/archived/data/types";

export interface ApplicationParityInterface extends BaseParityInterface<Application> {
    saveApplication(application: Application): Promise<Nullable<Application>>;
    deleteApplicationByIdAndUserId(id: string, userId: string): Promise<Nullable<Application>>
}
