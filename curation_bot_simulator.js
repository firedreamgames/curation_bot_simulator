    steem.api.setOptions({
      url: 'https://api.steemit.com'
    });
    // bot array from steembottracker
	var bots = ["postdoctor", "moneymatchgaming", "slimwhale", "boostbot", "honestbot", "ebargains", "lost-ninja", "estream.studios", "adriatik", "redwhale", "minnowhelper", "mrswhale", "foxyd", "mitsuko", "dailyupvotes", "lovejuice", "steembloggers", "booster", "megabot", "voterunner", "authors.league", "canalcrypto", "whalebuilder", "mercurybot", "msp-bidbot", "promobot", "upmewhale", "redlambo", "lrd", "lightningbolt", "sunrawhale", "upyou", "thebot", "onlyprofitbot", "pushbot", "flymehigh", "nado.bot", "seakraken", "spydo", "childfund", "minnowvotes", "dolphinbot", "upme", "upboater", "proffit", "bluebot", "brupvoter", "oceanwhale", "jerrybanfield", "luckyvotes", "minnowfairy", "estabond", "bodzila", "peace-bot", "appreciator", "discordia", "emperorofnaps", "zapzap", "cryptoempire", "bearwards", "alphaprime", "therising", "buildawhale", "aksdwi", "sleeplesswhale", "isotonic", "noicebot", "upgoater", "dlivepromoter", "upmyvote", "youtake", "smartsteem", "fishbaitbot", "rocky1", "shares", "boomerang", "brandonfrye", "postpromoter", "pushup", "singing.beauty", "edensgarden", "pwrup", "inciter", "chronocrypto", "allaz", "sneaky-ninja"];
    var votetotal = 0;
    var percenttotal = 0;
    var curationtotal = 0;
    var cumeff = 0;
    var counter = 0;
    var feed;
    // Get the current feed-price. It will be used for SBD-Steem calculation
     steem.api.getFeedHistory(function(err, res) {
      feed = parseFloat(res.current_median_history.base);

    });
	
	
