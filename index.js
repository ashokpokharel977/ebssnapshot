// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
//AWS.config.loadFromPath('./config.json');
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.EC2MetadataCredentials();
// Create EC2 service object
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
var volumeParams = {
	Filters: [
		{
			Name: 'tag:Owner',
			Values: [ 'ashok' ]
		}
	]
};
ec2.describeVolumes(volumeParams, function(err, data) {
	if (err) console.log(err, err.stack);
	else {
		console.log(data);
		var params = {
			Description: 'This is my root volume snapshot.',
			VolumeId: data.Volumes[0].VolumeId
		};
		ec2.createSnapshot(params, function(err, data) {
			if (err)
				console.log(err, err.stack); // an error occurred
			else console.log(data); // successful response

			data = {
				Description: 'This is my root volume snapshot.',
				SnapshotId: 'snap-066877671789bd71b',
				State: 'pending'
			};
		});
	}
});
