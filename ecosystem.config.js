module.exports = {
	apps : [
		{
			name: 'Capsule Cat Server',
			script: 'npm start',
			watch: true,
			instances: 1,
			env: {
			},
			ignore_watch : ['node_modules'],
		},
	]
};