// Initial function - Get the real-time transaction data from steem blockchain
    function search() {


      var release = steem.api.streamTransactions('head', function(err, result) {

        if (result.operations["0"]["0"] == 'vote') { // This is to put a visual indicator that the bot is working.Vote selected for high transaction amount.
          document.getElementById("err_div").innerHTML = document.getElementById("err_div").innerHTML + ".";
          counter++;
          if (counter > 30) {
            document.getElementById("err_div").innerHTML = "Online";
            counter = 0;
			  

          }
        }
		// check if the operation is a tranfer and if the receiver is a bot
        if ((result.operations["0"]["0"] == 'transfer') && (bots.includes(result.operations["0"]["1"].to))) {
          console.log(parseFloat(result.operations["0"]["1"].amount));
          if (parseFloat(result.operations["0"]["1"].amount) >= 0.5) { // check if the amount is big enough.

            var amount = result.operations["0"]["1"].amount;
            var link = result.operations["0"]["1"].memo;
            var bid_bot = result.operations["0"]["1"].to;
            //console.log(amount,link);
            get_post(amount, link);// send the transfer amount and post link to get the post data.
          }
        }


      });

    }
	// function for calculating curation
    function get_post(amount, link) {
      var perm = link.split("/"); //split the url to get permlink and user
      var length_perm = perm.length;
      var permlink = perm[length_perm - 1]; //the permlink is the last element after "/" sign 
      var user_raw = perm[length_perm - 2]; //form the array to find the user to be voted - user is found at the one before final element of array 
      var usmat = user_raw.split("@"); //we need the username without @sign, so split the raw array
      var author = usmat[usmat.length - 1]; //user name is the last element of the array  
      var ratio;
      steem.api.getContent(author, permlink, function(err, result) { // get values from steem.api for the post content

        var pay_out = parseFloat(result.pending_payout_value);// make pay-out float
        var post_date = Date.parse(result.created);//make post date *timestamp*
        var now = new Date;
        var utc_now = now.getTime() + now.getTimezoneOffset() * 60000;//convert now to UTC since post date is in UTC
        var diff = (utc_now - post_date) / (60 * 1000);// find how old is the post * to use in calculation of time penalty*
        var penalty = diff / 30; // find the difference from 30 mins
        if (penalty > 1) {// if over 30 mins no extra bonus for the post
          penalty = 1;
        }

        //console.log("link: ", link);
        //console.log("time difference ", diff);

        var before = pay_out;
        var bot_estimated = (parseFloat(amount) * 2.1); // estimate that bot will pay 2.1 times the money sent as SBD

        if (before != 0) {
          ratio = (Math.sqrt(bot_estimated) / Math.sqrt(before)) * penalty;// ratio for maximum efficiency ( this is for investigation )
        }
        if (before == 0) {
          ratio = (Math.sqrt(bot_estimated) / 0.01) * penalty;// avoid division by zero error
        }

        var max_vote = parseFloat(document.getElementById("SBDinput").value);
        var eff_vote = before / 6; // maximum efficiency is calculated when vote is approximately 1/6 of previous votes
        if (eff_vote < 0.01) {
          eff_vote = 0.01;// if efficient vote is calculated very small, use 0.01 SBD as vote value
        }
        if (eff_vote >= max_vote) {
          eff_vote = max_vote; //if efficient vote is very big, use your max vote as value

        }
        percentage = (eff_vote / max_vote) * 100 // find % of vote to be sent
        var curation = (eff_vote + before + bot_estimated) * 0.25; // calculate total future curation after bot vote




       // console.log("before:", before, "bot bid: ", bot_estimated, "ratio: ", ratio, "efficient vote: ", eff_vote, "percent vote: % ", percentage);

        write_div(before, bot_estimated, ratio, eff_vote, penalty, percentage, link, diff, curation);//send the data to write div

      });

    }

    function write_div(before, bot_estimated, ratio, eff_vote, penalty, percentage, link, diff, curation) {

	// calculate curation reward based on estimated total curation
      var curation_received = ((((Math.sqrt(eff_vote + before) - Math.sqrt(before)) / Math.sqrt(eff_vote + before + bot_estimated)))) * curation * penalty;
     // calculate efficiency based on received curation
		var efficiency = ((curation_received / eff_vote)) * 100;
      //console.log("efficiency: ", efficiency, "curation total :", curation, "curation received: ", curation_received);

	// WRITE ALL THE CALCULATED DATA TO DIV'S
      var str = link;
      var lin1 = link.substring(0, 30);
      var lin2 = link.substring(0, 110);

      document.getElementById("link").innerHTML = lin2.link(str);
      document.getElementById("age").innerHTML = diff.toFixed(2) + " min.";
      document.getElementById("before").innerHTML = before.toFixed(2) + " SBD";
      document.getElementById("botvote").innerHTML = bot_estimated.toFixed(2) + " SBD";
      document.getElementById("ratio").innerHTML = ratio.toFixed(2);
      document.getElementById("max_eff_vote").innerHTML = eff_vote.toFixed(2) + " SBD";
      document.getElementById("percent").innerHTML = percentage.toFixed(2) + " %";
      document.getElementById("curation").innerHTML = curation_received.toFixed(2) + " SBD" + "(" + (curation_received / feed).toFixed(2) + " SP)";
      document.getElementById("efficiency").innerHTML = efficiency.toFixed(2) + " %";


      if (efficiency >= 100) {
        document.getElementById("sim_link").innerHTML = document.getElementById("sim_link").innerHTML + lin1.link(str) + "<br />";
        votetotal = votetotal + eff_vote;
        document.getElementById("sim_vote").innerHTML = document.getElementById("sim_vote").innerHTML + eff_vote.toFixed(2) + " SBD" + "<br />";
        document.getElementById("h_vote").innerHTML = "Vote " + votetotal.toFixed(2) + " SBD";


        percenttotal = percenttotal + percentage;
        document.getElementById("sim_percent").innerHTML = document.getElementById("sim_percent").innerHTML + percentage.toFixed(2) + " %" + "<br />";
        document.getElementById("h_percent").innerHTML = "Used% " + percenttotal.toFixed(2);

        curationtotal = curationtotal + curation_received;
        document.getElementById("sim_curation").innerHTML = document.getElementById("sim_curation").innerHTML + curation_received.toFixed(2) + " SBD" + "(" + (curation_received / feed).toFixed(2) + " SP)" + "<br />";
        document.getElementById("h_curation").innerHTML = "Curation" + "<br />" + curationtotal.toFixed(2) + " SBD" + "(" + (curationtotal / feed).toFixed(2) + " SP)";

        cumeff = (curationtotal / votetotal) * 100
        document.getElementById("sim_efficiency").innerHTML = document.getElementById("sim_efficiency").innerHTML + efficiency.toFixed(2) + " %" + "<br />";
        document.getElementById("h_eff").innerHTML = "Eff: " + cumeff.toFixed(2) + " %";


      }




    }
	
	// function for error proofing the input field
	function check(){
		var val=(document.getElementById("SBDinput").value);
		if (val==""){
			window.alert("Please enter your vote value at %100");// check if the user entered a value in text field
					
		}
		if(val<=0){
			window.alert("Vote value can't be zero or negative");//check if the value is zero or negative
		}
		if((val!="")&&(val>0)){
		search();
		}
	}
  