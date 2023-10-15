import {Repository} from "redis-om";
import Subscription from "@/models/Subscription";
import redis from "@/lib/redis";

const SubscriptionRepository = new Repository(Subscription, redis);

export default SubscriptionRepository;
