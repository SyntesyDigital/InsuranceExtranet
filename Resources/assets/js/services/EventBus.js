import PubSub from 'pubsub-js';

// OPTIMIZE : investigate https://github.com/winstonjs/winston#motivation 
/*
 *  EventBus
 *  Just a wrapper of PubSubJS (https://github.com/mroderick/PubSubJS)
 */
class EventBus {
    subscribe(message, func) {
        console.log('[EVENT] SUBSCRIBE : ',message);
        return PubSub.subscribe(message, func);
    }
    publish(message, payload) {
        console.log('[EVENT] TYPE : ' ,message,payload);
        return PubSub.publish(message, payload);
    }
    unsubscribe(token) {
        return PubSub.unsubscribe(token);
    }
    clearAllSubscriptions() {
        return PubSub.clearAllSubscriptions();
    }
    getSubscriptions(token) {
        return PubSub.getSubscriptions(token);
    }
}
export default EventBus = new EventBus();