# RoyalRoad
A project to use machine learning to determine whether a fiction posted to RoyalRoad.com (a web-fiction nexus) is likely to be dropped by the author, or if it will continue for a while longer.

##Data Collection
Uses Node.js and the Axios and Cheerio packages to scrape titles and genre information from a number of books on RoyalRoad.com

the prgram web scrapes information from the Royal Road Website. Running node fill-title-data.js from the data-collection folder will begin the data collection process. All of the data is written to dataOutput.json. We have moved the correct file into the main folder manually.

## Machine Learning Algorithms
Uses K-nearest-neighbor and Singular-Value-Decomposition on the previously scraped data, utilizing k-fold cross validation to check the accuracy of the machine learning models.

In source_codes folder we have our SVM and KNN algorithms in the respective files. In the KNN file there is also graphs that we used to display data. The KNN file runs slow as we run through most of the data set multiple times. SVM should finish fairly quickly. DO NOT delete any of the json file.
From the source codes folder you can run the code as a python script or as a jupiter notebook




