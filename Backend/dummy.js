import mongoose from "mongoose";
import { Subscription } from "./src/models/subscription.model.js";

const dummySubscriptions = [
    { subscriber: "dummySubscriber1", channel: "dummyChannel1" },
    { subscriber: "dummySubscriber2", channel: "dummyChannel2" },
    { subscriber: "dummySubscriber3", channel: "dummyChannel3" },
    { subscriber: "dummySubscriber4", channel: "dummyChannel4" },
    { subscriber: "dummySubscriber5", channel: "dummyChannel5" },
  ];
  
  // Using Promise.all() to asynchronously save all dummy subscriptions
  Promise.all(
    dummySubscriptions.map((dummyData) => {
      const subscription = new Subscription(dummyData);
      return subscription.save();
    })
  )
    .then((savedSubscriptions) => {
      console.log("Dummy subscriptions saved successfully:", savedSubscriptions);
    })
    .catch((error) => {
      console.error("Error saving dummy subscriptions:", error);
    });
  