import {Repository} from "redis-om";
import Application from "@/models/Application";
import redis from "@/lib/redis";

const ApplicationRepository = new Repository(Application, redis);

ApplicationRepository.createIndex();

export default ApplicationRepository;
