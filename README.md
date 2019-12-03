# Celebrity Captain

I am a big believer in emergent design, "only fix the problem you currently know you have", and without knowing that much about the project such as user demnand for such a service it seems sensible to take an MVP approach.

Years ago when I was developing a log in screen for a mobile application, an epic came in to allow users to login via social media. This was a fair chunk of work, developing the UI, the back end, setting up the OAuth with Facebook, Google, etc. Before doing any of this I simply added a "Social Media Login" button, all it did was log when it was clicked, nothing else. I pushed this to production and over a 2 day trial no one ever clicked it, so in the end we simply worked on something else that did add value to the end users.

So in that spirit this is a very simple application. I used MongoDb simply because it is so easy to set up and is perfetly adequate for the job, and having not used Mongo for a few years I forget just how easy it is to get something up and running.

One of the biggest considerations when planning architecture is balancing scaleablity with state management. So to keep things simple I have used an event sourcing pattern for storing state.

- It means the arrival updates can arrive in any order, and can be updated retrospectively.
- Multiple nodes can update the database at the same time without having to manage locking or worrying about contention.
- Event sourcing scales very well.

At present the application does not worry about duplicates as they do not affect the functioning of the system. There is potentially a small performance hit but I see fixing this as an optimisation.

I have deployed this onto AWS ECS using fargate containers as this is cheap, easy and easily scaleable. For the database I have used MLabs as they give you 500MB of storage for free!

I did consider using Lambdas and whereas it does give you massive scalability it would be more complex and unneeded at this stage. For the database I'm very interested in Timestream as possible best solution for the arrivals data if project needed to grow. It is basically a custom built version of Cassandra but for timeseries data.

I've missed out some essential cross cutting concerns such as logging, global error handling, security...I probably would use Open Api but I have used controllers so that would be easy to retrofit.


### The application is hosted at http://celebrity-captain.golambda.co.uk

## POST /arrival

```
curl -X POST \
  http://celebrity-captain.golambda.co.uk/arrival \
  -H 'Content-Type: application/json' \
  -d '{
	"vessel" : "SS Great Britian 2",
	"datetime" : "2057-01-01T23:28:56.782Z",
	"port": "London",
	"captain" : "Captain Morgan"
  }'  
```

## GET /history

```
curl http://celebrity-captain.golambda.co.uk/history/captain+morgan
```
