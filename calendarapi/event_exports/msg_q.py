import pika

# Recieves event as msg
def produce_export(msg):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()


    channel.queue_declare(queue='MQ')

    channel.basic_publish(exchange='',
                          routing_key='MQ',
                          body=msg)
    print("Exported event")
    connection.close()


def consume_export():

    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()


    channel.queue_declare(queue='MQ')

    def callback(ch, method, properties, body):
        print("Received %r" % body)
        #Call CanvasExport with msg

    channel.basic_consume(callback,
                          queue='MQ',
                          no_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
