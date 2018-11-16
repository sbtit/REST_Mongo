#!/usr/bin/env python
#encoding: utf8

import pymongo
import paho.mqtt.client as mqtt
import json
from datetime import datetime

host = '10.210.11.25'
port = 1883
#topic_temp = 'test/a/temp'
#topic_pre = "test/a/pre"
#topic_hum = "test/a/hum"
topic = "test/room"

con = pymongo.MongoClient('localhost',27017)

def on_connect(client, userdata, flags, respons_code):
    print('status {0}'.format(respons_code))
    client.subscribe(topic)
    #client.subscribe(topic_temp)
    #client.subscribe(topic_pre)
    #client.subscribe(topic_hum)

def on_message(client, userdata, msg):
    print(msg.topic + ' ' + str(msg.payload))
    json_dict = json.loads(msg.payload)
    room = json_dict["room"]
    db = con['test']
    col = db["a"]
    col.insert(json_dict)
    for data in col.find(json_dict):
        print(data)
 
if __name__ == '__main__':

    # Publisherと同様に v3.1.1を利用
    client = mqtt.Client(protocol=mqtt.MQTTv311)

    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(host, port=port, keepalive=60)

    # 待ち受け状態にする
    client.loop_forever()

