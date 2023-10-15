import {Repository} from "redis-om";
import Environment from "@/models/Environment";
import redis from "@/lib/redis";

const EnvironmentRepository = new Repository(Environment, redis);

export default EnvironmentRepository;
