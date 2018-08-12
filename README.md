# Algolia Assignment Repo

The Data

Welcome to the Spotify Song Selector powered by Algolia! The data set is a list of song tracks with information such as: album name, artist name(s), song name, album release date, date song added to playlist, etc. The purpose of this application is to replicate a real partner integration with Algolia. I decided to build a Spotify app that uses Algolia as its search engine. Spotify can customize their search by changing the relevance through the Algolia Dashboard.

Download the Spotify App and login using the credentials provided in the instructions below. Once you play a song you now have an active device. Using the Spotify Song Selector, you can search and choose a different song to play. 

Provided with the right dataset, users can experience a more powerful search experience for songs to play.

#Feedback for Algolia

Creating an account on Algolia was a smooth and clear experience. The documentation for ‘getting started’ and ‘indexing’ was well outlined. I enjoyed reading the'concepts' section explaining Algolia terminology, and one for tutorials to begin implementation. 
I would like to see more props available from the Hits component of the react-instantsearch library.
For example, built in animations such as fading in hit elements one by one when the results are loaded initially could be a nice effect.

# What I Learned From This project

I learned how to consume the Algolia javascript SDK client, upload data into an index, and use the Algolia dashboard to set the desired relevance. As well, I learned how the Spotify API works, utilizing both playlist and music player endpoints. Together, I combined the two platforms together to build a partner integration. 

There are two parts to the repo, the auth-server, and the client.
 
1) Auth Server
This folder contains the code to authenticate with Spotify and load the login page.

2) Client 
This folder contains a small react app that displays a list of songs. 
The app initializes an algoliasearch client to make rest calls. 
I am using the react-instantsearch-dom component library to load an InstantSearch UI
component that links the index 'Algolia Favorite Tracks'.

-----How to run the application-----
### 1)  Start Auth Server
- Navigate to the auth-server directory -`cd auth-server`
- Install the dependencies -`npm install`
- Run the Server `node authorization_code/app.js`

### 2)  Start Client
- Navigate to the client directory - cd client`
- Install the dependencies -`npm install`
- Run the Server `npm start`

### 3)  Use the App
- Make sure you have a song playing (or paused) on a Spotify app (Desktop or Mobile)
	- (Donwload Spotify Player here: https://www.spotify.com/us/download/other/)
- Visit http://localhost:3000
- Click 'Log in with Spotify' and log in
	- Email: algoliacoreyching@gmail.com
	- Password: AlgoliaRocks123
- Once logged in, your currently playing song's name and album art should appear
- Use the search bar and type in 'paris'
- See a subset of songs with the keyword paris displayed from the index dataset.
- Click 'play' next to desired song
- The currently playing song will update
- Search again using any query you'd like! 
