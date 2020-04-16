run:
		(json-server --watch dev/mockAPI.js --port 3001 & yarn start)

server:
		json-server --watch dev/mockAPI.js --port 3001
