let AWS = require('aws-sdk');
const sns = new AWS.SNS();
exports.handler = function (event, context, callback) {

	let receiverNumber = event['receiver'];
	let sender = event['sender'];
	let message = event['message'];

	sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiverNumber
	}).promise()
		.then(data => {
			console.log("Sent SMS to", receiverNumber);
			callback(null, {...event, status: 'Successful'});
		})
		.catch(err => {
			console.log("Failed to send SMS", err);
			callback(err, {...event, status: 'Failed'});
		});
}