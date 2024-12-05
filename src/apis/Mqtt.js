import mqtt from 'mqtt'

let mqttClient = null

export const connect = (onMessageReceived, onError) => {
  const options = {
    username: 'my_mqtt',  // Replace with your MQTT username
    password: 'hellomqtt',  // Replace with your MQTT password
    clean: true,
    connectTimeout: 4000,
    clientId: 'mqtt_client_' + Math.random().toString(16).substr(2, 8),
    protocol: 'wss',
    rejectUnauthorized: false
  };

  // Connect to MQTT broker with credentials
  mqttClient = mqtt.connect('wss://897e4e4bd28b411ba2464a4019281121.s1.eu.hivemq.cloud:8884/mqtt', options)

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker')
    
    mqttClient.subscribe('sensorData', (err) => {
      if (err) {
        console.error('Subscription error:', err)
        if (onError) onError(err)
      }
    });
  });

  mqttClient.on('message', (topic, message) => {
    try {
      const data = JSON.parse(message.toString())
      onMessageReceived(data)
    } catch (error) {
      console.error('Error parsing message:', error)
      if (onError) onError(error)
    }
  });

  mqttClient.on('error', (error) => {
    console.error('MQTT connection error:', error)
    if (onError) onError(error)
  })
}

export const disconnect = () => {
  if (mqttClient) {
    mqttClient.end()
    console.log('Disconnected from MQTT broker')
  }
}