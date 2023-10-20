import {Nullable} from "@/lib/utils";
import {Application} from "@/data/types";

export interface ApplicationParityInterface {
    saveApplication(application: Application): Promise<Nullable<Application>>;
    deleteApplicationByIdAndUserId(id: string, userId: string): Promise<Nullable<Application>>
}
