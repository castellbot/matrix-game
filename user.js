var User = function(username, blocks, sessionid, score){
	this.username = username;
	this.blocks = blocks;
	this.sessionid = sessionid;
	this.score = score;
	
	this.less = function(){
		if(this.blocks >= 0){
			--this.blocks;
		}else{
			this.blocks = -1;
		}
		return this.blocks;
	}
};

module.exports = User;