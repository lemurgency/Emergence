Emergence is a javascript based ant simulation library. 

Current way to start is runSimulation(10,300);
the first parameter is the number of ants and the second is how long the time in between 'cycles' (ms)

Current things I'm working on:

The plan was to have an ant be a model and it be pushed through functions. 

One cycle would occur which would cycle through all of the ants. Each ant would take action based on the map status and the ant model. 

The map would be a separate model and the ants simply interact with it. It only stores it's state, an ant it's own state and the functions connect the two.


Also working on Pheremone trails. This is the core logic behind the whole simulation and is difficult to grasp. Most common types of ants only have one pheremone type for trails 
and all of their communication is done through this. This presents a number of complex issues like how:
  How does an ant know to follow a trail. What pheremone Threshold?
  How does it know which direction to go?
    There are many different types of natural solutions among ants for this..
  What point does an ant start wandering randomly again? 
    If it hits the end of a trail with no food it's a bad trail. Does it start from there?
    Does it return home and then restart?
    Natural ant trails 'branch' like many other natural items. How to incorporate this into the algorithm

Then of course there's the common way to do this with computers. Simply add a second pheremone trail for 'food success'. 
When an ant sees this trail it knows there's food on the end and can follow it. Many algorithms 'know' the location of home
and the ant returns straight back. This isn't how most real ants work, though bees often act this way.

I think I'll start with the 'easy' solution of two pheremone trails. I believe this will work best with a small 'map' also. Some sources claim that 
the chaotic nature of ants evens out over larger areas, where in smaller areas they can get confused with the high number of trails.