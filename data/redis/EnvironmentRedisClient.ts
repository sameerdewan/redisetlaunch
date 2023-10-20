import {Entity} from "redis-om";
import {RedisRepositoryClient} from "@/lib/redis";
import {Nullable} from "@/lib/utils";
import {Environment} from "@/data/types";

class EnvironmentRedisClient extends RedisRepositoryClient<Environment> {

}
