---
layout: page
title: K-Nearest Neighbors
date: 2025-10-30
category: Graduate School Reflections
---

# K-Nearest Neighbors
Have you heard the phrase "You are the average of your 5 closest friends?" Yes? Okay, then you know the machine learning model K-Nearest Neighbors (KNN). It might be my favorite of the ML models so far because it makes me laugh. Besides linear regression, which if you hear anyone say they use AI, changes are, they are just using linear regression. Side bar real quick, linear regression is you have a bunch of data and you're trying to figure out how a parameter relates to the output. For example, miles run vs. amount of suffering. Then you just draw a line that best fits the data. Then if someone gives you a number of miles, the model predicts how much suffering based on the line you just drew. My data would just look like up and to the right - more miles = more suffering. *Note: This would only work if you're like me and you don't enjoy running. If your data points actually show that you suffer first but then are very happy the more miles you run, a line would not accurately represent the relationship and you'd need a non-linear model.

Back to KNN. So, KNN is like, you have a new datapoint - you meet a new person. Let's say they are a potential partner because that's fun. On this date, you ask them to bring their 5 closest friends. Then you have to guess for that datapoint, what they are like. So let's say we're trying to figure out is this person an asshole. They bring their 5 friends. 4 out of 5 are assholes. Then you predict that your date, is an asshole. On the otherhand, only 1 out of 5 is an asshole. Then most likely they are not an asshole. 

Okay but what if they can only bring their closest friend. Just one. High stakes. Then it gets way harder because now, just because that one friend is an asshole, doesn't mean that they are necessarily an asshole, but you (the model) would decide that they are an asshole. Thus, overfitting the data. On the otherhand, let's say you tell them to bring 50 people who they consider close. First off, that would be very impressive because who has 50 people that are readily available to go on this date with them. But then it gets harder to tell because you have people from their best friend to their cousin once removed. Finding the right K (number of people to bring) is kind of an art.

The other point is that when you ask them to bring people, not everyone should be weighted the same, right? Their closest friend probably says more about them than that cousin once removed. The weighting of the datapoints by distance, where the farther away you are, the less you count, is called "kernel smoothing". Now you know everything I know about KNN!

