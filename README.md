## [Curation Bot Simulator](https://fdsteemtools.neocities.org/curation_bot_simulator.html)

### About [Curation Bot Simulator](https://fdsteemtools.neocities.org/curation_bot_simulator.html)
Curation Bot Simulator is a tool made to analyze the *what-if* scenario when a user uses a bot to maximize the curation output from his/her upvotes.

The curation received mainly depends on 4 parameters:
* The total of the votes (rshares) before the voter
* The vote amount (your rshares)
* The time of the vote – if there will be a time penalty
* The vote that will be given after you – especially whale vote(rshares after)

While making experiments with [Curation Break-Down](https://fdsteemtools.neocities.org/curation_break_down.html) tool, I have realized the following curation data on trending posts.

![](https://steemitimages.com/DQmQ9tG5smhMWaLqDCxLtbg3K2MNnuaJVNR3nAgYvft1HMZ/image.png)

There are micro-votes that receive up to %500 of curation according to the vote value cast.

The %performance is calculated as 
curation to be received (SBD)/vote cast (SBD) %

This means these micro votes receive much higher value than a self-upvote just from curation.

How is this possible?

As we said, this is only possible by playing with the 4 parameters that are affecting the curation output.
Writing the curation formula:

![](https://steemitimages.com/DQmewNA2eMiELZcdPhgqV9L5Rsw4HZuYkH7LwMNwEFuTGE4/image.png)

Where 
y = curation received disregarding time penalty.
x= rshares of voter (you)

If our vote is not too much significant in the equation then we can have an approach where there is a constant value for different curation outputs.

This, I call Ratio.

![](https://steemitimages.com/DQmefYSHqMXSF4Y4jcJWkrVJZkq5XLzz6maw2TFHEGrWwSy/image.png)


This ratio is linear with the performance of curation with minimal votes.
Making some mathematical simulation:

![](https://steemitimages.com/DQmRwbazB5fxhXQ8emVCnSgnvqZ7LPQFXUu3nXthnQMVkT2/image.png)

it is observed that the ratio is linear for the curation output.

The most important part is, x, being your vote must be insignificant.
With trial and error, the best performance is achieved for 

![](https://steemitimages.com/DQmXHGDw1WwtN3HT5qfz839ddQtJ3Mk5ZGUFYX4jnAYsqf7/image.png)

To estimate the curation and to maximize it we certainly have to define the votes that will come after our vote and it must be a whale vote.

How can we know before a whale vote?

Bid-Bots is the answer.

If we listen to the steem blockchain, then we can see when people send money to bidbots and from the amount sent, we can predict the votes after.

This is the main function of curation bot simulator.

* Listenes to the blockchain
* When a bid is sent to bidbots calculates the most efficient vote and efficiency
* Simulates a vote casting operation if efficiency is >%100 
* Calculates the cumulative efficiency of all votes.

Below is a screen-shot of a simulation.

![](https://steemitimages.com/DQmerrZUBfUTEeK1tiC1BiMhhEHPzandESiXiEV5zF4ud2n/image.png)

As seen, %240 of voting power is used to cast 0.26 SBD worth vote and curation return is calculated to be 0.65 SBD ( 0.17 SP ) with an efficiency of %245

The votes are only cast when efficiency is calculated to be above %100


### How to use Curation Bot Simulator

* Go to link : https://fdsteemtools.neocities.org/curation_bot_simulator.html
* Write your 100% upvote worth as seen in https://steemnow.com

![](https://steemitimages.com/DQmeRgaFTMnEgBMHT4HLrScbGs5pUNBdPyCkpWyHCrHs1jK/image.png)

![](https://steemitimages.com/DQmfHYJTX2LA1ByqgpZk7Twck13q2Xgsm9g1GRVsgyhZQxH/image.png)

* Press “Start Simulation” button

![](https://steemitimages.com/DQmSUZFxbNySkHHDPrHjy4eEf4vL1QZBzJqHykRWGvU9pSY/image.png)

* The simulator will start and as upvotes are casted the performance will be seen in the simulation DIV

![](https://steemitimages.com/DQmeaBEvTB1cMcSByWueoMZVverG2veMYBynptX1XRJ9Zy9/image.png)

### Code

The full code can be found in [GitHub](https://github.com/firedreamgames/curation_bot_simulator/blob/master/curation_bot_simulator.js)
The explanations for each line of code is also implemented

### Road Map
This tool shows that, there is a way to get curation rewards equal to or higher than self-upvoting with micro votes.

Yet, personally, I don’t find it ethical to make a bot that will front-run the bid-bots.

The aim of this tool is to create public awareness that such a bot is possible and if realized, creates micro upvotes from multiple accounts disregarding the content, which should be considered as *contamination*

### Connect
@FireDream - Steemit

@firedream#3528 - Discord

### Links
Curation bot simulator: https://fdsteemtools.neocities.org/curation_bot_simulator.html
 
GitHub: https://github.com/firedreamgames/curation_bot_simulator

