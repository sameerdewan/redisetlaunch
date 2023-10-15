import {Repository} from "redis-om";
import Flag from "@/models/Flag";
import redis from "@/lib/redis";

const FlagRepository = new Repository(Flag, redis);

export default FlagRepository;
