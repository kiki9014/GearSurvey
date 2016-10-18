function sendData(data){
	try{
		SASocket.sendData(Channel_ID,data);
	}
	catch(error){
		onErrorComm(error);
	}
}

function onErrorComm(error){
	if(error.name == undefined)
		onerror(error);
	else
		console.log("Exception [" + error.name + "], msg: " + error.message);
}

function onerror(error){
	console.log(error);
}

var SAAgent = null, SASocket = null, Channel_ID = 104, providerName = "SAPTest001", isConnect = false;

var agentCallback = {
		onconnect : function(socket){
			SASocket = socket;
			
			SASocket.setSocketStatusListener(function(reason){
				console.log("service connection lost : " + reason);
				disconnect();
			});
			SASocket.setDataReceiveListener(onReceive);
		},
		onerror : onErrorComm
}

var peerAgentFindCallback = {
		onpeeragentfound : function(peerAgent){
			try{
				if(peerAgent.appName == providerName){
					SAAgent.setServiceConnectionListener(agentCallback);
					SAAgent.requestServiceConnection(peerAgent);
				}
				else{
					console.log("Not expected app!! " + peerAgent.appName);
				}
			}
			catch(err){
				console.log("exception [" + err.name + "] msg[" + err.message + "]");
			}
		},
		onerror : onErrorComm
}

function onsuccess(agents){
	try{
		if(agents.length > 0){
			SAAgent = agents[0];
			isConnect = true;
			
			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
		}
		else {
			console.log("Not onSuccess")
		}
	}
	catch(error){
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function connect(){
	if(SASocket){
		alert('Already connected');
		return false;
	}
	
	try{
		console.log("Connect start");
		webapis.sa.requestSAAgent(onsuccess, onErrorComm)
	}
	catch(err){
		console.log("Connect function has error");
		onErrorComm(err);
	}
}

function disconnect(){
	try{
		if(SASocket!= null){
			SASocket.close();
			SASocket = null;
		}
	}
	catch(err){
		onErrorComm(err);
	}
}

function onReceive(channelId, data){
	alert(data);
}

function send(data){
	try{
		SASocket.sendData(Channel_ID, data);
	}
	catch(err){
		onErrorComm(err);
	}
}

function requestConnect(){
	connect();
	if(!isConnect)
		window.setInterval(requestConnect, 30000);
}