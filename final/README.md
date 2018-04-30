# Final Project: Stock Notebook

### Yoyo Yeh wy28, Zachary Liu zl101

#### Date Started: 4/26

#### Date Ended:4/30

#### Hours Spent: 30

#### Resources: Firebase, Victory, AlphaVantage, StackOverflow

#### Assets: None

#### Bugs: None, but API site is down :(

#### What makes your application useful?

This application is designed to help organize your stocks and to explore stocks. The main features are your own account that stores your stocks, trending stocks, exploring stocks, and predicting/analyzing stocks. Stocks’ prices are displayed with a graph with a default of the past 100 days. In the YOUR STOCKS tab, you can filter the graphs by past number of days. To add a stock to your account, go to EXPLORE tab. Type in the stock ticker and click on explore stock. The page will display a graph of the stock prices. You can even drag the graph and take a magnified look. If you are interested in the stock(judging from the graph), you may click on ADD STOCK, and it will be added to your account. In the PREDICT tab, you can follow the steps and get a estimated (linear or polynomial) stock price of the next day based on the past x days.

#### Special Instructions

Guest: Can only view tabs TRENDING, EXPLORE, ABOUT US

User login: with Gmail, will have one default stock FB, can view all tabs except admin

Admin login: Gmail username: stocknotebook1@gmail.com, password: cs290stock, can view all tabs and have authority to change trending stocks

Stock input: User has to input a valid stock ticker, or else the app will alert you. (error handling)


#### References for data

We use the API AlphaVantage, which is a real time stock data API.

#### Different Frameworks

We also considered using vue instead of react as well as stockjs instead of alphavantage and chartjs instead of victory. We chose react instead of vue because react seems to be more straightforward and we learned vue already this semester so it’s good to diversify. Also yoyo will likely be doing some development work in react in the summer. We chose to use the create react app because it gave us a solid starting framework. We used alphavantage over stockjs because stockjs didn’t work well with react while alphavantage was compatible with npm. We used Victory to produce charts over chartjs because Victory was easily integratable into react as components. Most of the decisions followed from picking react over vue since we just picked what was designed to be integrated into a react app.
